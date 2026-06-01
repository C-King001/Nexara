import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, Menu, X, User, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import CartDrawer from "./CartDrawer";

const navLinks = [
  { label: "Menu", href: "/menu" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Track Order", href: "/track" },
];

export default function FeliciaNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { itemCount, openCart } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();

  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const navBg = isHomePage
    ? scrolled
      ? "bg-[hsl(28,20%,8%)] shadow-lg"
      : "bg-transparent"
    : "bg-[hsl(28,20%,8%)] shadow-lg";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}
      >
        <div className="container mx-auto flex items-center justify-between h-16 px-4 md:px-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-full bg-ff-spice flex items-center justify-center text-ff-cream font-heading font-bold text-lg leading-none">
              F
            </div>
            <span className="font-heading text-xl font-semibold text-ff-cream tracking-wide">
              Felicia Foods
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-sm font-body text-ff-cream/70 hover:text-ff-cream transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Cart button */}
            <button
              onClick={openCart}
              className="relative p-2 rounded-full hover:bg-white/10 transition-colors text-ff-cream"
              aria-label="Open cart"
            >
              <ShoppingCart size={20} />
              {itemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-ff-spice text-ff-cream text-[10px] font-semibold flex items-center justify-center"
                >
                  {itemCount > 9 ? "9+" : itemCount}
                </motion.span>
              )}
            </button>

            {/* Auth */}
            {isAuthenticated ? (
              <div className="relative hidden md:block">
                <button
                  onClick={() => setUserMenuOpen((v) => !v)}
                  className="flex items-center gap-2 text-sm text-ff-cream/80 hover:text-ff-cream transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-ff-spice/20 border border-ff-spice/30 flex items-center justify-center text-ff-cream text-xs font-semibold">
                    {user?.name[0]}
                  </div>
                  <ChevronDown size={14} />
                </button>
                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-border py-1 z-50"
                    >
                      <Link
                        to="/account"
                        className="block px-4 py-2.5 text-sm text-foreground hover:bg-secondary transition-colors"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        My Account
                      </Link>
                      <Link
                        to="/account/orders"
                        className="block px-4 py-2.5 text-sm text-foreground hover:bg-secondary transition-colors"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        Order History
                      </Link>
                      <div className="h-px bg-border my-1" />
                      <button
                        onClick={() => { logout(); setUserMenuOpen(false); }}
                        className="w-full text-left px-4 py-2.5 text-sm text-destructive hover:bg-secondary transition-colors"
                      >
                        Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                to="/auth"
                className="hidden md:inline-flex items-center gap-1.5 text-sm font-medium text-ff-cream/80 hover:text-ff-cream transition-colors"
              >
                <User size={16} />
                Sign In
              </Link>
            )}

            <Link
              to="/menu"
              className="hidden md:inline-flex btn-spice text-sm py-2 px-4"
            >
              Order Now
            </Link>

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 text-ff-cream"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden bg-[hsl(28,20%,8%)] border-t border-white/10"
            >
              <nav className="flex flex-col px-4 py-4 gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="py-3 text-base text-ff-cream/80 hover:text-ff-cream border-b border-white/5 transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="pt-4 flex flex-col gap-3">
                  <Link to="/menu" className="btn-spice w-full justify-center">
                    Order Now
                  </Link>
                  {!isAuthenticated && (
                    <Link to="/auth" className="btn-outline-cream w-full justify-center">
                      Sign In
                    </Link>
                  )}
                  {isAuthenticated && (
                    <>
                      <Link to="/account" className="btn-outline-cream w-full justify-center">
                        My Account
                      </Link>
                      <button onClick={logout} className="text-sm text-ff-cream/50 hover:text-ff-cream/80">
                        Sign Out
                      </button>
                    </>
                  )}
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <CartDrawer />
    </>
  );
}
