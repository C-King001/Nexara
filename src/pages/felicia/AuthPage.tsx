import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, Loader2, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";

const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const registerSchema = z.object({
  name: z.string().min(2, "Full name required"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(10, "Valid phone number required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
}).refine((d) => d.password === d.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type LoginForm = z.infer<typeof loginSchema>;
type RegisterForm = z.infer<typeof registerSchema>;

export default function AuthPage() {
  const [searchParams] = useSearchParams();
  const [tab, setTab] = useState<"login" | "register">(
    searchParams.get("tab") === "register" ? "register" : "login"
  );
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, register: registerUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/account");
  }, [isAuthenticated, navigate]);

  const loginForm = useForm<LoginForm>({ resolver: zodResolver(loginSchema) });
  const registerForm = useForm<RegisterForm>({ resolver: zodResolver(registerSchema) });

  const onLogin = async (data: LoginForm) => {
    setError("");
    setLoading(true);
    const success = await login(data.email, data.password);
    setLoading(false);
    if (success) {
      navigate("/account");
    } else {
      setError("Invalid email or password. Try demo@deliciafoods.ng");
    }
  };

  const onRegister = async (data: RegisterForm) => {
    setError("");
    setLoading(true);
    await registerUser({ name: data.name, email: data.email, phone: data.phone, password: data.password });
    setLoading(false);
    navigate("/account");
  };

  return (
    <div className="min-h-screen section-dark pattern-adire flex flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-ff-cream font-heading font-bold text-base" style={{ backgroundColor: "hsl(3 68% 32%)" }}>
            F
          </div>
          <span className="font-heading text-lg font-semibold text-ff-cream">Delicia Foods</span>
        </Link>
        <Link to="/" className="flex items-center gap-1.5 text-sm text-ff-cream/60 hover:text-ff-cream transition-colors font-body">
          <ArrowLeft size={15} /> Back to Home
        </Link>
      </div>

      {/* Card */}
      <div className="flex-1 flex items-center justify-center px-4 py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden"
        >
          {/* Tab switcher */}
          <div className="flex">
            {(["login", "register"] as const).map((t) => (
              <button
                key={t}
                onClick={() => { setTab(t); setError(""); }}
                className={`flex-1 py-4 text-sm font-semibold font-body capitalize transition-all duration-200 ${
                  tab === t
                    ? "text-white"
                    : "text-muted-foreground hover:text-foreground bg-secondary"
                }`}
                style={tab === t ? { backgroundColor: "hsl(3 68% 32%)" } : {}}
              >
                {t === "login" ? "Sign In" : "Create Account"}
              </button>
            ))}
          </div>

          <div className="p-7">
            <AnimatePresence mode="wait">
              {tab === "login" ? (
                <motion.div
                  key="login"
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 12 }}
                >
                  <h2 className="font-heading text-2xl font-semibold text-foreground mb-1">Welcome back</h2>
                  <p className="text-sm text-muted-foreground font-body mb-6">
                    Sign in to access your orders and saved addresses.
                  </p>

                  <form onSubmit={loginForm.handleSubmit(onLogin)} className="space-y-4">
                    <AuthField label="Email Address" error={loginForm.formState.errors.email?.message}>
                      <input
                        {...loginForm.register("email")}
                        type="email"
                        placeholder="you@example.com"
                        className="auth-input"
                      />
                    </AuthField>
                    <AuthField label="Password" error={loginForm.formState.errors.password?.message}>
                      <div className="relative">
                        <input
                          {...loginForm.register("password")}
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className="auth-input pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((v) => !v)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </AuthField>

                    {error && (
                      <p className="text-sm text-destructive font-body bg-destructive/10 px-3 py-2 rounded-lg">
                        {error}
                      </p>
                    )}

                    <div className="p-3 rounded-xl bg-secondary/60 border border-border">
                      <p className="text-xs text-muted-foreground font-body">
                        Demo: <span className="font-mono font-semibold">demo@deliciafoods.ng</span> (any password)
                      </p>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full btn-spice justify-center py-3.5 text-base disabled:opacity-70 mt-2"
                    >
                      {loading ? <><Loader2 size={18} className="animate-spin" /> Signing in...</> : "Sign In"}
                    </button>
                  </form>

                  <p className="text-center text-sm text-muted-foreground font-body mt-5">
                    No account?{" "}
                    <button onClick={() => setTab("register")} className="font-semibold hover:underline" style={{ color: "hsl(3 68% 32%)" }}>
                      Create one
                    </button>
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="register"
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                >
                  <h2 className="font-heading text-2xl font-semibold text-foreground mb-1">Create account</h2>
                  <p className="text-sm text-muted-foreground font-body mb-6">
                    Join Delicia Foods and start ordering delicious meals.
                  </p>

                  <form onSubmit={registerForm.handleSubmit(onRegister)} className="space-y-4">
                    <AuthField label="Full Name" error={registerForm.formState.errors.name?.message}>
                      <input {...registerForm.register("name")} placeholder="Aisha Musa" className="auth-input" />
                    </AuthField>
                    <div className="grid grid-cols-2 gap-3">
                      <AuthField label="Email" error={registerForm.formState.errors.email?.message}>
                        <input {...registerForm.register("email")} type="email" placeholder="you@example.com" className="auth-input" />
                      </AuthField>
                      <AuthField label="Phone" error={registerForm.formState.errors.phone?.message}>
                        <input {...registerForm.register("phone")} placeholder="0801234..." className="auth-input" />
                      </AuthField>
                    </div>
                    <AuthField label="Password" error={registerForm.formState.errors.password?.message}>
                      <div className="relative">
                        <input
                          {...registerForm.register("password")}
                          type={showPassword ? "text" : "password"}
                          placeholder="Create a password"
                          className="auth-input pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((v) => !v)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </AuthField>
                    <AuthField label="Confirm Password" error={registerForm.formState.errors.confirmPassword?.message}>
                      <input
                        {...registerForm.register("confirmPassword")}
                        type="password"
                        placeholder="Confirm password"
                        className="auth-input"
                      />
                    </AuthField>

                    {error && (
                      <p className="text-sm text-destructive font-body bg-destructive/10 px-3 py-2 rounded-lg">{error}</p>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full btn-spice justify-center py-3.5 text-base disabled:opacity-70 mt-2"
                    >
                      {loading ? <><Loader2 size={18} className="animate-spin" /> Creating account...</> : "Create Account"}
                    </button>
                  </form>

                  <p className="text-center text-sm text-muted-foreground font-body mt-5">
                    Already have an account?{" "}
                    <button onClick={() => setTab("login")} className="font-semibold hover:underline" style={{ color: "hsl(3 68% 32%)" }}>
                      Sign in
                    </button>
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <p className="text-center text-xs text-muted-foreground font-body mt-6">
              Or{" "}
              <Link to="/menu" className="hover:underline font-medium" style={{ color: "hsl(3 68% 32%)" }}>
                continue as guest
              </Link>
              {" "}— no account needed to order.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function AuthField({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-foreground font-body">{label}</label>
      <style>{`.auth-input { width: 100%; padding: 10px 14px; border-radius: 12px; border: 1px solid hsl(var(--border)); background: white; font-size: 14px; font-family: 'DM Sans', sans-serif; outline: none; transition: all 0.15s; } .auth-input:focus { ring: 2px; border-color: hsl(3 68% 32% / 0.5); box-shadow: 0 0 0 2px hsl(3 68% 32% / 0.1); }`}</style>
      {children}
      {error && <p className="text-xs text-destructive font-body">{error}</p>}
    </div>
  );
}
