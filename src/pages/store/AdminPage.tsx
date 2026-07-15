import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, Package, ShoppingBag, Users, Tag, TrendingUp,
  BarChart3, Plus, Edit, Trash2, Eye, Search, Zap,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import StoreNavbar from '@/components/store/StoreNavbar';
import { products } from '@/data/products';

const stats = [
  { label: 'Total Revenue', value: '$48,234', change: '+12.5%', up: true, icon: TrendingUp, color: 'text-lime' },
  { label: 'Orders Today', value: '127', change: '+8.2%', up: true, icon: ShoppingBag, color: 'text-blue-400' },
  { label: 'Products', value: String(products.length), change: '0%', up: true, icon: Package, color: 'text-amber' },
  { label: 'Customers', value: '2,841', change: '+4.1%', up: true, icon: Users, color: 'text-purple-400' },
];

const recentOrders = [
  { id: 'KPS-7F2A8B', customer: 'Amara Osei', product: 'iPhone 15 Pro Max', amount: 1199, status: 'delivered' },
  { id: 'KPS-4C9D1E', customer: 'Kwame Mensah', product: 'Sony WH-1000XM5', amount: 349, status: 'in-transit' },
  { id: 'KPS-2E5F3A', customer: 'Efua Darko', product: 'Anker 65W GaN', amount: 45, status: 'processing' },
  { id: 'KPS-8A3C6D', customer: 'Kofi Agyemang', product: 'Galaxy S24 Ultra', amount: 1299, status: 'delivered' },
];

const tabs = ['Dashboard', 'Products', 'Orders', 'Customers', 'Promotions'];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [search, setSearch] = useState('');

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#070709]">
      <StoreNavbar />
      <div className="pt-16">
        {/* Admin header */}
        <div className="border-b border-white/[0.07] bg-[#08080c]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-amber flex items-center justify-center">
              <LayoutDashboard size={14} className="text-black" />
            </div>
            <span className="font-display font-700 text-white">Admin Dashboard</span>
            <div className="ml-auto px-2.5 py-1 rounded-full bg-amber/10 border border-amber/25 text-amber text-[10px] font-code">
              ADMIN
            </div>
          </div>

          {/* Tabs */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex overflow-x-auto scrollbar-hide gap-1 pb-0">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-3 text-sm font-ui font-500 whitespace-nowrap border-b-2 transition-all ${
                  activeTab === tab
                    ? 'border-lime text-white'
                    : 'border-transparent text-white/40 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {activeTab === 'Dashboard' && (
            <div>
              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {stats.map((s, i) => (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="kure-card rounded-2xl p-5"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${s.color} bg-current/10`}
                        style={{ background: 'rgba(255,255,255,0.04)' }}>
                        <s.icon size={18} className={s.color} />
                      </div>
                      <span className={`text-xs font-code ${s.up ? 'text-lime' : 'text-red-400'}`}>{s.change}</span>
                    </div>
                    <div className="font-code font-700 text-white text-2xl mb-1">{s.value}</div>
                    <div className="text-xs text-white/40 font-ui">{s.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Recent orders */}
              <div className="kure-card rounded-2xl overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.07]">
                  <h3 className="font-display font-700 text-white">Recent Orders</h3>
                  <button className="text-xs text-lime/70 hover:text-lime font-ui transition-colors">View All</button>
                </div>
                <div className="divide-y divide-white/[0.06]">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center gap-4 px-6 py-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-code text-sm text-white/80">#{order.id}</span>
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-code font-700 border ${
                            order.status === 'delivered' ? 'bg-lime/10 border-lime/25 text-lime' :
                            order.status === 'in-transit' ? 'bg-blue-400/10 border-blue-400/25 text-blue-400' :
                            'bg-amber/10 border-amber/25 text-amber'
                          }`}>
                            {order.status.replace('-', ' ').toUpperCase()}
                          </span>
                        </div>
                        <div className="text-xs text-white/35 font-ui mt-0.5">{order.customer} · {order.product}</div>
                      </div>
                      <div className="font-code font-600 text-white text-sm">${order.amount.toLocaleString()}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Products' && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-1 flex items-center gap-2 kure-card rounded-xl px-4 py-3 border border-white/[0.07]">
                  <Search size={15} className="text-white/30 shrink-0" />
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search products…"
                    className="flex-1 bg-transparent text-sm font-ui text-white placeholder-white/25 outline-none"
                  />
                </div>
                <button className="flex items-center gap-1.5 px-4 py-3 rounded-xl btn-lime text-sm font-ui font-700">
                  <Plus size={15} />
                  Add Product
                </button>
              </div>

              <div className="kure-card rounded-2xl overflow-hidden">
                <div className="divide-y divide-white/[0.06]">
                  {filteredProducts.map((p) => (
                    <div key={p.id} className="flex items-center gap-4 px-5 py-4">
                      <div className="w-12 h-12 rounded-xl bg-[#0d0d11] flex items-center justify-center shrink-0 overflow-hidden">
                        <img src={p.image} alt={p.name} className="w-full h-full object-contain p-1"
                          onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0.1'; }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-ui font-600 text-white truncate">{p.name}</div>
                        <div className="text-xs text-white/35 font-ui">{p.brand} · {p.category}</div>
                      </div>
                      <div className="font-code font-600 text-white text-sm hidden sm:block">${p.price.toLocaleString()}</div>
                      <div className={`hidden md:block px-2 py-0.5 rounded-full text-[10px] font-code border ${
                        p.inStock ? 'bg-lime/10 border-lime/25 text-lime' : 'bg-red-500/10 border-red-500/25 text-red-400'
                      }`}>
                        {p.inStock ? 'In Stock' : 'Out of Stock'}
                      </div>
                      <div className="flex items-center gap-1">
                        <Link to={`/product/${p.id}`} className="w-8 h-8 rounded-lg kure-surface flex items-center justify-center text-white/40 hover:text-white transition-colors border border-white/[0.07]">
                          <Eye size={13} />
                        </Link>
                        <button className="w-8 h-8 rounded-lg kure-surface flex items-center justify-center text-white/40 hover:text-lime transition-colors border border-white/[0.07]">
                          <Edit size={13} />
                        </button>
                        <button className="w-8 h-8 rounded-lg kure-surface flex items-center justify-center text-white/40 hover:text-red-400 transition-colors border border-white/[0.07]">
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {(activeTab === 'Orders' || activeTab === 'Customers' || activeTab === 'Promotions') && (
            <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
              <div className="w-16 h-16 rounded-2xl kure-surface flex items-center justify-center">
                {activeTab === 'Orders' && <ShoppingBag size={28} className="text-white/30" />}
                {activeTab === 'Customers' && <Users size={28} className="text-white/30" />}
                {activeTab === 'Promotions' && <Tag size={28} className="text-white/30" />}
              </div>
              <h3 className="font-display font-700 text-xl text-white">{activeTab} Management</h3>
              <p className="text-sm text-white/40 font-ui max-w-xs">
                Full {activeTab.toLowerCase()} management coming in Phase 2 with Supabase integration.
              </p>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full kure-surface text-xs font-code text-amber border border-amber/20">
                <Zap size={11} className="text-amber" />
                Coming Soon
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
