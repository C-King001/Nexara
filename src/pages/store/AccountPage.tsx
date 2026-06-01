import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Package, Heart, GitCompare, Settings, LogOut, ChevronRight, Zap } from 'lucide-react';
import StoreNavbar from '@/components/store/StoreNavbar';
import StoreFooter from '@/components/store/StoreFooter';
import CartDrawer from '@/components/store/CartDrawer';
import AIAssistant from '@/components/store/AIAssistant';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

const menuItems = [
  { icon: Package, label: 'My Orders', to: '/account/orders', desc: 'Track and manage orders' },
  { icon: Heart, label: 'Wishlist', to: '/wishlist', desc: 'Saved for later' },
  { icon: GitCompare, label: 'Compare', to: '/compare', desc: 'Product comparison' },
  { icon: Settings, label: 'Settings', to: '#', desc: 'Account preferences' },
];

export default function AccountPage() {
  const { user, isAuthenticated, logout } = useAuth();
  const { count: cartCount } = useCart();
  const { count: wishlistCount } = useWishlist();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#070709] flex items-center justify-center px-4">
        <div className="kure-card rounded-3xl p-10 max-w-sm w-full text-center">
          <div className="w-16 h-16 rounded-2xl kure-surface flex items-center justify-center mx-auto mb-5">
            <User size={28} className="text-white/30" />
          </div>
          <h2 className="font-display font-700 text-2xl text-white mb-2">Sign in to your account</h2>
          <p className="text-sm text-white/40 font-ui mb-6">View your orders, wishlist, and manage your profile.</p>
          <Link to="/auth" className="flex items-center justify-center gap-2 py-3 rounded-xl btn-lime font-ui font-700">
            <Zap size={16} />
            Sign In or Register
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070709]">
      <StoreNavbar />
      <div className="pt-16">
        {/* Header */}
        <div className="border-b border-white/[0.07] bg-[#0a0a0d]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-lime/15 border-2 border-lime/30 flex items-center justify-center">
                <span className="font-display font-800 text-2xl text-lime">
                  {user?.name?.[0]?.toUpperCase()}
                </span>
              </div>
              <div>
                <h1 className="font-display font-800 text-2xl text-white">{user?.name}</h1>
                <div className="text-sm text-white/40 font-ui">{user?.email}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Total Orders', value: '3', icon: '📦' },
              { label: 'Cart Items', value: String(cartCount), icon: '🛒' },
              { label: 'Wishlist', value: String(wishlistCount), icon: '❤️' },
              { label: 'Reviews', value: '2', icon: '⭐' },
            ].map((stat) => (
              <div key={stat.label} className="kure-card rounded-2xl p-4 flex flex-col gap-2">
                <div className="text-2xl">{stat.icon}</div>
                <div className="font-code font-700 text-white text-2xl">{stat.value}</div>
                <div className="text-xs text-white/40 font-ui">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Menu */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {menuItems.map(({ icon: Icon, label, to, desc }, i) => (
              <motion.div key={label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
                <Link
                  to={to}
                  className="flex items-center gap-4 p-5 kure-card rounded-2xl hover:border-white/[0.15] transition-all group"
                >
                  <div className="w-11 h-11 rounded-xl bg-lime/10 border border-lime/20 flex items-center justify-center shrink-0">
                    <Icon size={20} className="text-lime" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-ui font-600 text-white group-hover:text-lime transition-colors">{label}</div>
                    <div className="text-xs text-white/35 font-ui">{desc}</div>
                  </div>
                  <ChevronRight size={16} className="text-white/25 group-hover:text-lime transition-colors" />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Logout */}
          <button
            onClick={() => { logout(); navigate('/'); }}
            className="flex items-center gap-2 px-5 py-3 rounded-xl kure-surface border border-white/[0.07] text-white/50 hover:text-red-400 hover:border-red-400/25 font-ui text-sm transition-all"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      </div>

      <StoreFooter />
      <CartDrawer />
      <AIAssistant />
    </div>
  );
}
