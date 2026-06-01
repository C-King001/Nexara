import { useState } from "react";
import { Phone, MapPin, Plus, CheckCircle2, Circle } from "lucide-react";
import AdminSidebar from "@/components/felicia/AdminSidebar";

interface Rider {
  id: string;
  name: string;
  phone: string;
  zone: string;
  status: "available" | "on_delivery" | "offline";
  deliveriesToday: number;
  activeOrderId?: string;
}

const INITIAL_RIDERS: Rider[] = [
  { id: "r1", name: "Ibrahim Suleiman", phone: "08098765432", zone: "Kaduna North", status: "on_delivery", deliveriesToday: 7, activeOrderId: "FF-KZRP12" },
  { id: "r2", name: "Musa Ibrahim", phone: "08033445566", zone: "Kaduna South", status: "available", deliveriesToday: 5 },
  { id: "r3", name: "Aminu Bello", phone: "08055667788", zone: "City Centre", status: "available", deliveriesToday: 9 },
  { id: "r4", name: "Yakubu Garba", phone: "08011223344", zone: "Barnawa", status: "offline", deliveriesToday: 0 },
  { id: "r5", name: "Fatima Usman", phone: "08077889900", zone: "Ungwan Rimi", status: "on_delivery", deliveriesToday: 4, activeOrderId: "FF-XYZAB1" },
  { id: "r6", name: "Sani Danladi", phone: "08066778899", zone: "Tudun Wada", status: "available", deliveriesToday: 6 },
];

const STATUS_CONFIG = {
  available: { label: "Available", color: "bg-green-100 text-green-700", dot: "bg-green-500" },
  on_delivery: { label: "On Delivery", color: "bg-orange-100 text-orange-700", dot: "bg-orange-500" },
  offline: { label: "Offline", color: "bg-gray-100 text-gray-500", dot: "bg-gray-400" },
};

export default function AdminRidersPage() {
  const [riders, setRiders] = useState<Rider[]>(INITIAL_RIDERS);

  const available = riders.filter((r) => r.status === "available").length;
  const onDelivery = riders.filter((r) => r.status === "on_delivery").length;
  const offline = riders.filter((r) => r.status === "offline").length;

  const toggleStatus = (id: string) => {
    setRiders((prev) =>
      prev.map((r) => {
        if (r.id !== id) return r;
        const next: Rider["status"] =
          r.status === "available" ? "offline" : r.status === "offline" ? "available" : r.status;
        return { ...r, status: next };
      })
    );
  };

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />

      <main className="flex-1 overflow-y-auto">
        <div className="border-b border-border bg-white px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-heading text-2xl font-semibold text-foreground">Delivery Riders</h1>
            <p className="text-sm text-muted-foreground font-body">{riders.length} riders registered</p>
          </div>
          <button
            className="flex items-center gap-2 text-sm font-medium font-body text-white rounded-full px-5 py-2.5"
            style={{ backgroundColor: "hsl(3 68% 32%)" }}
          >
            <Plus size={16} /> Add Rider
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Available", value: available, color: "text-green-600", bg: "bg-green-50" },
              { label: "On Delivery", value: onDelivery, color: "text-orange-600", bg: "bg-orange-50" },
              { label: "Offline", value: offline, color: "text-muted-foreground", bg: "bg-secondary" },
            ].map((stat) => (
              <div key={stat.label} className={`${stat.bg} rounded-2xl border border-border p-5 text-center`}>
                <p className={`font-heading text-3xl font-bold ${stat.color}`}>{stat.value}</p>
                <p className="text-sm text-muted-foreground font-body mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Riders grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {riders.map((rider) => {
              const statusCfg = STATUS_CONFIG[rider.status];
              return (
                <div key={rider.id} className="bg-white rounded-2xl border border-border shadow-sm p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold font-body text-lg flex-shrink-0"
                        style={{ backgroundColor: "hsl(16 56% 47%)" }}
                      >
                        {rider.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-foreground font-body">{rider.name}</p>
                        <p className="text-xs text-muted-foreground font-body flex items-center gap-1">
                          <MapPin size={10} /> {rider.zone}
                        </p>
                      </div>
                    </div>
                    <span className={`ff-badge text-xs flex items-center gap-1.5 ${statusCfg.color}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${statusCfg.dot}`} />
                      {statusCfg.label}
                    </span>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground font-body">
                      <Phone size={13} />
                      <a href={`tel:${rider.phone}`} className="hover:text-foreground transition-colors">{rider.phone}</a>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground font-body">
                      {rider.deliveriesToday > 0 ? (
                        <CheckCircle2 size={13} className="text-green-500" />
                      ) : (
                        <Circle size={13} />
                      )}
                      <span>{rider.deliveriesToday} deliveries today</span>
                    </div>
                    {rider.activeOrderId && (
                      <div className="p-2.5 rounded-lg bg-orange-50 border border-orange-100">
                        <p className="text-xs font-medium text-orange-700 font-body">
                          Active: Order #{rider.activeOrderId}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 pt-3 border-t border-border flex gap-2">
                    <a
                      href={`tel:${rider.phone}`}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl border border-border text-xs font-medium font-body hover:bg-secondary transition-colors"
                    >
                      <Phone size={12} /> Call
                    </a>
                    {rider.status !== "on_delivery" && (
                      <button
                        onClick={() => toggleStatus(rider.id)}
                        className={`flex-1 py-2 rounded-xl text-xs font-medium font-body transition-colors ${
                          rider.status === "available"
                            ? "bg-secondary text-muted-foreground hover:bg-secondary"
                            : "text-white"
                        }`}
                        style={rider.status === "offline" ? { backgroundColor: "hsl(3 68% 32%)" } : {}}
                      >
                        {rider.status === "available" ? "Set Offline" : "Set Available"}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
