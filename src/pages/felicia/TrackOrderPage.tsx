import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ArrowRight } from "lucide-react";
import DeliciaNavbar from "@/components/felicia/DeliciaNavbar";
import DeliciaFooter from "@/components/felicia/DeliciaFooter";
import { useOrders } from "@/context/OrderContext";

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { getOrder } = useOrders();

  const handleTrack = () => {
    const trimmed = orderId.trim().toUpperCase();
    if (!trimmed) {
      setError("Please enter an order ID.");
      return;
    }
    const order = getOrder(trimmed);
    if (!order) {
      setError(`No order found with ID "${trimmed}". Check your confirmation message.`);
      return;
    }
    navigate(`/order/${trimmed}/tracking`);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <DeliciaNavbar />

      <section className="section-dark pattern-adire flex-1 flex items-center justify-center pt-16">
        <div className="container mx-auto px-4 py-16 flex flex-col items-center text-center">
          <div className="text-6xl mb-6">📍</div>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-ff-cream mb-3">
            Track Your Order
          </h1>
          <p className="text-ff-cream/70 font-body mb-8 max-w-md">
            Enter your order ID to see the live status of your delivery. You'll find it in your confirmation message.
          </p>

          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 space-y-4 text-left">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground font-body">Order ID</label>
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  value={orderId}
                  onChange={(e) => { setOrderId(e.target.value); setError(""); }}
                  onKeyDown={(e) => e.key === "Enter" && handleTrack()}
                  placeholder="e.g. FF-KZRP12"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-border text-sm font-mono tracking-widest outline-none focus:ring-2 transition-all"
                />
              </div>
              {error && <p className="text-xs text-destructive font-body">{error}</p>}
            </div>

            <button onClick={handleTrack} className="w-full btn-spice justify-center py-3.5 text-base">
              Track Order <ArrowRight size={18} />
            </button>

            <p className="text-xs text-muted-foreground font-body text-center">
              Demo order: <button onClick={() => setOrderId("FF-KZRP12")} className="font-mono font-semibold hover:underline" style={{ color: "hsl(3 68% 32%)" }}>FF-KZRP12</button>
            </p>
          </div>
        </div>
      </section>

      <DeliciaFooter />
    </div>
  );
}
