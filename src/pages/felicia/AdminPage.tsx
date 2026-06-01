import { Link } from "react-router-dom";
import { TrendingUp, ShoppingBag, Bike, Users, ArrowRight, Clock } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import AdminSidebar from "@/components/felicia/AdminSidebar";
import { useOrders } from "@/context/OrderContext";
import { formatPrice } from "@/data/meals";

const weeklyData = [
  { day: "Mon", orders: 42, revenue: 115000 },
  { day: "Tue", orders: 55, revenue: 142000 },
  { day: "Wed", orders: 38, revenue: 98000 },
  { day: "Thu", orders: 67, revenue: 178000 },
  { day: "Fri", orders: 89, revenue: 235000 },
  { day: "Sat", orders: 112, revenue: 298000 },
  { day: "Sun", orders: 94, revenue: 251000 },
];

const STATUS_COLORS: Record<string, string> = {
  received: "bg-blue-100 text-blue-700",
  preparing: "bg-amber-100 text-amber-700",
  ready: "bg-purple-100 text-purple-700",
  out_for_delivery: "bg-orange-100 text-orange-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

export default function AdminPage() {
  const { orders } = useOrders();
  const recentOrders = orders.slice(0, 5);

  const stats = [
    {
      label: "Today's Orders",
      value: "47",
      change: "+12%",
      positive: true,
      icon: <ShoppingBag size={20} />,
      color: "bg-blue-50 text-blue-600",
    },
    {
      label: "Today's Revenue",
      value: "₦124,500",
      change: "+8%",
      positive: true,
      icon: <TrendingUp size={20} />,
      color: "bg-green-50 text-green-600",
    },
    {
      label: "Active Deliveries",
      value: "8",
      change: "Live",
      positive: true,
      icon: <Bike size={20} />,
      color: "bg-orange-50 text-orange-600",
    },
    {
      label: "Total Customers",
      value: "1,247",
      change: "+23 this week",
      positive: true,
      icon: <Users size={20} />,
      color: "bg-purple-50 text-purple-600",
    },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />

      <main className="flex-1 overflow-y-auto">
        {/* Top bar */}
        <div className="border-b border-border bg-white px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-heading text-2xl font-semibold text-foreground">Dashboard</h1>
            <p className="text-sm text-muted-foreground font-body">
              {new Date().toLocaleDateString("en-NG", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
            </p>
          </div>
          <Link to="/menu" target="_blank" className="flex items-center gap-1.5 text-sm font-medium font-body border border-border rounded-full px-4 py-2 hover:bg-secondary transition-colors">
            View Store <ArrowRight size={14} />
          </Link>
        </div>

        <div className="p-6 space-y-6">
          {/* Stats grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-white rounded-2xl border border-border p-5 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm text-muted-foreground font-body">{stat.label}</p>
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center ${stat.color}`}>
                    {stat.icon}
                  </div>
                </div>
                <p className="font-heading text-2xl font-bold text-foreground">{stat.value}</p>
                <p className={`text-xs font-body mt-1 ${stat.positive ? "text-green-600" : "text-destructive"}`}>
                  {stat.change}
                </p>
              </div>
            ))}
          </div>

          {/* Charts row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Orders chart */}
            <div className="bg-white rounded-2xl border border-border shadow-sm p-5">
              <h3 className="font-heading text-lg font-semibold text-foreground mb-1">Weekly Orders</h3>
              <p className="text-xs text-muted-foreground font-body mb-4">Orders placed this week</p>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={weeklyData} barSize={28}>
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontFamily: "DM Sans" }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fontFamily: "DM Sans" }} />
                  <Tooltip
                    contentStyle={{ borderRadius: 12, border: "1px solid hsl(var(--border))", fontSize: 12, fontFamily: "DM Sans" }}
                    cursor={{ fill: "hsl(var(--secondary))" }}
                  />
                  <Bar dataKey="orders" fill="hsl(3 68% 32%)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Revenue chart */}
            <div className="bg-white rounded-2xl border border-border shadow-sm p-5">
              <h3 className="font-heading text-lg font-semibold text-foreground mb-1">Weekly Revenue</h3>
              <p className="text-xs text-muted-foreground font-body mb-4">Revenue trend this week (₦)</p>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={weeklyData}>
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontFamily: "DM Sans" }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fontFamily: "DM Sans" }} tickFormatter={(v) => `₦${(v / 1000).toFixed(0)}k`} />
                  <Tooltip
                    contentStyle={{ borderRadius: 12, border: "1px solid hsl(var(--border))", fontSize: 12, fontFamily: "DM Sans" }}
                    formatter={(v: number) => [formatPrice(v), "Revenue"]}
                  />
                  <Line dataKey="revenue" stroke="hsl(43 78% 45%)" strokeWidth={2.5} dot={{ fill: "hsl(43 78% 45%)", r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent orders */}
          <div className="bg-white rounded-2xl border border-border shadow-sm">
            <div className="flex items-center justify-between p-5 border-b border-border">
              <h3 className="font-heading text-lg font-semibold text-foreground">Recent Orders</h3>
              <Link to="/admin/orders" className="text-sm font-medium font-body hover:underline" style={{ color: "hsl(3 68% 32%)" }}>
                View all <ArrowRight size={14} className="inline" />
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    {["Order ID", "Customer", "Items", "Total", "Status", "Time"].map((h) => (
                      <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide font-body">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-5 py-8 text-center text-muted-foreground font-body text-sm">
                        No orders yet
                      </td>
                    </tr>
                  ) : (
                    recentOrders.map((order) => (
                      <tr key={order.id} className="border-b border-border hover:bg-secondary/30 transition-colors">
                        <td className="px-5 py-3.5 font-mono text-xs font-semibold text-foreground">{order.id}</td>
                        <td className="px-5 py-3.5 font-body text-foreground">{order.customerName}</td>
                        <td className="px-5 py-3.5 font-body text-muted-foreground">
                          {order.items.reduce((sum, i) => sum + i.quantity, 0)} items
                        </td>
                        <td className="px-5 py-3.5 font-body font-semibold text-foreground">{formatPrice(order.total)}</td>
                        <td className="px-5 py-3.5">
                          <span className={`ff-badge text-xs ${STATUS_COLORS[order.status] || "bg-secondary text-muted-foreground"}`}>
                            {order.status.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                          </span>
                        </td>
                        <td className="px-5 py-3.5 font-body text-muted-foreground text-xs flex items-center gap-1">
                          <Clock size={11} />
                          {order.placedAt.toLocaleTimeString("en-NG", { hour: "2-digit", minute: "2-digit" })}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
