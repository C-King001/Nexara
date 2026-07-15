import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, CreditCard, Truck, CheckCircle, ChevronRight, Zap } from 'lucide-react';
import StoreNavbar from '@/components/store/StoreNavbar';
import CartDrawer from '@/components/store/CartDrawer';
import { useCart } from '@/context/CartContext';

const steps = ['Shipping', 'Payment', 'Review'];

export default function CheckoutPage() {
  const [step, setStep] = useState(0);
  const [placed, setPlaced] = useState(false);
  const [loading, setLoading] = useState(false);
  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();

  const [shipping, setShipping] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    region: '',
  });

  const [payment, setPayment] = useState({
    method: 'card',
    cardNumber: '',
    expiry: '',
    cvv: '',
    name: '',
  });

  async function handlePlaceOrder() {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setPlaced(true);
    clearCart();
    setLoading(false);
  }

  const shippingFee = total > 500 ? 0 : 15;
  const tax = Math.round(total * 0.125 * 100) / 100;
  const grand = total + shippingFee + tax;

  if (placed) {
    return (
      <div className="min-h-screen bg-[#070709] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="kure-card rounded-3xl p-10 max-w-md w-full text-center"
        >
          <div className="w-20 h-20 rounded-full bg-lime/15 border-2 border-lime/40 flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={36} className="text-lime" />
          </div>
          <h2 className="font-display font-800 text-3xl text-white mb-3">Order Placed!</h2>
          <p className="text-sm text-white/50 font-ui leading-relaxed mb-2">
            Your order <span className="font-code text-lime">#KPS-{Math.random().toString(36).substr(2, 8).toUpperCase()}</span> has been confirmed.
          </p>
          <p className="text-sm text-white/40 font-ui mb-8">
            You'll receive a confirmation email with tracking details shortly.
          </p>
          <div className="flex flex-col gap-3">
            <Link to="/account/orders" className="flex items-center justify-center gap-2 py-3 rounded-xl btn-lime font-ui font-700">
              Track Order
            </Link>
            <Link to="/catalog" className="py-3 rounded-xl kure-surface text-white/60 hover:text-white font-ui transition-colors">
              Continue Shopping
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070709]">
      <StoreNavbar />
      <div className="pt-16">
        {/* Header */}
        <div className="border-b border-white/[0.07] bg-[#0a0a0d]">
          <div className="max-w-5xl mx-auto px-4 py-6">
            <div className="flex items-center gap-2 mb-4">
              <ShieldCheck size={18} className="text-lime" />
              <span className="font-display font-700 text-white">Secure Checkout</span>
              <span className="ml-auto text-xs font-ui text-white/30 flex items-center gap-1">
                <ShieldCheck size={12} className="text-lime" /> SSL Encrypted
              </span>
            </div>

            {/* Progress */}
            <div className="flex items-center gap-2">
              {steps.map((s, i) => (
                <div key={s} className="flex items-center gap-2 flex-1">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-code font-700 transition-all ${
                      i <= step ? 'bg-lime text-black' : 'kure-surface text-white/30 border border-white/[0.1]'
                    }`}
                  >
                    {i < step ? '✓' : i + 1}
                  </div>
                  <span className={`text-sm font-ui ${i <= step ? 'text-white' : 'text-white/30'}`}>{s}</span>
                  {i < steps.length - 1 && <ChevronRight size={14} className="text-white/20 ml-auto" />}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                {step === 0 && (
                  <motion.div key="shipping" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <h2 className="font-display font-700 text-white text-xl mb-5 flex items-center gap-2">
                      <Truck size={18} className="text-lime" /> Shipping Information
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { key: 'firstName', label: 'First Name', placeholder: 'Kojo', colSpan: 1 },
                        { key: 'lastName', label: 'Last Name', placeholder: 'Mensah', colSpan: 1 },
                        { key: 'email', label: 'Email Address', placeholder: 'kojo@example.com', colSpan: 2 },
                        { key: 'phone', label: 'Phone Number', placeholder: '+233 20 000 0000', colSpan: 2 },
                        { key: 'address', label: 'Street Address', placeholder: '123 Oxford Street', colSpan: 2 },
                        { key: 'city', label: 'City', placeholder: 'Accra', colSpan: 1 },
                        { key: 'region', label: 'Region', placeholder: 'Greater Accra', colSpan: 1 },
                      ].map(({ key, label, placeholder, colSpan }) => (
                        <div key={key} className={`flex flex-col gap-1.5 ${colSpan === 2 ? 'col-span-2' : ''}`}>
                          <label className="text-xs font-code text-white/40 uppercase tracking-wider">{label}</label>
                          <input
                            value={(shipping as Record<string, string>)[key]}
                            onChange={(e) => setShipping({ ...shipping, [key]: e.target.value })}
                            placeholder={placeholder}
                            className="kure-surface rounded-xl px-4 py-3 text-sm font-ui text-white placeholder-white/25 outline-none border border-white/[0.07] focus:border-lime/30 transition-colors"
                          />
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() => setStep(1)}
                      className="mt-6 flex items-center gap-2 px-6 py-3.5 rounded-xl btn-lime font-ui font-700"
                    >
                      Continue to Payment <ChevronRight size={16} />
                    </button>
                  </motion.div>
                )}

                {step === 1 && (
                  <motion.div key="payment" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <h2 className="font-display font-700 text-white text-xl mb-5 flex items-center gap-2">
                      <CreditCard size={18} className="text-lime" /> Payment Method
                    </h2>

                    <div className="flex gap-3 mb-6">
                      {[
                        { value: 'card', label: '💳 Card' },
                        { value: 'mtn', label: '📱 MTN MoMo' },
                        { value: 'paypal', label: '🅿️ PayPal' },
                      ].map((m) => (
                        <button
                          key={m.value}
                          onClick={() => setPayment({ ...payment, method: m.value })}
                          className={`flex-1 py-3 rounded-xl text-sm font-ui border transition-all ${
                            payment.method === m.value
                              ? 'border-lime bg-lime/10 text-lime'
                              : 'kure-surface border-white/[0.07] text-white/60 hover:text-white'
                          }`}
                        >
                          {m.label}
                        </button>
                      ))}
                    </div>

                    {payment.method === 'card' && (
                      <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2 flex flex-col gap-1.5">
                          <label className="text-xs font-code text-white/40 uppercase tracking-wider">Name on Card</label>
                          <input
                            value={payment.name}
                            onChange={(e) => setPayment({ ...payment, name: e.target.value })}
                            placeholder="Kojo Mensah"
                            className="kure-surface rounded-xl px-4 py-3 text-sm font-ui text-white placeholder-white/25 outline-none border border-white/[0.07] focus:border-lime/30"
                          />
                        </div>
                        <div className="col-span-2 flex flex-col gap-1.5">
                          <label className="text-xs font-code text-white/40 uppercase tracking-wider">Card Number</label>
                          <input
                            value={payment.cardNumber}
                            onChange={(e) => setPayment({ ...payment, cardNumber: e.target.value })}
                            placeholder="1234 5678 9012 3456"
                            className="kure-surface rounded-xl px-4 py-3 text-sm font-code text-white placeholder-white/25 outline-none border border-white/[0.07] focus:border-lime/30"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-code text-white/40 uppercase tracking-wider">Expiry</label>
                          <input
                            value={payment.expiry}
                            onChange={(e) => setPayment({ ...payment, expiry: e.target.value })}
                            placeholder="MM / YY"
                            className="kure-surface rounded-xl px-4 py-3 text-sm font-code text-white placeholder-white/25 outline-none border border-white/[0.07] focus:border-lime/30"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-code text-white/40 uppercase tracking-wider">CVV</label>
                          <input
                            value={payment.cvv}
                            onChange={(e) => setPayment({ ...payment, cvv: e.target.value })}
                            placeholder="123"
                            className="kure-surface rounded-xl px-4 py-3 text-sm font-code text-white placeholder-white/25 outline-none border border-white/[0.07] focus:border-lime/30"
                          />
                        </div>
                      </div>
                    )}

                    <div className="flex gap-3 mt-6">
                      <button onClick={() => setStep(0)} className="px-5 py-3 rounded-xl kure-surface text-white/60 hover:text-white font-ui border border-white/[0.07] transition-colors">
                        Back
                      </button>
                      <button
                        onClick={() => setStep(2)}
                        className="flex items-center gap-2 px-6 py-3.5 rounded-xl btn-lime font-ui font-700"
                      >
                        Review Order <ChevronRight size={16} />
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div key="review" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <h2 className="font-display font-700 text-white text-xl mb-5">Review Your Order</h2>

                    <div className="kure-card rounded-2xl divide-y divide-white/[0.06] mb-5">
                      {items.map((item) => (
                        <div key={item.id} className="flex items-center gap-4 px-5 py-4">
                          <img src={item.image} alt={item.name} className="w-14 h-14 rounded-xl object-contain bg-[#0d0d11] p-1"
                            onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0.2'; }} />
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-ui font-600 text-white truncate">{item.name}</div>
                            <div className="text-xs font-ui text-white/40">Qty: {item.quantity}</div>
                          </div>
                          <div className="font-code font-600 text-white">${(item.price * item.quantity).toLocaleString()}</div>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-3">
                      <button onClick={() => setStep(1)} className="px-5 py-3 rounded-xl kure-surface text-white/60 hover:text-white font-ui border border-white/[0.07] transition-colors">
                        Back
                      </button>
                      <button
                        onClick={handlePlaceOrder}
                        disabled={loading}
                        className="flex-1 flex items-center justify-center gap-2 py-4 rounded-xl btn-lime font-ui font-700 text-base"
                      >
                        {loading ? (
                          <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.6, repeat: Infinity, ease: 'linear' }}>
                            <Zap size={18} />
                          </motion.div>
                        ) : (
                          <>
                            <ShieldCheck size={18} />
                            Place Order — ${grand.toLocaleString()}
                          </>
                        )}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Summary */}
            <div>
              <div className="kure-card rounded-2xl p-5 sticky top-24">
                <h3 className="font-display font-700 text-white mb-4">Summary</h3>
                <div className="space-y-2 text-sm font-ui mb-4">
                  <div className="flex justify-between"><span className="text-white/50">Subtotal</span><span className="font-code text-white">${total.toLocaleString()}</span></div>
                  <div className="flex justify-between"><span className="text-white/50">Shipping</span><span className="font-code text-lime">{shippingFee === 0 ? 'FREE' : `$${shippingFee}`}</span></div>
                  <div className="flex justify-between"><span className="text-white/50">VAT</span><span className="font-code text-white">${tax}</span></div>
                  <div className="h-px bg-white/[0.07]" />
                  <div className="flex justify-between font-600"><span className="text-white">Total</span><span className="font-code text-lime text-lg">${grand.toLocaleString()}</span></div>
                </div>
                <div className="text-[10px] text-white/25 font-ui text-center">🔒 256-bit SSL encryption</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CartDrawer />
    </div>
  );
}
