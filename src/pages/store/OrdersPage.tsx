import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Package, Truck, CheckCircle, Clock, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import StoreNavbar from '@/components/store/StoreNavbar';
import StoreFooter from '@/components/store/StoreFooter';
import CartDrawer from '@/components/store/CartDrawer';
import AIAssistant from '@/components/store/AIAssistant';
import { products } from '@/data/products';

const mockOrders = [
  {
    id: 'KPS-7F2A8B',
    date: '2024-12-01',
    status: 'delivered',
    total: 1199,
    items: [products[0]],
    tracking: 'GH1234567890',
  },
  {
    id: 'KPS-4C9D1E',
    date: '2024-11-28',
    status: 'in-transit',
    total: 349,
    items: [products[12]],
    tracking: 'GH9876543210',
  },
  {
    id: 'KPS-2E5F3A',
    date: '2024-11-20',
    status: 'processing',
    total: 45,
    items: [products[15]],
    tracking: null,
  },
];

const statusConfig: Record<string, { label: string; icon: typeof Package; color: string; bg: string }> = {
  processing: { label: 'Processing', icon: Clock, color: 'text-amber', bg: 'bg-amber/10 border-amber/25' },
  'in-transit': { label: 'In Transit', icon: Truck, color: 'text-blue-400', bg: 'bg-blue-400/10 border-blue-400/25' },
  delivered: { label: 'Delivered', icon: CheckCircle, color: 'text-lime', bg: 'bg-lime/10 border-lime/25' },
};

const trackingSteps = ['Order Placed', 'Processing', 'Shipped', 'Out for Delivery', 'Delivered'];

function OrderCard({ order }: { order: typeof mockOrders[0] }) {
  const [expanded, setExpanded] = useState(false);
  const { label, icon: Icon, color, bg } = statusConfig[order.status];
  const statusIndex = { processing: 1, 'in-transit': 3, delivered: 4 }[order.status] ?? 0;

  return (
    <motion.div
      layout
      className="kure-card rounded-2xl overflow-hidden"
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-4 p-5 text-left"
      >
        <div className="w-12 h-12 rounded-xl bg-[#0d0d11] flex items-center justify-center shrink-0 overflow-hidden">
          <img
            src={order.items[0]?.image}
            alt=""
            className="w-full h-full object-contain p-1"
            onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0.1'; }}
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-code font-600 text-white text-sm">#{order.id}</span>
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-code font-600 border ${bg} ${color}`}>
              <Icon size={10} />
              {label}
            </span>
          </div>
          <div className="text-xs text-white/35 font-ui mt-0.5">
            {order.date} · {order.items.length} item{order.items.length > 1 ? 's' : ''} · ${order.total.toLocaleString()}
          </div>
        </div>
        {expanded ? <ChevronUp size={16} className="text-white/30 shrink-0" /> : <ChevronDown size={16} className="text-white/30 shrink-0" />}
      </button>

      {expanded && (
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: 'auto' }}
          className="border-t border-white/[0.06] px-5 py-5 space-y-5"
        >
          {/* Items */}
          {order.items.map((item) => (
            <div key={item.id} className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-xl bg-[#0d0d11] flex items-center justify-center overflow-hidden shrink-0">
                <img src={item.image} alt={item.name} className="w-full h-full object-contain p-1"
                  onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0.1'; }} />
              </div>
              <div className="flex-1">
                <div className="text-sm font-ui font-600 text-white">{item.name}</div>
                <div className="text-xs text-white/35 font-ui">{item.brand}</div>
              </div>
              <div className="font-code font-600 text-white">${item.price.toLocaleString()}</div>
            </div>
          ))}

          {/* Tracking timeline */}
          <div>
            <div className="text-xs font-code text-white/30 uppercase tracking-wider mb-3">
              {order.tracking ? `Tracking: ${order.tracking}` : 'Tracking'}
            </div>
            <div className="relative flex items-center justify-between">
              <div className="absolute left-0 right-0 h-0.5 bg-white/[0.08] top-3.5" />
              <div
                className="absolute left-0 h-0.5 bg-lime top-3.5 transition-all duration-500"
                style={{ width: `${(statusIndex / (trackingSteps.length - 1)) * 100}%` }}
              />
              {trackingSteps.map((step, i) => (
                <div key={step} className="flex flex-col items-center gap-1.5 z-10">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-code font-700 transition-all ${
                    i <= statusIndex ? 'bg-lime text-black' : 'kure-surface text-white/30 border border-white/[0.1]'
                  }`}>
                    {i <= statusIndex ? '✓' : i + 1}
                  </div>
                  <span className="text-[9px] font-ui text-white/30 text-center w-16 leading-tight hidden sm:block">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

export default function OrdersPage() {
  return (
    <div className="min-h-screen bg-[#070709]">
      <StoreNavbar />
      <div className="pt-16">
        <div className="border-b border-white/[0.07] bg-[#0a0a0d]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
            <div className="flex items-center gap-3">
              <Package size={22} className="text-lime" />
              <div>
                <h1 className="font-display font-800 text-3xl text-white">My Orders</h1>
                <p className="text-sm text-white/40 font-ui mt-0.5">Track and manage your purchases</p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 flex flex-col gap-4">
          {mockOrders.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 gap-5 text-center">
              <div className="w-20 h-20 rounded-3xl kure-surface flex items-center justify-center">
                <Package size={36} className="text-white/20" />
              </div>
              <h2 className="font-display font-700 text-2xl text-white">No orders yet</h2>
              <Link to="/catalog" className="flex items-center gap-2 px-6 py-3 rounded-xl btn-lime font-ui font-700">
                Start Shopping <ArrowRight size={16} />
              </Link>
            </div>
          ) : (
            mockOrders.map((order) => <OrderCard key={order.id} order={order} />)
          )}
        </div>
      </div>

      <StoreFooter />
      <CartDrawer />
      <AIAssistant />
    </div>
  );
}
