import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "@/lib/motion";
import { useAuth } from "@/lib/ijmb-auth";

const navLinks = [
  { label: "About", href: "/ijmb/about" },
  { label: "Departments", href: "/ijmb/departments" },
  { label: "Admissions", href: "/ijmb/admissions" },
  { label: "FAQ", href: "/ijmb/faq" },
  { label: "Contact", href: "/ijmb/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => { setOpen(false); }, [location.pathname]);

  const dashboardHref =
    user?.role === "admin"
      ? "/ijmb/dashboard/admin"
      : user?.role === "teacher"
      ? "/ijmb/dashboard/teacher"
      : "/ijmb/dashboard/student";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-xl border-b border-border/60 shadow-[0_4px_30px_-10px_hsl(43_80%_50%/0.1)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/ijmb" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-gold-gradient flex items-center justify-center shadow-[0_0_20px_-5px_hsl(43_80%_50%/0.6)] group-hover:shadow-[0_0_30px_-5px_hsl(43_80%_50%/0.8)] transition-all">
            <span className="text-background font-bold text-sm font-serif">IJ</span>
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-serif font-bold text-foreground text-base tracking-tight">IJMB</span>
            <span className="text-gold text-[10px] font-sans font-medium tracking-widest uppercase">
              .program
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                location.pathname === link.href
                  ? "text-gold"
                  : "text-foreground/70 hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated ? (
            <Link
              to={dashboardHref}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-1 border border-border hover:border-gold/40 text-sm font-medium transition-all"
            >
              <div className="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center text-gold text-xs font-bold">
                {user?.avatar}
              </div>
              <span className="text-foreground/80">Dashboard</span>
            </Link>
          ) : (
            <>
              <Link
                to="/ijmb/login"
                className="px-4 py-2 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
              >
                Sign in
              </Link>
              <Link
                to="/ijmb/apply"
                className="px-5 py-2.5 rounded-lg bg-gold-gradient text-background text-sm font-semibold hover:opacity-90 transition-all shadow-[0_0_25px_-8px_hsl(43_80%_50%/0.5)] hover:shadow-[0_0_35px_-8px_hsl(43_80%_50%/0.7)]"
              >
                Apply Now
              </Link>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg border border-border hover:border-gold/40 transition-colors"
          aria-label="Toggle menu"
        >
          {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-background/98 backdrop-blur-xl border-b border-border px-6 pb-6 pt-2"
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`px-3 py-3 text-base font-medium rounded-lg transition-colors ${
                    location.pathname === link.href
                      ? "text-gold bg-gold/5"
                      : "text-foreground/70 hover:text-foreground hover:bg-surface-1"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-4 flex flex-col gap-2 pt-4 border-t border-border">
                {isAuthenticated ? (
                  <Link
                    to={dashboardHref}
                    className="w-full py-3 rounded-lg bg-surface-1 border border-border text-center text-sm font-medium"
                  >
                    Go to Dashboard
                  </Link>
                ) : (
                  <>
                    <Link
                      to="/ijmb/login"
                      className="w-full py-3 rounded-lg bg-surface-1 border border-border text-center text-sm font-medium"
                    >
                      Sign in
                    </Link>
                    <Link
                      to="/ijmb/apply"
                      className="w-full py-3 rounded-lg bg-gold-gradient text-background text-center text-sm font-semibold"
                    >
                      Apply Now
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
