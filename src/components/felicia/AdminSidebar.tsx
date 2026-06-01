import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  ClipboardList,
  UtensilsCrossed,
  BarChart3,
  Users,
  Bike,
  Tag,
  LogOut,
  ChevronLeft,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Orders", href: "/admin/orders", icon: ClipboardList },
  { label: "Menu", href: "/admin/menu", icon: UtensilsCrossed },
  { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { label: "Riders", href: "/admin/riders", icon: Bike },
  { label: "Customers", href: "/admin/customers", icon: Users },
  { label: "Promotions", href: "/admin/promotions", icon: Tag },
];

export default function AdminSidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 flex-shrink-0 bg-[hsl(28,20%,8%)] border-r border-white/10 flex flex-col h-screen sticky top-0">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-white/10">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-ff-spice flex items-center justify-center text-ff-cream font-heading font-bold text-base" style={{ backgroundColor: "hsl(3 68% 32%)" }}>
            F
          </div>
          <div>
            <p className="text-sm font-semibold text-ff-cream font-heading">Delicia Foods</p>
            <p className="text-[10px] text-ff-cream/40 font-body uppercase tracking-widest">Admin Panel</p>
          </div>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const active =
            item.href === "/admin"
              ? location.pathname === "/admin"
              : location.pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              to={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 font-body ${
                active
                  ? "text-ff-cream"
                  : "text-ff-cream/50 hover:text-ff-cream/80 hover:bg-white/5"
              }`}
              style={active ? { backgroundColor: "hsl(3 68% 32% / 0.25)", color: "hsl(36 55% 92%)" } : {}}
            >
              <item.icon size={17} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-white/10 space-y-1">
        <Link
          to="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-ff-cream/50 hover:text-ff-cream/80 hover:bg-white/5 transition-colors font-body"
        >
          <ChevronLeft size={17} />
          Back to Store
        </Link>
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-ff-cream/50 hover:text-destructive/80 hover:bg-white/5 transition-colors font-body">
          <LogOut size={17} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
