import { CheckCircle2, Circle, Loader2 } from "lucide-react";
import type { OrderStatus } from "@/context/OrderContext";

interface Step {
  status: OrderStatus;
  label: string;
  description: string;
  emoji: string;
}

const STEPS: Step[] = [
  { status: "received", label: "Order Received", description: "We've got your order and are confirming it.", emoji: "📋" },
  { status: "preparing", label: "Preparing", description: "Our kitchen is cooking your meal fresh.", emoji: "👨‍🍳" },
  { status: "ready", label: "Ready", description: "Your order is packed and ready for pickup.", emoji: "📦" },
  { status: "out_for_delivery", label: "Out for Delivery", description: "Your rider is on the way to you.", emoji: "🛵" },
  { status: "delivered", label: "Delivered", description: "Your order has been delivered. Enjoy!", emoji: "✅" },
];

const STATUS_ORDER: OrderStatus[] = ["received", "preparing", "ready", "out_for_delivery", "delivered"];

interface OrderTimelineProps {
  status: OrderStatus;
}

export default function OrderTimeline({ status }: OrderTimelineProps) {
  const currentIndex = STATUS_ORDER.indexOf(status);

  if (status === "cancelled") {
    return (
      <div className="flex items-center gap-3 p-4 rounded-xl bg-destructive/10 border border-destructive/20">
        <span className="text-2xl">❌</span>
        <div>
          <p className="font-medium text-destructive">Order Cancelled</p>
          <p className="text-sm text-muted-foreground">This order has been cancelled. Contact us for support.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-0">
      {STEPS.map((step, index) => {
        const stepIndex = STATUS_ORDER.indexOf(step.status);
        const isDone = stepIndex < currentIndex;
        const isCurrent = stepIndex === currentIndex;
        const isPending = stepIndex > currentIndex;

        return (
          <div key={step.status} className="flex gap-4">
            {/* Connector line + icon */}
            <div className="flex flex-col items-center">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                  isDone
                    ? "bg-green-100 text-green-700"
                    : isCurrent
                    ? "bg-ff-spice text-white shadow-lg"
                    : "bg-muted text-muted-foreground"
                }`}
                style={isCurrent ? { backgroundColor: "hsl(3 68% 32%)" } : {}}
              >
                {isDone ? (
                  <CheckCircle2 size={18} />
                ) : isCurrent ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <Circle size={18} />
                )}
              </div>
              {index < STEPS.length - 1 && (
                <div
                  className={`w-0.5 flex-1 min-h-[28px] my-1 transition-all duration-500 ${
                    isDone ? "bg-green-300" : "bg-border"
                  }`}
                />
              )}
            </div>

            {/* Content */}
            <div className={`pb-5 ${index === STEPS.length - 1 ? "pb-0" : ""}`}>
              <div className="flex items-center gap-2">
                <span className="text-lg leading-none">{step.emoji}</span>
                <p
                  className={`text-sm font-semibold leading-snug ${
                    isDone
                      ? "text-green-700"
                      : isCurrent
                      ? "text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  {step.label}
                </p>
                {isCurrent && (
                  <span className="ff-badge bg-ff-spice/10 text-ff-spice text-[10px]" style={{ color: "hsl(3 68% 32%)" }}>
                    Current
                  </span>
                )}
              </div>
              <p
                className={`text-xs mt-0.5 leading-relaxed ${
                  isPending ? "text-muted-foreground/50" : "text-muted-foreground"
                }`}
              >
                {step.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
