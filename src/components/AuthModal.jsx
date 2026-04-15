import { useMemo, useState } from 'react'
import { AnimatePresence, motion as Motion } from 'framer-motion'
import { Mail, Smartphone, X, Loader2 } from 'lucide-react'
import { useAuth } from '../hooks/useAuth.js'
import { sendEmailOTP, sendSMSOTP, verifySMSOTP } from '../utils/otpService.js'

const isEmailValid = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
const isPhoneValid = (value) => /^[6-9]\d{9}$/.test(value)

export const AuthModal = ({ open, onClose }) => {
  const { login } = useAuth()
  const [method, setMethod] = useState('phone')
  const [contact, setContact] = useState('')
  const [otpInput, setOtpInput] = useState('')
  const [generatedOtp, setGeneratedOtp] = useState('')
  const [step, setStep] = useState('contact')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const isContactValid = useMemo(() => {
    if (method === 'phone') return isPhoneValid(contact.trim())
    return isEmailValid(contact.trim())
  }, [contact, method])

  const handleSendOtp = async () => {
    if (!isContactValid) {
      setError(method === 'phone' ? 'Enter a valid 10-digit phone number.' : 'Enter a valid email address.')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      if (method === 'email') {
        const otp = String(Math.floor(100000 + Math.random() * 900000))
        const success = await sendEmailOTP(contact.trim(), otp)
        if (success) {
          setGeneratedOtp(otp)
          setStep('otp')
        } else {
          setError('Failed to send email. Ensure EmailJS keys are configured.')
        }
      } else {
        const success = await sendSMSOTP(contact.trim())
        if (success) {
          setStep('otp')
        } else {
          setError('Failed to send SMS. Ensure Twilio keys are configured.')
        }
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerifyOtp = async () => {
    setIsLoading(true)
    setError('')

    try {
      if (method === 'email') {
        if (otpInput.trim() === generatedOtp) {
          login({ contact: contact.trim(), method })
          resetForm()
        } else {
          setError('Invalid OTP. Please try again.')
        }
      } else {
        const success = await verifySMSOTP(contact.trim(), otpInput.trim())
        if (success) {
          login({ contact: contact.trim(), method })
          resetForm()
        } else {
          setError('Invalid OTP. Please try again.')
        }
      }
    } catch (err) {
      setError('Verification failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const resetForm = () => {
    setStep('contact')
    setContact('')
    setOtpInput('')
    setGeneratedOtp('')
    setError('')
    onClose()
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <Motion.button
            aria-label="Close auth modal"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-slate-900/75 backdrop-blur-sm"
          />

          <Motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            className="fixed inset-0 z-50 m-auto h-fit w-[92%] max-w-md"
          >
            <div className="glass-card rounded-2xl p-5 sm:p-6">
              <div className="mb-5 flex items-start justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-blue-200/70">NeXora Account</p>
                  <h3 className="text-2xl font-semibold text-white">Login / Signup</h3>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-lg border border-white/10 p-2 text-slate-300 hover:border-blue-300/40 hover:text-blue-200"
                >
                  <X className="size-4" />
                </button>
              </div>

              <div className="mb-4 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  disabled={step === 'otp'}
                  onClick={() => setMethod('phone')}
                  className={`inline-flex items-center justify-center gap-2 rounded-xl border px-3 py-2 text-sm transition-all ${
                    method === 'phone'
                      ? 'border-blue-300/70 bg-blue-500/20 text-blue-100'
                      : 'border-white/10 text-slate-300 opacity-60'
                  }`}
                >
                  <Smartphone className="size-4" />
                  Phone
                </button>
                <button
                  type="button"
                  disabled={step === 'otp'}
                  onClick={() => setMethod('email')}
                  className={`inline-flex items-center justify-center gap-2 rounded-xl border px-3 py-2 text-sm transition-all ${
                    method === 'email'
                      ? 'border-blue-300/70 bg-blue-500/20 text-blue-100'
                      : 'border-white/10 text-slate-300 opacity-60'
                  }`}
                >
                  <Mail className="size-4" />
                  Email
                </button>
              </div>

              {step === 'contact' ? (
                <div className="space-y-4">
                  <input
                    value={contact}
                    onChange={(event) => setContact(event.target.value)}
                    placeholder={method === 'phone' ? 'Enter 10-digit phone number' : 'Enter email address'}
                    className="input-premium w-full rounded-xl px-4 py-2.5 text-sm"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    disabled={isLoading}
                    className="btn-premium flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-70"
                  >
                    {isLoading ? <Loader2 className="size-4 animate-spin" /> : null}
                    {isLoading ? 'Sending...' : 'Send OTP'}
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="text-center">
                    <p className="text-sm text-slate-400">
                      OTP sent to <span className="text-blue-200">{contact}</span>
                    </p>
                  </div>
                  <input
                    value={otpInput}
                    onChange={(event) => setOtpInput(event.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="Enter 6-digit OTP"
                    className="input-premium w-full rounded-xl px-4 py-2.5 text-sm tracking-[0.35em]"
                    disabled={isLoading}
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={handleVerifyOtp}
                    disabled={isLoading || otpInput.length < 4}
                    className="btn-premium flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-70"
                  >
                    {isLoading ? <Loader2 className="size-4 animate-spin" /> : null}
                    {isLoading ? 'Verifying...' : 'Verify OTP'}
                  </button>
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    disabled={isLoading}
                    className="w-full rounded-xl border border-white/10 px-4 py-2.5 text-sm text-slate-300 hover:border-blue-300/35 disabled:opacity-50"
                  >
                    Resend OTP
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep('contact')}
                    className="w-full text-xs text-blue-300/60 hover:text-blue-300"
                  >
                    Change {method === 'phone' ? 'phone number' : 'email'}
                  </button>

                  {/* Dev Hint */}
                  {(!import.meta.env.VITE_EMAILJS_PUBLIC_KEY || !import.meta.env.VITE_TWILIO_ACCOUNT_SID) && (
                    <p className="mt-2 rounded-lg border border-amber-300/20 bg-amber-500/5 p-2 text-center text-[10px] text-amber-200/60">
                      Dev Mode: {method === 'email' ? 'Check Console for OTP' : 'Use code 123456'}
                    </p>
                  )}
                </div>
              )}

              {error ? (
                <p className="mt-3 rounded-lg bg-rose-500/10 p-2 text-center text-xs text-rose-300">
                  {error}
                </p>
              ) : null}

              {/* Required for Firebase Phone Auth */}
              <div id="recaptcha-container"></div>
            </div>
          </Motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

