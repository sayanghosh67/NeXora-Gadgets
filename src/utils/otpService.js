/**
 * OTP Service — NeXora Gadgets
 *
 * Supports two modes:
 *   PRODUCTION  → Real email OTP via EmailJS + Real SMS via Firebase Phone Auth
 *   DEVELOPMENT → Fallback (console log for email, hardcoded 123456 for SMS)
 *
 * To enable production mode, set the following env vars in a .env file:
 *   VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, VITE_EMAILJS_PUBLIC_KEY
 *
 * NOTE: Firebase imports are intentionally removed to keep the app dependency-free
 *       when running without a firebase package. Re-add if you wish to use real SMS.
 */

const EMAILJS_URL = 'https://api.emailjs.com/api/v1.0/email/send'

/* ─── Email OTP ─────────────────────────────────────────────────────────── */

/**
 * Sends a 6-digit OTP to the given email address via EmailJS.
 * Falls back to a console log in development (no .env keys required).
 */
export const sendEmailOTP = async (email, otp) => {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

  if (!serviceId || !templateId || !publicKey) {
    // Development fallback — OTP visible in browser console
    console.warn('─── [DEV] Email OTP ───────────────────────')
    console.warn(`To    : ${email}`)
    console.warn(`OTP   : ${otp}`)
    console.warn('Configure VITE_EMAILJS_* vars for real email delivery.')
    console.warn('───────────────────────────────────────────')
    return true
  }

  try {
    const res = await fetch(EMAILJS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service_id: serviceId,
        template_id: templateId,
        user_id: publicKey,
        template_params: {
          to_email: email,
          otp_code: otp,
          to_name: email.split('@')[0],
        },
      }),
    })
    return res.ok
  } catch (err) {
    console.error('EmailJS error:', err)
    return false
  }
}

/* ─── SMS OTP ────────────────────────────────────────────────────────────── */

/**
 * Sends an SMS OTP to the given phone number.
 * Currently uses a development fallback (code is always 123456).
 *
 * To enable real SMS via Firebase Phone Auth:
 *   1. npm install firebase
 *   2. Restore firebase.js with your project config
 *   3. Replace this function body with RecaptchaVerifier + signInWithPhoneNumber
 */
export const sendSMSOTP = async (phoneNumber) => {
  console.warn('─── [DEV] SMS OTP ─────────────────────────')
  console.warn(`Phone : +91${phoneNumber}`)
  console.warn('Code  : 123456')
  console.warn('Configure Firebase Phone Auth for real SMS delivery.')
  console.warn('───────────────────────────────────────────')
  return true
}

/**
 * Verifies the SMS OTP entered by the user.
 * In development mode, accepts only the hardcoded code "123456".
 */
export const verifySMSOTP = async (_phoneNumber, code) => {
  // Development: accepts hardcoded code
  return code === '123456'
}
