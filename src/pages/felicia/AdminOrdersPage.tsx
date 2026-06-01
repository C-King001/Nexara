import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Filter, ExternalLink } from "lucide-react";
import AdminSidebar from "@/components/felicia/AdminSidebar";
import { useOrders, type OrderStatus } from "@/context/OrderContext";
import { formatPrice } from "@/data/meals";

const ALL_STATUSES: { key: OrderStatus | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "received", label: "Received" },
  { key: "preparing", label: "Preparing" },
  { key: "ready", label: "Ready" },
  { key: "out_for_delivery", label: "Out for Delivery" },
  { key: "delivered", label: "Delivered" },
  { key: "cancelled", label: "Cancelled" },
];

const NEXT_STATUS: Partial<Record<OrderStatus, OrderStatus>> = {
  received: "preparing",
  preparing: "ready",
  ready: "out_for_delivery",
  out_for_delivery: "delivered",
};

const STATUS_COLORS: Record<string, string> = {
  received: "bg-blue-100 text-blue-700",
  preparing: "bg-amber-100 text-amber-700",
  ready: "bg-purple-100 text-purple-700",
  out_for_delivery: "bg-orange-100 text-orange-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

export default function AdminOrdersPage() {
  const { orders, updateOrderStatus } = useOrders();
  const [filter, setFilter] = useState<OrderStatus | "all">("all");
  const [search, setSearch] = useState("");

  const filtered = orders.filter((o) => {
    const matchStatus = filter === "all" || o.status === filter;
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      o.id.toLowerCase().includes(q) ||
      o.customerName.toLowerCase().includes(q) ||
      o.customerPhone.includes(q);
    return matchStatus && matchSearch;
  });

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />

      <main className="flex-1 overflow-y-auto">
        <div className="border-b border-border bg-white px-6 py-4">
          <h1 className="font-heading text-2xl font-semibold text-foreground">Orders</h1>
          <p className="text-sm text-muted-foreground font-body">{orders.length} total orders</p>
        </div>

        <div className="p-6 space-y-5">
          {/* Filters */}
          <div className="bg-white rounded-2xl border border-border shadow-sm p-4 space-y-3">
            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by order ID, customer name or phone..."
                  className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-border bg-secondary/40 outline-none focus:ring-2 font-body"
                />
              </div>
              <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border text-sm font-medium font-body hover:bg-secondary transition-colors">
                <Filter size={14} /> Filter
              </button>
            </div>

            <div className="flex gap-2 flex-wrap">
              {ALL_STATUSES.map((s) => (
                <button
                  key={s.key}
                  onClick={() => setFilter(s.key)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium font-body transition-colors ${
                    filter === s.key ? "text-white" : "bg-secondary text-muted-foreground hover:text-foreground"
                  }`}
                  style={filter === s.key ? { backgroundColor: "hsl(3 68% 32%)" } : {}}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-secondary/30">
                    {["Order ID", "Customer", "Address", "Items", "Total", "Status", "Actions"].map((h) => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide font-body whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-5 py-12 text-center text-muted-foreground font-body">
                        No orders found
                      </td>
                    </tr>
                  ) : (
                    filtered.map((order) => {
                      const next = NEXT_STATUS[order.status];
                      return (
                        <tr key={order.id} className="border-b border-border hover:bg-secondary/20 transition-colors">
                          <td className="px-4 py-3 font-mono text-xs font-semibold text-foreground whitespace-nowrap">{order.id}</td>
                          <td className="px-4 py-3">
                            <p className="font-body font-medium text-foreground">{order.customerName}</p>
                            <p className="font-body text-xs text-muted-foreground">{order.customerPhone}</p>
                          </td>
                          <td className="px-4 py-3 font-body text-xs text-muted-foreground max-w-[160px] truncate">{order.deliveryAddress}</td>
                          <td className="px-4 py-3 font-body text-muted-foreground">
                            {order.items.map((i) => `${i.meal.emoji} ×${i.quantity}`).join(" ")}
                          </td>
                          <td className="px-4 py-3 font-body font-semibold text-foreground whitespace-nowrap">{formatPrice(order.total)}</td>
                          <td className="px-4 py-3">
                            <span className={`ff-badge text-xs ${STATUS_COLORS[order.status] || ""}`}>
                              {order.status.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <Link
                                to={`/order/${order.id}/tracking`}
                                className="p-1.5 rounded-lg border border-border hover:bg-secondary transition-colors text-muted-foreground"
                                target="_blank"
                              >
                                <ExternalLink size={13} />
                              </Link>
                              {next && order.status !== "delivered" && order.status !== "cancelled" && (
                                <button
                                  onClick={() => updateOrderStatus(order.id, next)}
                                  className="px-3 py-1.5 rounded-lg text-xs font-medium font-body text-white transition-colors whitespace-nowrap"
                                  style={{ backgroundColor: "hsl(3 68% 32%)" }}
                                >
                                  → {next.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                                </button>
                              )}
                              {order.status !== "cancelled" && order.status !== "delivered" && (
                                <button
                                  onClick={() => updateOrderStatus(order.id, "cancelled")}
                                  className="px-3 py-1.5 rounded-lg text-xs font-medium font-body bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                                >
                                  Cancel
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })
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
