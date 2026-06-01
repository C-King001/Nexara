import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { User, MapPin, ShoppingBag, Plus, Trash2, ArrowRight, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import FeliciaNavbar from "@/components/felicia/FeliciaNavbar";
import FeliciaFooter from "@/components/felicia/FeliciaFooter";
import { useAuth } from "@/context/AuthContext";
import { useOrders } from "@/context/OrderContext";
import { formatPrice } from "@/data/meals";

type Tab = "profile" | "orders" | "addresses";

const STATUS_COLORS: Record<string, string> = {
  received: "bg-blue-100 text-blue-700",
  preparing: "bg-amber-100 text-amber-700",
  ready: "bg-purple-100 text-purple-700",
  out_for_delivery: "bg-orange-100 text-orange-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

export default function AccountPage() {
  const { user, isAuthenticated, logout, updateProfile } = useAuth();
  const { orders } = useOrders();
  const [tab, setTab] = useState<Tab>("profile");
  const [editMode, setEditMode] = useState(false);
  const [editName, setEditName] = useState(user?.name || "");
  const [editPhone, setEditPhone] = useState(user?.phone || "");

  if (!isAuthenticated) return <Navigate to="/auth" replace />;

  const userOrders = orders;

  const saveProfile = () => {
    updateProfile({ name: editName, phone: editPhone });
    setEditMode(false);
  };

  const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
    { key: "profile", label: "Profile", icon: <User size={16} /> },
    { key: "orders", label: "My Orders", icon: <ShoppingBag size={16} /> },
    { key: "addresses", label: "Addresses", icon: <MapPin size={16} /> },
  ];

  return (
    <div className="min-h-screen bg-background">
      <FeliciaNavbar />

      {/* Header */}
      <section className="section-dark pattern-adire pt-20">
        <div className="container mx-auto px-4 pt-8 pb-8">
          <div className="flex items-center gap-4">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center text-white font-heading font-bold text-2xl flex-shrink-0"
              style={{ backgroundColor: "hsl(3 68% 32%)" }}
            >
              {user?.name.charAt(0)}
            </div>
            <div>
              <h1 className="font-heading text-2xl font-bold text-ff-cream">{user?.name}</h1>
              <p className="text-ff-cream/60 font-body text-sm">{user?.email}</p>
            </div>
          </div>

          {/* Tab bar */}
          <div className="flex gap-1 mt-6 bg-white/10 rounded-full p-1 w-fit">
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium font-body transition-all duration-200 ${
                  tab === t.key ? "bg-white text-foreground shadow" : "text-ff-cream/60 hover:text-ff-cream"
                }`}
              >
                {t.icon}
                <span className="hidden sm:inline">{t.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Profile tab */}
        {tab === "profile" && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="max-w-lg">
            <div className="bg-white rounded-2xl border border-border shadow-sm p-6 space-y-5">
              <div className="flex items-center justify-between">
                <h2 className="font-heading text-xl font-semibold text-foreground">Account Details</h2>
                {!editMode ? (
                  <button
                    onClick={() => { setEditMode(true); setEditName(user?.name || ""); setEditPhone(user?.phone || ""); }}
                    className="text-sm font-medium hover:underline font-body"
                    style={{ color: "hsl(3 68% 32%)" }}
                  >
                    Edit
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button onClick={() => setEditMode(false)} className="text-sm text-muted-foreground font-body hover:text-foreground">Cancel</button>
                    <button onClick={saveProfile} className="text-sm font-medium font-body" style={{ color: "hsl(3 68% 32%)" }}>Save</button>
                  </div>
                )}
              </div>

              {editMode ? (
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-foreground font-body">Full Name</label>
                    <input
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full px-4 py-2.5 border border-border rounded-xl text-sm font-body outline-none focus:ring-2"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-foreground font-body">Phone</label>
                    <input
                      value={editPhone}
                      onChange={(e) => setEditPhone(e.target.value)}
                      className="w-full px-4 py-2.5 border border-border rounded-xl text-sm font-body outline-none focus:ring-2"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <ProfileRow label="Full Name" value={user?.name || ""} />
                  <ProfileRow label="Email" value={user?.email || ""} />
                  <ProfileRow label="Phone" value={user?.phone || ""} />
                </div>
              )}
            </div>

            <button
              onClick={logout}
              className="mt-4 flex items-center gap-2 text-sm text-muted-foreground hover:text-destructive transition-colors font-body"
            >
              <LogOut size={15} /> Sign Out
            </button>
          </motion.div>
        )}

        {/* Orders tab */}
        {tab === "orders" && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl space-y-4">
            {userOrders.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="text-6xl">📦</div>
                <h3 className="font-heading text-xl font-semibold text-foreground">No orders yet</h3>
                <p className="text-muted-foreground font-body">Your order history will appear here once you place your first order.</p>
                <Link to="/menu" className="btn-spice mt-3 inline-flex">Browse Menu <ArrowRight size={16} /></Link>
              </div>
            ) : (
              userOrders.map((order) => (
                <div key={order.id} className="bg-white rounded-2xl border border-border shadow-sm p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-semibold text-foreground font-body text-sm">Order #{order.id}</p>
                      <p className="text-xs text-muted-foreground font-body">{order.placedAt.toLocaleDateString("en-NG", { year: "numeric", month: "short", day: "numeric" })}</p>
                    </div>
                    <span className={`ff-badge text-xs ${STATUS_COLORS[order.status] || "bg-secondary text-muted-foreground"}`}>
                      {order.status.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {order.items.map((item) => (
                      <div key={item.meal.id} className="flex items-center gap-1.5 text-xs text-muted-foreground font-body bg-secondary rounded-full px-2.5 py-1">
                        <span>{item.meal.emoji}</span>
                        {item.meal.name} × {item.quantity}
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-border">
                    <p className="font-semibold text-foreground font-body">{formatPrice(order.total)}</p>
                    <div className="flex gap-2">
                      <Link
                        to={`/order/${order.id}/tracking`}
                        className="text-xs font-medium hover:underline font-body"
                        style={{ color: "hsl(3 68% 32%)" }}
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            )}
          </motion.div>
        )}

        {/* Addresses tab */}
        {tab === "addresses" && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="max-w-lg space-y-4">
            {user?.addresses.map((addr) => (
              <div key={addr.id} className="bg-white rounded-2xl border border-border shadow-sm p-5">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                      <MapPin size={16} className="text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground font-body text-sm">{addr.label}</p>
                      <p className="text-sm text-muted-foreground font-body">{addr.street}</p>
                      <p className="text-sm text-muted-foreground font-body">{addr.area}</p>
                      {addr.landmark && <p className="text-xs text-muted-foreground/70 font-body">{addr.landmark}</p>}
                    </div>
                  </div>
                  <button className="text-muted-foreground hover:text-destructive transition-colors p-1">
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))}

            <button className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl border-2 border-dashed border-border text-sm text-muted-foreground hover:border-ff-spice/30 hover:text-foreground transition-all duration-200 font-body">
              <Plus size={16} /> Add New Address
            </button>
          </motion.div>
        )}
      </div>

      <FeliciaFooter />
    </div>
  );
}

function ProfileRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between py-2 border-b border-border last:border-0">
      <span className="text-sm text-muted-foreground font-body">{label}</span>
      <span className="text-sm font-medium text-foreground font-body">{value}</span>
    </div>
  );
}
