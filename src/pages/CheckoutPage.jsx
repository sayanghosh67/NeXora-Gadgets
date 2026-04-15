import { useEffect, useMemo, useState } from 'react'
import { motion as Motion } from 'framer-motion'
import { CheckCircle2, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js'
import { useCart } from '../hooks/useCart.js'
import { useAuth } from '../hooks/useAuth.js'
import { formatINR } from '../utils/currency.js'

const paypalClientId = import.meta.env.VITE_PAYPAL_CLIENT_ID || 'test'
const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID || ''
const merchantUpiId = '8509067386@upi'
const merchantName = 'NeXora Gadgets'

export const CheckoutPage = () => {
  const { items, price, clearCart } = useCart()
  const { isAuthenticated } = useAuth()
  const [transactionId, setTransactionId] = useState('')
  const [isPaid, setIsPaid] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('upi-qr')
  const [isRazorpayReady, setIsRazorpayReady] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zip: '',
  })

  const onFieldChange = (key, value) => {
    setForm((previous) => ({ ...previous, [key]: value }))
  }

  const hasItems = items.length > 0
  const shipping = hasItems ? 199 : 0
  const finalAmount = price + shipping
  const finalAmountText = useMemo(() => formatINR(finalAmount), [finalAmount])
  const transactionRef = useMemo(
    () => `NEXORA-${Math.round(finalAmount * 100)}-${items.length}`,
    [finalAmount, items.length],
  )
  const upiPaymentUrl = useMemo(() => {
    const amount = finalAmount.toFixed(2)
    const params = new URLSearchParams({
      pa: merchantUpiId,
      pn: merchantName,
      tr: transactionRef,
      tn: `NeXora order ${items.length} items`,
      am: amount,
      cu: 'INR',
    })
    return `upi://pay?${params.toString()}`
  }, [finalAmount, items.length, transactionRef])
  const upiQrImageUrl = useMemo(() => {
    const encoded = encodeURIComponent(upiPaymentUrl)
    return `https://api.qrserver.com/v1/create-qr-code/?size=320x320&data=${encoded}`
  }, [upiPaymentUrl])

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.async = true
    script.onload = () => setIsRazorpayReady(true)
    document.body.appendChild(script)
    return () => {
      document.body.removeChild(script)
    }
  }, [])

  const handleUPIPayment = () => {
    if (!window.Razorpay || !razorpayKey || !hasItems) return
    const razorpay = new window.Razorpay({
      key: razorpayKey,
      amount: Math.round(finalAmount * 100),
      currency: 'INR',
      name: 'NeXora Gadgets',
      description: `Order payment (${items.length} items)`,
      prefill: {
        name: form.name,
        email: form.email,
      },
      notes: {
        address: `${form.address}, ${form.city}, ${form.zip}`,
      },
      theme: {
        color: '#3b82f6',
      },
      handler: (response) => {
        setTransactionId(response.razorpay_payment_id)
        setIsPaid(true)
        clearCart()
      },
    })
    razorpay.open()
  }

  if (!isAuthenticated) {
    return (
      <Motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mx-auto max-w-2xl">
        <div className="glass-card rounded-2xl p-8 text-center">
          <p className="mb-2 text-2xl font-semibold text-white">Login required</p>
          <p className="mb-6 text-slate-300">
            Please login with phone or email OTP from the top-right Login button to continue checkout.
          </p>
          <Link to="/" className="btn-premium inline-flex rounded-xl px-5 py-2.5 text-sm font-semibold text-white">
            Back to shopping
          </Link>
        </div>
      </Motion.section>
    )
  }

  if (isPaid) {
    return (
      <Motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mx-auto max-w-2xl">
        <div className="glass-card rounded-2xl p-8 text-center">
          <CheckCircle2 className="mx-auto mb-4 size-14 text-emerald-300" />
          <p className="mb-2 text-3xl font-semibold text-white">Payment Successful</p>
          <p className="mb-5 text-slate-300">Your order is confirmed and being prepared for dispatch.</p>
          <p className="mb-6 rounded-lg border border-white/10 bg-slate-900/45 p-3 text-sm text-blue-200">
            Transaction ID: {transactionId}
          </p>
          <Link to="/" className="btn-premium inline-flex rounded-xl px-5 py-2.5 text-sm font-semibold text-white">
            Continue Shopping
          </Link>
        </div>
      </Motion.section>
    )
  }

  return (
    <section className="grid gap-7 lg:grid-cols-[1fr_0.85fr]">
      <Motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
        <div>
          <p className="mb-2 text-xs uppercase tracking-[0.26em] text-blue-200/70">Secure Checkout</p>
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">Shipping and payment details</h2>
        </div>

        <div className="glass-card space-y-4 rounded-2xl p-5">
          <h3 className="text-lg font-semibold text-white">Customer details</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <input
              value={form.name}
              onChange={(event) => onFieldChange('name', event.target.value)}
              placeholder="Full name"
              className="input-premium rounded-xl px-4 py-2.5 text-sm"
            />
            <input
              type="email"
              value={form.email}
              onChange={(event) => onFieldChange('email', event.target.value)}
              placeholder="Email address"
              className="input-premium rounded-xl px-4 py-2.5 text-sm"
            />
            <input
              value={form.city}
              onChange={(event) => onFieldChange('city', event.target.value)}
              placeholder="City"
              className="input-premium rounded-xl px-4 py-2.5 text-sm"
            />
            <input
              value={form.zip}
              onChange={(event) => onFieldChange('zip', event.target.value)}
              placeholder="ZIP / Postal code"
              className="input-premium rounded-xl px-4 py-2.5 text-sm"
            />
          </div>
          <input
            value={form.address}
            onChange={(event) => onFieldChange('address', event.target.value)}
            placeholder="Street address"
            className="input-premium w-full rounded-xl px-4 py-2.5 text-sm"
          />
        </div>

        <div className="glass-card rounded-2xl p-5">
          <div className="mb-4 flex items-center gap-2 text-sm text-emerald-200">
            <ShieldCheck className="size-4" />
            Free test payments with UPI (Razorpay) and PayPal
          </div>
          <div className="mb-4 grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setPaymentMethod('upi-qr')}
              className={`rounded-xl border px-3 py-2 text-sm ${
                paymentMethod === 'upi-qr'
                  ? 'border-blue-300/70 bg-blue-500/20 text-blue-100'
                  : 'border-white/10 text-slate-300 hover:border-blue-300/35'
              }`}
            >
              UPI QR
            </button>
            <button
              type="button"
              onClick={() => setPaymentMethod('paypal')}
              className={`rounded-xl border px-3 py-2 text-sm ${
                paymentMethod === 'paypal'
                  ? 'border-blue-300/70 bg-blue-500/20 text-blue-100'
                  : 'border-white/10 text-slate-300 hover:border-blue-300/35'
              }`}
            >
              PayPal
            </button>
          </div>
          {hasItems ? (
            paymentMethod === 'upi-qr' ? (
              <div className="space-y-4">
                <div className="rounded-2xl border border-white/10 bg-slate-900/45 p-4">
                  <p className="mb-2 text-sm text-slate-200">Scan with BHIM, PhonePe, GPay, Paytm, or any UPI app</p>
                  <p className="text-xs text-slate-400">
                    UPI ID: <span className="font-medium text-blue-200">{merchantUpiId}</span>
                  </p>
                </div>
                <div className="mx-auto w-fit rounded-2xl border border-blue-300/20 bg-slate-900/60 p-3">
                  <img src={upiQrImageUrl} alt="UPI payment QR" className="size-56 rounded-xl" />
                </div>
                <p className="text-center text-sm font-medium text-blue-100">Pay {finalAmountText}</p>
                <button
                  type="button"
                  onClick={() => {
                    setTransactionId(`UPI-MANUAL-${Date.now()}`)
                    setIsPaid(true)
                    clearCart()
                  }}
                  className="btn-premium w-full rounded-xl px-4 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
                >
                  I Have Paid
                </button>
                <button
                  type="button"
                  onClick={handleUPIPayment}
                  disabled={!isRazorpayReady || !razorpayKey}
                  className="w-full rounded-xl border border-white/10 px-4 py-2.5 text-sm text-slate-200 hover:border-blue-300/40 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Or Pay via Razorpay Popup
                </button>
              </div>
            ) : (
              <PayPalScriptProvider options={{ clientId: paypalClientId, currency: 'INR', intent: 'capture' }}>
                <PayPalButtons
                  style={{ layout: 'vertical', color: 'blue', shape: 'rect', label: 'paypal' }}
                  createOrder={(data, actions) =>
                    actions.order.create({
                      purchase_units: [
                        {
                          amount: {
                            currency_code: 'INR',
                            value: finalAmount.toFixed(2),
                          },
                          description: `NeXora Gadgets order (${items.length} items)`,
                        },
                      ],
                    })
                  }
                  onApprove={async (data, actions) => {
                    const order = await actions.order.capture()
                    setTransactionId(order.id || data.orderID)
                    setIsPaid(true)
                    clearCart()
                  }}
                />
              </PayPalScriptProvider>
            )
          ) : (
            <p className="text-sm text-slate-300">Add products to your cart before making payment.</p>
          )}
        </div>
      </Motion.div>

      <Motion.aside initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="glass-card h-fit rounded-2xl p-5">
        <h3 className="mb-4 text-xl font-semibold text-white">Order summary</h3>

        <div className="space-y-3 border-b border-white/10 pb-4">
          {items.length === 0 ? (
            <p className="text-sm text-slate-300">No products in cart.</p>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex items-center justify-between gap-3 text-sm">
                <p className="truncate text-slate-200">
                  {item.name} <span className="text-slate-400">x{item.quantity}</span>
                </p>
                <p className="font-medium text-blue-100">{formatINR(item.price * item.quantity)}</p>
              </div>
            ))
          )}
        </div>

        <div className="space-y-2 pt-4 text-sm">
          <div className="flex items-center justify-between text-slate-300">
            <span>Subtotal</span>
            <span>{formatINR(price)}</span>
          </div>
          <div className="flex items-center justify-between text-slate-300">
            <span>Shipping</span>
            <span>{formatINR(shipping)}</span>
          </div>
          <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3 text-lg font-semibold text-white">
            <span>Total</span>
            <span>{finalAmountText}</span>
          </div>
        </div>

        <Link
          to="/"
          className="mt-5 inline-flex rounded-xl border border-white/10 px-4 py-2 text-sm text-slate-200 hover:border-blue-300/40 hover:text-blue-200"
        >
          Back to products
        </Link>
      </Motion.aside>
    </section>
  )
}
