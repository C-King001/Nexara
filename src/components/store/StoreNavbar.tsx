import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingCart, Heart, Search, User, Menu, X, GitCompare,
  ChevronDown, Zap,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useCompare } from '@/context/CompareContext';
import { useAuth } from '@/context/AuthContext';
import { products } from '@/data/products';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Shop', to: '/catalog', children: [
    { label: 'Smartphones', to: '/catalog?category=smartphone' },
    { label: 'Earbuds', to: '/catalog?category=earbuds' },
    { label: 'Headphones', to: '/catalog?category=headphones' },
    { label: 'Smartwatches', to: '/catalog?category=watch' },
    { label: 'Cases & Protection', to: '/catalog?category=case' },
    { label: 'Chargers & Power', to: '/catalog?category=charger' },
  ]},
  { label: 'Deals', to: '/catalog?sale=true' },
  { label: 'Compare', to: '/compare' },
];

export default function StoreNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(products.slice(0, 0));
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const { count: cartCount, setIsOpen: setCartOpen } = useCart();
  const { count: wishlistCount } = useWishlist();
  const { count: compareCount } = useCompare();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
  }, [location]);

  useEffect(() => {
    if (searchQuery.trim().length < 2) {
      setSearchResults([]);
      return;
    }
    const q = searchQuery.toLowerCase();
    setSearchResults(
      products.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      ).slice(0, 6)
    );
  }, [searchQuery]);

  return (
    <>
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#070709]/95 backdrop-blur-xl border-b border-white/[0.07]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-md bg-lime flex items-center justify-center">
                <Zap size={16} className="text-black fill-black" />
              </div>
              <div className="leading-none">
                <div className="font-display font-800 text-lg tracking-tight text-white">
                  SDK
                </div>
                <div className="font-code text-[9px] text-white/40 tracking-[0.2em] uppercase -mt-0.5">
                  PHONE STORE
                </div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => link.children && setActiveDropdown(link.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    to={link.to}
                    className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-ui font-medium transition-colors ${
                      location.pathname === link.to
                        ? 'text-white bg-white/[0.06]'
                        : 'text-white/60 hover:text-white hover:bg-white/[0.04]'
                    }`}
                  >
                    {link.label}
                    {link.children && (
                      <ChevronDown size={13} className={`transition-transform ${activeDropdown === link.label ? 'rotate-180' : ''}`} />
                    )}
                  </Link>

                  {/* Dropdown */}
                  <AnimatePresence>
                    {link.children && activeDropdown === link.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 mt-1 w-52 kure-card rounded-xl overflow-hidden shadow-2xl"
                      >
                        {link.children.map((child) => (
                          <Link
                            key={child.label}
                            to={child.to}
                            className="flex items-center gap-2 px-4 py-2.5 text-sm text-white/60 hover:text-white hover:bg-white/[0.05] transition-colors font-ui"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-1">
              {/* Search */}
              <button
                onClick={() => setSearchOpen(true)}
                className="w-9 h-9 flex items-center justify-center rounded-lg text-white/50 hover:text-white hover:bg-white/[0.06] transition-colors"
                aria-label="Search"
              >
                <Search size={18} />
              </button>

              {/* Compare */}
              <Link
                to="/compare"
                className="hidden md:flex relative w-9 h-9 items-center justify-center rounded-lg text-white/50 hover:text-white hover:bg-white/[0.06] transition-colors"
                aria-label="Compare"
              >
                <GitCompare size={18} />
                {compareCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-amber rounded-full text-[9px] font-bold text-black flex items-center justify-center">
                    {compareCount}
                  </span>
                )}
              </Link>

              {/* Wishlist */}
              <Link
                to="/wishlist"
                className="hidden md:flex relative w-9 h-9 items-center justify-center rounded-lg text-white/50 hover:text-white hover:bg-white/[0.06] transition-colors"
                aria-label="Wishlist"
              >
                <Heart size={18} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full text-[9px] font-bold text-white flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <button
                onClick={() => setCartOpen(true)}
                className="relative w-9 h-9 flex items-center justify-center rounded-lg text-white/50 hover:text-white hover:bg-white/[0.06] transition-colors"
                aria-label="Cart"
              >
                <ShoppingCart size={18} />
                {cartCount > 0 && (
                  <motion.span
                    key={cartCount}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-lime rounded-full text-[9px] font-bold text-black flex items-center justify-center"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </button>

              {/* Auth */}
              {isAuthenticated ? (
                <Link
                  to="/account"
                  className="hidden md:flex items-center gap-2 ml-1 px-3 py-1.5 rounded-lg kure-surface text-sm font-ui font-medium text-white/70 hover:text-white transition-colors"
                >
                  <div className="w-5 h-5 rounded-full bg-lime flex items-center justify-center text-[10px] font-bold text-black">
                    {user?.name?.[0]?.toUpperCase()}
                  </div>
                  <span className="hidden lg:block">{user?.name}</span>
                </Link>
              ) : (
                <Link
                  to="/auth"
                  className="hidden md:flex items-center gap-1.5 ml-1 px-3 py-1.5 rounded-lg btn-lime text-xs font-ui font-semibold"
                >
                  <User size={14} />
                  Sign In
                </Link>
              )}

              {/* Mobile menu */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg text-white/60 hover:text-white hover:bg-white/[0.06] transition-colors ml-1"
              >
                {mobileOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>

        {/* Compare bar */}
        <AnimatePresence>
          {compareCount > 0 && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-t border-white/[0.06] bg-amber/10"
            >
              <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
                <span className="text-sm text-amber font-ui">
                  {compareCount} item{compareCount > 1 ? 's' : ''} ready to compare
                </span>
                <Link
                  to="/compare"
                  className="text-xs bg-amber text-black font-semibold px-3 py-1 rounded-md"
                >
                  Compare Now
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 bg-[#070709] pt-16 lg:hidden overflow-y-auto"
          >
            <div className="px-4 py-6 flex flex-col gap-1">
              {navLinks.map((link) => (
                <div key={link.label}>
                  <Link
                    to={link.to}
                    className="flex items-center justify-between px-4 py-3 rounded-xl text-white/70 hover:text-white hover:bg-white/[0.05] font-ui font-medium"
                    onClick={() => !link.children && setMobileOpen(false)}
                  >
                    {link.label}
                    {link.children && <ChevronDown size={16} />}
                  </Link>
                  {link.children && (
                    <div className="pl-4 flex flex-col gap-0.5 mt-0.5">
                      {link.children.map((child) => (
                        <Link
                          key={child.label}
                          to={child.to}
                          className="px-4 py-2.5 rounded-lg text-sm text-white/50 hover:text-white hover:bg-white/[0.04] font-ui"
                          onClick={() => setMobileOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="mt-4 pt-4 border-t border-white/[0.07] flex flex-col gap-2">
                <Link to="/wishlist" className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/60 hover:text-white hover:bg-white/[0.05] font-ui" onClick={() => setMobileOpen(false)}>
                  <Heart size={18} /> Wishlist {wishlistCount > 0 && <span className="ml-auto text-xs bg-red-500 text-white px-1.5 py-0.5 rounded-full">{wishlistCount}</span>}
                </Link>
                <Link to="/compare" className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/60 hover:text-white hover:bg-white/[0.05] font-ui" onClick={() => setMobileOpen(false)}>
                  <GitCompare size={18} /> Compare {compareCount > 0 && <span className="ml-auto text-xs bg-amber text-black px-1.5 py-0.5 rounded-full">{compareCount}</span>}
                </Link>
                {isAuthenticated ? (
                  <Link to="/account" className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/60 hover:text-white hover:bg-white/[0.05] font-ui" onClick={() => setMobileOpen(false)}>
                    <User size={18} /> {user?.name ?? 'Account'}
                  </Link>
                ) : (
                  <Link to="/auth" className="flex items-center justify-center gap-2 py-3 rounded-xl btn-lime font-ui font-semibold mt-2" onClick={() => setMobileOpen(false)}>
                    <User size={16} /> Sign In / Register
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
            onClick={() => setSearchOpen(false)}
          >
            <motion.div
              initial={{ y: -40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -40, opacity: 0 }}
              className="max-w-2xl mx-auto mt-20 px-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="kure-card rounded-2xl overflow-hidden">
                <div className="flex items-center gap-3 px-4 py-4 border-b border-white/[0.07]">
                  <Search size={18} className="text-white/40 shrink-0" />
                  <input
                    autoFocus
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search phones, brands, accessories…"
                    className="flex-1 bg-transparent text-white placeholder-white/30 text-base font-ui outline-none"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && searchQuery.trim()) {
                        navigate(`/catalog?q=${encodeURIComponent(searchQuery)}`);
                        setSearchOpen(false);
                      }
                      if (e.key === 'Escape') setSearchOpen(false);
                    }}
                  />
                  <button onClick={() => setSearchOpen(false)} className="text-white/40 hover:text-white">
                    <X size={18} />
                  </button>
                </div>
                {searchResults.length > 0 && (
                  <div>
                    {searchResults.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => { navigate(`/product/${p.id}`); setSearchOpen(false); }}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/[0.04] text-left transition-colors"
                      >
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-10 h-10 rounded-lg object-cover bg-white/[0.05]"
                        />
                        <div>
                          <div className="text-sm font-ui font-medium text-white">{p.name}</div>
                          <div className="text-xs text-white/40 font-ui">{p.brand} · ${p.price}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
                {searchQuery.trim().length > 1 && searchResults.length === 0 && (
                  <div className="px-4 py-6 text-center text-white/40 text-sm font-ui">
                    No products found for "{searchQuery}"
                  </div>
                )}
                {searchQuery.trim().length === 0 && (
                  <div className="px-4 py-4 flex flex-wrap gap-2">
                    {['iPhone 15', 'Samsung S24', 'AirPods', 'Sony', 'OnePlus'].map((tag) => (
                      <button
                        key={tag}
                        onClick={() => setSearchQuery(tag)}
                        className="px-3 py-1.5 rounded-full text-xs font-ui font-medium kure-surface text-white/60 hover:text-white transition-colors"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
