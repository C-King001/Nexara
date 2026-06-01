import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Zap, User, Mail, Lock, ArrowRight, CheckCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function AuthPage() {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [error, setError] = useState('');

  const { login, register } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (mode === 'register' && form.password !== form.confirm) {
      setError('Passwords do not match.');
      return;
    }
    setLoading(true);
    try {
      if (mode === 'login') {
        await login(form.email, form.password);
      } else {
        await register(form.name, form.email, form.password);
      }
      navigate('/account');
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  const benefits = [
    'Track your orders in real time',
    'Save items to your wishlist',
    'Faster checkout every time',
    'Exclusive deals and early access',
    'Compare up to 3 phones',
  ];

  return (
    <div className="min-h-screen bg-[#070709] grid grid-cols-1 lg:grid-cols-2">
      {/* Left: Branding */}
      <div className="hidden lg:flex flex-col justify-center px-12 xl:px-16 relative overflow-hidden bg-[#0a0a0d] border-r border-white/[0.06]">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-lime/30 to-transparent" />

        <div className="relative z-10">
          <Link to="/" className="flex items-center gap-2.5 mb-12">
            <div className="w-10 h-10 rounded-xl bg-lime flex items-center justify-center">
              <Zap size={20} className="text-black fill-black" />
            </div>
            <div>
              <div className="font-display font-800 text-xl text-white">KURE'S</div>
              <div className="font-code text-[9px] text-white/35 tracking-[0.2em]">PHONE STORE</div>
            </div>
          </Link>

          <h1 className="font-display font-800 text-4xl xl:text-5xl text-white leading-tight mb-4">
            Your Phones, <br />
            <span className="text-lime">Your Account</span>
          </h1>
          <p className="text-white/45 font-ui text-base mb-10 leading-relaxed">
            Join thousands of customers who trust Kure's for the latest devices.
          </p>

          <div className="flex flex-col gap-3">
            {benefits.map((b) => (
              <div key={b} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-lime/15 border border-lime/30 flex items-center justify-center shrink-0">
                  <CheckCircle size={12} className="text-lime" />
                </div>
                <span className="text-sm text-white/60 font-ui">{b}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right: Form */}
      <div className="flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <Link to="/" className="flex items-center gap-2 mb-8 lg:hidden justify-center">
            <div className="w-9 h-9 rounded-xl bg-lime flex items-center justify-center">
              <Zap size={18} className="text-black fill-black" />
            </div>
            <div>
              <div className="font-display font-800 text-lg text-white">KURE'S</div>
              <div className="font-code text-[9px] text-white/35 tracking-[0.2em]">PHONE STORE</div>
            </div>
          </Link>

          {/* Tab switcher */}
          <div className="flex kure-surface rounded-xl p-1 mb-8 border border-white/[0.07]">
            {(['login', 'register'] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`flex-1 py-2.5 rounded-lg text-sm font-ui font-600 transition-all ${
                  mode === m ? 'bg-lime text-black' : 'text-white/50 hover:text-white'
                }`}
              >
                {m === 'login' ? 'Sign In' : 'Create Account'}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.form
              key={mode}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              onSubmit={handleSubmit}
              className="flex flex-col gap-4"
            >
              {mode === 'register' && (
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-code text-white/40 uppercase tracking-wider">Full Name</label>
                  <div className="flex items-center gap-2 kure-card rounded-xl px-4 py-3 border border-white/[0.07] focus-within:border-lime/30 transition-colors">
                    <User size={15} className="text-white/25 shrink-0" />
                    <input
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Kojo Mensah"
                      required
                      className="flex-1 bg-transparent text-sm font-ui text-white placeholder-white/25 outline-none"
                    />
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-code text-white/40 uppercase tracking-wider">Email</label>
                <div className="flex items-center gap-2 kure-card rounded-xl px-4 py-3 border border-white/[0.07] focus-within:border-lime/30 transition-colors">
                  <Mail size={15} className="text-white/25 shrink-0" />
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@example.com"
                    required
                    className="flex-1 bg-transparent text-sm font-ui text-white placeholder-white/25 outline-none"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-code text-white/40 uppercase tracking-wider">Password</label>
                <div className="flex items-center gap-2 kure-card rounded-xl px-4 py-3 border border-white/[0.07] focus-within:border-lime/30 transition-colors">
                  <Lock size={15} className="text-white/25 shrink-0" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    placeholder="••••••••"
                    required
                    minLength={6}
                    className="flex-1 bg-transparent text-sm font-ui text-white placeholder-white/25 outline-none"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-white/30 hover:text-white transition-colors">
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              {mode === 'register' && (
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-code text-white/40 uppercase tracking-wider">Confirm Password</label>
                  <div className="flex items-center gap-2 kure-card rounded-xl px-4 py-3 border border-white/[0.07] focus-within:border-lime/30 transition-colors">
                    <Lock size={15} className="text-white/25 shrink-0" />
                    <input
                      type="password"
                      value={form.confirm}
                      onChange={(e) => setForm({ ...form, confirm: e.target.value })}
                      placeholder="••••••••"
                      required
                      className="flex-1 bg-transparent text-sm font-ui text-white placeholder-white/25 outline-none"
                    />
                  </div>
                </div>
              )}

              {mode === 'login' && (
                <div className="flex justify-end">
                  <button type="button" className="text-xs font-ui text-lime/70 hover:text-lime transition-colors">
                    Forgot password?
                  </button>
                </div>
              )}

              {error && (
                <div className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/25 text-sm text-red-400 font-ui">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="flex items-center justify-center gap-2 py-4 rounded-xl btn-lime font-ui font-700 text-base mt-2 disabled:opacity-60"
              >
                {loading ? (
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.5, repeat: Infinity, ease: 'linear' }}>
                    <Zap size={18} />
                  </motion.div>
                ) : (
                  <>
                    {mode === 'login' ? 'Sign In' : 'Create Account'}
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </motion.form>
          </AnimatePresence>

          <p className="text-center text-xs text-white/25 font-ui mt-6">
            By continuing, you agree to our{' '}
            <span className="text-lime/60 hover:text-lime cursor-pointer transition-colors">Terms of Service</span>
            {' '}and{' '}
            <span className="text-lime/60 hover:text-lime cursor-pointer transition-colors">Privacy Policy</span>.
          </p>
        </div>
      </div>
    </div>
  );
}
