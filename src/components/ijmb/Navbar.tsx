import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "@/lib/motion";
import { useAuth } from "@/lib/ijmb-auth";

const navLinks = [
  { label: "About",       href: "/ijmb/about" },
  { label: "Departments", href: "/ijmb/departments" },
  { label: "Admissions",  href: "/ijmb/admissions" },
  { label: "FAQ",         href: "/ijmb/faq" },
  { label: "Contact",     href: "/ijmb/contact" },
];

export default function Navbar() {
  const [open, setOpen]       = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location              = useLocation();
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => { setOpen(false); }, [location.pathname]);

  const dashboardHref =
    user?.role === "admin"   ? "/ijmb/dashboard/admin" :
    user?.role === "teacher" ? "/ijmb/dashboard/teacher" :
    "/ijmb/dashboard/student";

  return (
    <nav
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "1.4rem 4rem",
        borderBottom: scrolled ? "1px solid rgba(201,120,58,0.18)" : "1px solid transparent",
        background: scrolled
          ? "rgba(13,11,8,0.92)"
          : "linear-gradient(to bottom, rgba(13,11,8,0.9), transparent)",
        backdropFilter: scrolled ? "blur(12px)" : "blur(0px)",
        transition: "all 0.5s",
      }}
    >
      {/* Logo */}
      <Link
        to="/ijmb"
        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.5rem", fontWeight: 500, letterSpacing: "0.04em", color: "#f5ede0", textDecoration: "none" }}
      >
        IJMB<span style={{ color: "#c9783a" }}>.</span>program
      </Link>

      {/* Desktop links */}
      <ul style={{ display: "flex", gap: "2.5rem", listStyle: "none", margin: 0, padding: 0 }} className="hidden-mobile">
        {navLinks.map(link => (
          <li key={link.href}>
            <Link
              to={link.href}
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "0.78rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: location.pathname === link.href ? "#d4b896" : "#7a7060",
                textDecoration: "none",
                transition: "color 0.3s",
              }}
              onMouseEnter={e => (e.currentTarget.style.color = "#d4b896")}
              onMouseLeave={e => (e.currentTarget.style.color = location.pathname === link.href ? "#d4b896" : "#7a7060")}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }} className="hidden-mobile">
        {isAuthenticated ? (
          <Link
            to={dashboardHref}
            className="ijmb-nav-cta"
            style={{ cursor: "none" }}
          >
            Dashboard
          </Link>
        ) : (
          <>
            <Link
              to="/ijmb/login"
              style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#7a7060", textDecoration: "none", transition: "color 0.3s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#d4b896")}
              onMouseLeave={e => (e.currentTarget.style.color = "#7a7060")}
            >
              Sign In
            </Link>
            <Link to="/ijmb/apply" className="ijmb-nav-cta" style={{ cursor: "none" }}>
              Apply Now
            </Link>
          </>
        )}
      </div>

      {/* Mobile toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="show-mobile"
        style={{ background: "none", border: "1px solid rgba(201,120,58,0.3)", color: "#c9783a", width: "36px", height: "36px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "none" }}
        aria-label="Toggle menu"
      >
        {open ? <X size={16} /> : <Menu size={16} />}
      </button>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            style={{ position: "absolute", top: "100%", left: 0, right: 0, background: "rgba(13,11,8,0.97)", borderBottom: "1px solid rgba(201,120,58,0.18)", padding: "1.5rem 2rem 2rem", backdropFilter: "blur(12px)" }}
          >
            {navLinks.map(link => (
              <Link
                key={link.href}
                to={link.href}
                style={{ display: "block", fontFamily: "'Space Mono', monospace", fontSize: "0.8rem", letterSpacing: "0.12em", textTransform: "uppercase", color: location.pathname === link.href ? "#c9783a" : "#7a7060", textDecoration: "none", padding: "0.9rem 0", borderBottom: "1px solid rgba(201,120,58,0.08)" }}
              >
                {link.label}
              </Link>
            ))}
            <div style={{ marginTop: "1.5rem", display: "flex", flexDirection: "column", gap: "0.8rem" }}>
              {isAuthenticated ? (
                <Link to={dashboardHref} className="ijmb-btn" style={{ textAlign: "center" }}>
                  <span>Dashboard</span>
                </Link>
              ) : (
                <Link to="/ijmb/apply" className="ijmb-btn" style={{ textAlign: "center" }}>
                  <span>Apply Now</span>
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile   { display: flex !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
        }
      `}</style>
    </nav>
  );
}
