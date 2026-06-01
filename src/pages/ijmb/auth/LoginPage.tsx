import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "@/lib/motion";
import { Eye, EyeOff, ArrowRight, AlertCircle } from "lucide-react";
import { useAuth } from "@/lib/ijmb-auth";

const DEMO_ACCOUNTS = [
  { role: "Student", email: "student@ijmb.ng", password: "student123", color: "#1A6338" },
  { role: "Teacher", email: "teacher@ijmb.ng", password: "teacher123", color: "#C4501A" },
  { role: "Admin", email: "admin@ijmb.ng", password: "admin123", color: "#4A1D96" },
];

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const role =
        form.email === "admin@ijmb.ng"
          ? "admin"
          : form.email === "teacher@ijmb.ng"
          ? "teacher"
          : "student";
      await login(form.email, form.password, role);
      const path =
        role === "admin"
          ? "/ijmb/dashboard/admin"
          : role === "teacher"
          ? "/ijmb/dashboard/teacher"
          : "/ijmb/dashboard/student";
      navigate(path);
    } catch {
      setError("Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fillDemo = (email: string, password: string) => {
    setForm({ email, password });
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left panel */}
      <div className="hidden lg:flex flex-1 flex-col justify-between p-12 relative overflow-hidden bg-surface-1 border-r border-border">
        <div className="absolute inset-0 pattern-geo" />
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-gold/5 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-[300px] bg-gradient-to-t from-dept-green/4 to-transparent pointer-events-none" />

        <Link to="/ijmb" className="relative z-10 flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-gold-gradient flex items-center justify-center shadow-[0_0_20px_-5px_hsl(43_80%_50%/0.5)]">
            <span className="text-background font-bold text-sm font-serif">IJ</span>
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-serif font-bold text-foreground text-lg">IJMB</span>
            <span className="text-gold text-[10px] tracking-widest uppercase">.program</span>
          </div>
        </Link>

        <div className="relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="font-serif text-4xl font-bold text-foreground mb-4"
          >
            Welcome back to <br />
            <span className="text-gold-gradient">your campus</span>
          </motion.h2>
          <p className="text-muted-foreground text-base leading-relaxed max-w-sm">
            Your courses, materials, results, and academic journey — all in one place.
          </p>
        </div>

        <div className="relative z-10 flex flex-wrap gap-3">
          {["5,200+ Students", "30+ Universities", "9-Month Program", "95% Placement"].map((s) => (
            <div key={s} className="px-3 py-1.5 rounded-full border border-border/60 bg-surface-2/60 text-xs text-muted-foreground">
              {s}
            </div>
          ))}
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Mobile logo */}
          <Link to="/ijmb" className="flex lg:hidden items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg bg-gold-gradient flex items-center justify-center">
              <span className="text-background font-bold text-xs font-serif">IJ</span>
            </div>
            <span className="font-serif font-bold text-foreground">IJMB.program</span>
          </Link>

          <div className="mb-8">
            <h1 className="font-serif text-3xl font-bold mb-2">Sign in to your account</h1>
            <p className="text-muted-foreground text-sm">
              Don't have an account?{" "}
              <Link to="/ijmb/register" className="text-gold hover:underline">
                Apply here
              </Link>
            </p>
          </div>

          {/* Demo accounts */}
          <div className="mb-6 p-4 rounded-xl bg-surface-1 border border-border">
            <p className="text-xs text-muted-foreground mb-3 font-medium uppercase tracking-wider">
              Demo accounts — click to fill:
            </p>
            <div className="flex gap-2">
              {DEMO_ACCOUNTS.map((a) => (
                <button
                  key={a.role}
                  onClick={() => fillDemo(a.email, a.password)}
                  className="flex-1 py-2 rounded-lg text-xs font-medium border transition-colors hover:bg-surface-2"
                  style={{
                    borderColor: `${a.color}30`,
                    color: a.color,
                    background: `${a.color}08`,
                  }}
                >
                  {a.role}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block uppercase tracking-wider">
                Email Address
              </label>
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="your@email.com"
                className="w-full px-4 py-3.5 rounded-xl bg-surface-1 border border-border focus:border-gold/40 focus:outline-none focus:ring-1 focus:ring-gold/20 text-foreground placeholder-muted-foreground text-sm transition-colors"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Password
                </label>
                <Link to="/ijmb/forgot-password" className="text-xs text-gold hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  required
                  type={showPwd ? "text" : "password"}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3.5 pr-12 rounded-xl bg-surface-1 border border-border focus:border-gold/40 focus:outline-none focus:ring-1 focus:ring-gold/20 text-foreground placeholder-muted-foreground text-sm transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(!showPwd)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-gold-gradient text-background font-semibold mt-1 shadow-[0_0_30px_-10px_hsl(43_80%_50%/0.5)] hover:shadow-[0_0_50px_-10px_hsl(43_80%_50%/0.7)] hover:scale-[1.01] disabled:opacity-70 disabled:cursor-not-allowed transition-all"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full border-2 border-background/30 border-t-background animate-spin" />
                  Signing in...
                </span>
              ) : (
                <>
                  Sign In <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <p className="text-xs text-muted-foreground text-center mt-8">
            By signing in, you agree to our{" "}
            <span className="text-foreground/70 hover:text-gold cursor-pointer">Terms of Use</span>{" "}
            and{" "}
            <span className="text-foreground/70 hover:text-gold cursor-pointer">Privacy Policy</span>.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
