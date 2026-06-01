import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend,
} from "recharts";
import AdminSidebar from "@/components/felicia/AdminSidebar";
import { formatPrice } from "@/data/meals";

const monthlyRevenue = [
  { month: "Jan", revenue: 1250000, orders: 480 },
  { month: "Feb", revenue: 1480000, orders: 560 },
  { month: "Mar", revenue: 1350000, orders: 510 },
  { month: "Apr", revenue: 1620000, orders: 620 },
  { month: "May", revenue: 1890000, orders: 720 },
  { month: "Jun", revenue: 2100000, orders: 810 },
];

const topMeals = [
  { name: "Party Jollof Rice", orders: 312, revenue: 873600 },
  { name: "Beef Suya", orders: 287, revenue: 717500 },
  { name: "Chicken Shawarma", orders: 264, revenue: 660000 },
  { name: "Egusi + Eba", orders: 198, revenue: 594000 },
  { name: "Catfish Pepper Soup", orders: 176, revenue: 668800 },
  { name: "Grilled Tilapia", orders: 143, revenue: 786500 },
];

const categoryShare = [
  { name: "Rice & Grains", value: 35 },
  { name: "Protein & Grills", value: 28 },
  { name: "Street Food", value: 18 },
  { name: "Soups", value: 12 },
  { name: "Drinks", value: 7 },
];

const PIE_COLORS = [
  "hsl(3 68% 32%)",
  "hsl(16 56% 47%)",
  "hsl(43 78% 45%)",
  "hsl(28 20% 40%)",
  "hsl(3 68% 65%)",
];

const CUSTOM_TOOLTIP_STYLE = {
  borderRadius: 12,
  border: "1px solid hsl(var(--border))",
  fontSize: 12,
  fontFamily: "DM Sans",
};

export default function AdminAnalyticsPage() {
  const totalRevenue = monthlyRevenue.reduce((s, m) => s + m.revenue, 0);
  const totalOrders = monthlyRevenue.reduce((s, m) => s + m.orders, 0);
  const avgOrderValue = Math.round(totalRevenue / totalOrders);

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />

      <main className="flex-1 overflow-y-auto">
        <div className="border-b border-border bg-white px-6 py-4">
          <h1 className="font-heading text-2xl font-semibold text-foreground">Analytics</h1>
          <p className="text-sm text-muted-foreground font-body">Jan – Jun 2025 · All locations</p>
        </div>

        <div className="p-6 space-y-6">
          {/* KPI row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: "Total Revenue (6mo)", value: formatPrice(totalRevenue), sub: "Jan–Jun 2025" },
              { label: "Total Orders (6mo)", value: totalOrders.toLocaleString(), sub: "Across all categories" },
              { label: "Avg Order Value", value: formatPrice(avgOrderValue), sub: "Per transaction" },
            ].map((kpi) => (
              <div key={kpi.label} className="bg-white rounded-2xl border border-border shadow-sm p-5">
                <p className="text-sm text-muted-foreground font-body">{kpi.label}</p>
                <p className="font-heading text-2xl font-bold text-foreground mt-1">{kpi.value}</p>
                <p className="text-xs text-muted-foreground font-body mt-0.5">{kpi.sub}</p>
              </div>
            ))}
          </div>

          {/* Revenue trend */}
          <div className="bg-white rounded-2xl border border-border shadow-sm p-6">
            <h3 className="font-heading text-lg font-semibold text-foreground mb-1">Monthly Revenue</h3>
            <p className="text-xs text-muted-foreground font-body mb-5">Revenue trend over the last 6 months</p>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={monthlyRevenue}>
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontFamily: "DM Sans" }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fontFamily: "DM Sans" }} tickFormatter={(v) => `₦${(v / 1000000).toFixed(1)}M`} />
                <Tooltip contentStyle={CUSTOM_TOOLTIP_STYLE} formatter={(v: number) => [formatPrice(v), "Revenue"]} />
                <Line dataKey="revenue" stroke="hsl(3 68% 32%)" strokeWidth={2.5} dot={{ fill: "hsl(3 68% 32%)", r: 5 }} activeDot={{ r: 7 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Orders bar */}
            <div className="bg-white rounded-2xl border border-border shadow-sm p-6">
              <h3 className="font-heading text-lg font-semibold text-foreground mb-1">Monthly Orders</h3>
              <p className="text-xs text-muted-foreground font-body mb-5">Number of orders per month</p>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={monthlyRevenue} barSize={32}>
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontFamily: "DM Sans" }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fontFamily: "DM Sans" }} />
                  <Tooltip contentStyle={CUSTOM_TOOLTIP_STYLE} cursor={{ fill: "hsl(var(--secondary))" }} />
                  <Bar dataKey="orders" fill="hsl(43 78% 45%)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Category pie */}
            <div className="bg-white rounded-2xl border border-border shadow-sm p-6">
              <h3 className="font-heading text-lg font-semibold text-foreground mb-1">Orders by Category</h3>
              <p className="text-xs text-muted-foreground font-body mb-5">Share of orders per food category</p>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={categoryShare}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {categoryShare.map((_, i) => (
                      <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend
                    iconType="circle"
                    iconSize={8}
                    formatter={(v) => <span style={{ fontSize: 11, fontFamily: "DM Sans" }}>{v}</span>}
                  />
                  <Tooltip contentStyle={CUSTOM_TOOLTIP_STYLE} formatter={(v) => [`${v}%`, "Share"]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Top meals table */}
          <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
            <div className="p-5 border-b border-border">
              <h3 className="font-heading text-lg font-semibold text-foreground">Best-Selling Meals</h3>
              <p className="text-xs text-muted-foreground font-body mt-0.5">Top meals by order volume — Jan to Jun 2025</p>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-secondary/30">
                  {["Rank", "Meal", "Orders", "Revenue", "% of Total"].map((h) => (
                    <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide font-body">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {topMeals.map((meal, i) => (
                  <tr key={meal.name} className="border-b border-border hover:bg-secondary/20 transition-colors">
                    <td className="px-5 py-3.5 font-body font-semibold text-muted-foreground">#{i + 1}</td>
                    <td className="px-5 py-3.5 font-body font-medium text-foreground">{meal.name}</td>
                    <td className="px-5 py-3.5 font-body text-foreground">{meal.orders.toLocaleString()}</td>
                    <td className="px-5 py-3.5 font-body font-semibold" style={{ color: "hsl(3 68% 32%)" }}>{formatPrice(meal.revenue)}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden max-w-[80px]">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${(meal.orders / topMeals[0].orders) * 100}%`,
                              backgroundColor: "hsl(3 68% 32%)",
                            }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground font-body">
                          {Math.round((meal.orders / totalOrders) * 100 * 10) / 10}%
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
