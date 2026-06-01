import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Phone, MapPin, Clock, KeyRound, CheckCircle2, ArrowRight, Copy, Check } from "lucide-react";
import { motion } from "framer-motion";
import DeliciaNavbar from "@/components/felicia/DeliciaNavbar";
import DeliciaFooter from "@/components/felicia/DeliciaFooter";
import OrderTimeline from "@/components/felicia/OrderTimeline";
import { useOrders } from "@/context/OrderContext";
import { formatPrice } from "@/data/meals";

export default function OrderTrackingPage() {
  const { orderId } = useParams<{ orderId: string }>();
  const { getOrder, confirmDelivery } = useOrders();
  const order = getOrder(orderId || "");

  const [verifyCode, setVerifyCode] = useState("");
  const [verifyError, setVerifyError] = useState("");
  const [verified, setVerified] = useState(false);
  const [codeCopied, setCodeCopied] = useState(false);

  const handleVerify = () => {
    if (!order) return;
    const success = confirmDelivery(order.id, verifyCode.trim());
    if (success) {
      setVerified(true);
      setVerifyError("");
    } else {
      setVerifyError("Incorrect code. Please check and try again.");
    }
  };

  const handleCopyCode = () => {
    if (order?.deliveryCode) {
      navigator.clipboard.writeText(order.deliveryCode);
      setCodeCopied(true);
      setTimeout(() => setCodeCopied(false), 2000);
    }
  };

  if (!order) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <DeliciaNavbar />
        <div className="flex-1 flex items-center justify-center flex-col gap-4 pt-20 text-center px-4">
          <div className="text-6xl">🔍</div>
          <h2 className="font-heading text-2xl font-semibold">Order not found</h2>
          <p className="text-muted-foreground font-body">
            We couldn't find order <code className="font-mono text-sm bg-secondary px-1.5 py-0.5 rounded">{orderId}</code>
          </p>
          <Link to="/menu" className="btn-spice mt-2">
            Place a New Order
          </Link>
        </div>
        <DeliciaFooter />
      </div>
    );
  }

  const isDelivered = order.status === "delivered";
  const isOutForDelivery = order.status === "out_for_delivery";
  const isCancelled = order.status === "cancelled";

  return (
    <div className="min-h-screen bg-background">
      <DeliciaNavbar />

      {/* Header */}
      <section className="section-dark pattern-adire pt-20 pb-8">
        <div className="container mx-auto px-4 pt-8">
          <p className="text-xs uppercase tracking-widest text-ff-cream/50 font-body mb-2">Track Your Order</p>
          <div className="flex items-start justify-between flex-wrap gap-3">
            <div>
              <h1 className="font-heading text-3xl md:text-4xl font-bold text-ff-cream">
                {isDelivered ? "Delivered! 🎉" : isCancelled ? "Order Cancelled" : "On Its Way..."}
              </h1>
              <p className="text-ff-cream/60 font-body mt-1">
                Order #{order.id} · Placed {order.placedAt.toLocaleDateString("en-NG", { month: "short", day: "numeric", year: "numeric" })}
              </p>
            </div>
            <div
              className={`px-4 py-1.5 rounded-full text-sm font-semibold font-body ${
                isDelivered
                  ? "bg-green-500/20 text-green-400"
                  : isCancelled
                  ? "bg-destructive/20 text-destructive"
                  : "text-white"
              }`}
              style={!isDelivered && !isCancelled ? { backgroundColor: "hsl(3 68% 32% / 0.3)", color: "hsl(36 55% 85%)" } : {}}
            >
              {order.status.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Timeline */}
          <div className="lg:col-span-2 space-y-5">
            {/* Status card */}
            <div className="bg-white rounded-2xl border border-border shadow-sm p-6">
              <h2 className="font-heading text-xl font-semibold text-foreground mb-5">Delivery Status</h2>
              <OrderTimeline status={order.status} />
            </div>

            {/* ETA card */}
            {!isDelivered && !isCancelled && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl border border-border shadow-sm p-5 flex items-center gap-4"
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "hsl(3 68% 32% / 0.1)" }}
                >
                  <Clock size={22} style={{ color: "hsl(3 68% 32%)" }} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-body">Estimated Delivery</p>
                  <p className="font-heading text-lg font-semibold text-foreground">
                    {order.estimatedDelivery.toLocaleTimeString("en-NG", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </motion.div>
            )}

            {/* Rider info */}
            {order.riderName && !isCancelled && (
              <div className="bg-white rounded-2xl border border-border shadow-sm p-5">
                <h3 className="font-heading text-lg font-semibold text-foreground mb-4">Your Rider</h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold font-body"
                      style={{ backgroundColor: "hsl(16 56% 47%)" }}
                    >
                      {order.riderName.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-foreground font-body">{order.riderName}</p>
                      <p className="text-xs text-muted-foreground font-body flex items-center gap-1">
                        <MapPin size={10} /> Delivery Rider
                      </p>
                    </div>
                  </div>
                  {order.riderPhone && (
                    <a
                      href={`tel:${order.riderPhone}`}
                      className="flex items-center gap-2 px-4 py-2 rounded-full border border-border text-sm font-medium hover:bg-secondary transition-colors font-body"
                    >
                      <Phone size={14} /> Call Rider
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Delivery verification */}
            {(isOutForDelivery || isDelivered) && !isCancelled && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl border border-border shadow-sm p-6"
              >
                <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                  Delivery Verification
                </h3>

                {isDelivered || verified ? (
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-green-50 border border-green-200">
                    <CheckCircle2 size={24} className="text-green-600 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-green-800 font-body">Delivery confirmed!</p>
                      <p className="text-sm text-green-700 font-body">Your order has been successfully delivered. Enjoy your meal!</p>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="text-sm text-muted-foreground font-body mb-4">
                      Your rider will present this code when they arrive. Once received, enter it below to confirm delivery.
                    </p>

                    {/* Show code to customer (in production, only the rider would have this) */}
                    <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/60 border border-border mb-4">
                      <div>
                        <p className="text-xs text-muted-foreground font-body uppercase tracking-widest mb-1">Your Code</p>
                        <p className="font-mono text-2xl font-bold tracking-[0.2em] text-foreground">
                          {order.deliveryCode}
                        </p>
                      </div>
                      <button
                        onClick={handleCopyCode}
                        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {codeCopied ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
                        {codeCopied ? "Copied!" : "Copy"}
                      </button>
                    </div>

                    <div className="flex gap-3">
                      <input
                        type="text"
                        value={verifyCode}
                        onChange={(e) => setVerifyCode(e.target.value)}
                        placeholder="Enter 6-digit code"
                        maxLength={6}
                        className="flex-1 px-4 py-3 rounded-xl border border-border text-sm font-mono tracking-widest outline-none focus:ring-2 focus:border-transparent transition-all"
                      />
                      <button
                        onClick={handleVerify}
                        disabled={verifyCode.length < 6}
                        className="btn-spice disabled:opacity-50 px-5"
                      >
                        <KeyRound size={16} /> Confirm
                      </button>
                    </div>
                    {verifyError && (
                      <p className="text-xs text-destructive font-body mt-2">{verifyError}</p>
                    )}
                  </>
                )}
              </motion.div>
            )}
          </div>

          {/* Order summary sidebar */}
          <div className="space-y-5">
            <div className="bg-white rounded-2xl border border-border shadow-sm p-5">
              <h3 className="font-heading text-lg font-semibold text-foreground mb-4">Order Details</h3>
              <div className="space-y-3 mb-4">
                {order.items.map((item) => (
                  <div key={item.meal.id} className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${item.meal.gradient} flex items-center justify-center text-lg flex-shrink-0`}>
                      {item.meal.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-foreground truncate font-body">{item.meal.name}</p>
                      <p className="text-xs text-muted-foreground">× {item.quantity}</p>
                    </div>
                    <p className="text-xs font-semibold font-body">{formatPrice(item.meal.price * item.quantity)}</p>
                  </div>
                ))}
              </div>
              <div className="space-y-1.5 pt-3 border-t border-border text-sm">
                <div className="flex justify-between text-muted-foreground font-body">
                  <span>Subtotal</span><span>{formatPrice(order.subtotal)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground font-body">
                  <span>Delivery</span><span>{formatPrice(order.deliveryFee)}</span>
                </div>
                <div className="flex justify-between font-semibold text-foreground pt-1.5 border-t border-border">
                  <span>Total</span>
                  <span style={{ color: "hsl(3 68% 32%)" }}>{formatPrice(order.total)}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-border shadow-sm p-5 space-y-3">
              <h3 className="font-heading text-base font-semibold text-foreground">Delivery To</h3>
              <div className="text-sm text-muted-foreground font-body space-y-1">
                <p className="font-medium text-foreground">{order.customerName}</p>
                <p className="flex items-center gap-1.5"><Phone size={12} /> {order.customerPhone}</p>
                <p className="flex items-start gap-1.5"><MapPin size={12} className="mt-0.5 flex-shrink-0" /> {order.deliveryAddress}</p>
              </div>
            </div>

            <Link
              to="/menu"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-full border border-border text-sm font-medium hover:bg-secondary transition-colors font-body"
            >
              Order Again <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>

      <DeliciaFooter />
    </div>
  );
}
