import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, ArrowRight, CreditCard, Building2, CheckCircle2, MapPin, Phone, User, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import FeliciaNavbar from "@/components/felicia/FeliciaNavbar";
import { useCart } from "@/context/CartContext";
import { useOrders } from "@/context/OrderContext";
import { formatPrice } from "@/data/meals";

const deliverySchema = z.object({
  name: z.string().min(2, "Full name required"),
  phone: z.string().min(10, "Valid phone number required"),
  street: z.string().min(5, "Street address required"),
  area: z.string().min(2, "Area / LGA required"),
  landmark: z.string().optional(),
  notes: z.string().optional(),
});

type DeliveryForm = z.infer<typeof deliverySchema>;

const PAYMENT_METHODS = [
  {
    id: "paystack",
    label: "Pay Online (Paystack)",
    description: "Card, bank transfer, USSD — all channels",
    icon: <CreditCard size={20} />,
  },
  {
    id: "transfer",
    label: "Bank Transfer",
    description: "Transfer to our account before delivery",
    icon: <Building2 size={20} />,
  },
];

type Step = "delivery" | "payment" | "confirm";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { items, subtotal, deliveryFee, total, clearCart } = useCart();
  const { placeOrder } = useOrders();
  const [step, setStep] = useState<Step>("delivery");
  const [paymentMethod, setPaymentMethod] = useState("paystack");
  const [placing, setPlacing] = useState(false);
  const [deliveryData, setDeliveryData] = useState<DeliveryForm | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DeliveryForm>({ resolver: zodResolver(deliverySchema) });

  if (items.length === 0 && step !== "confirm") {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <FeliciaNavbar />
        <div className="flex-1 flex items-center justify-center flex-col gap-4 pt-20">
          <div className="text-6xl">🛒</div>
          <h2 className="font-heading text-2xl font-semibold">Your cart is empty</h2>
          <button onClick={() => navigate("/menu")} className="btn-spice mt-2">
            Browse Menu
          </button>
        </div>
      </div>
    );
  }

  const onDeliverySubmit = (data: DeliveryForm) => {
    setDeliveryData(data);
    setStep("payment");
  };

  const handlePlaceOrder = async () => {
    if (!deliveryData) return;
    setPlacing(true);
    await new Promise((r) => setTimeout(r, 1200));
    const order = placeOrder({
      items,
      subtotal,
      deliveryFee,
      total,
      customerName: deliveryData.name,
      customerPhone: deliveryData.phone,
      deliveryAddress: `${deliveryData.street}, ${deliveryData.area}${deliveryData.landmark ? ` (${deliveryData.landmark})` : ""}`,
      paymentMethod,
    });
    clearCart();
    setPlacing(false);
    navigate(`/order/${order.id}/tracking`);
  };

  const steps: { key: Step; label: string }[] = [
    { key: "delivery", label: "Delivery" },
    { key: "payment", label: "Payment" },
    { key: "confirm", label: "Confirm" },
  ];

  const stepIndex = steps.findIndex((s) => s.key === step);

  return (
    <div className="min-h-screen bg-background">
      <FeliciaNavbar />

      <div className="pt-20">
        {/* Progress bar */}
        <div className="section-dark py-6 pattern-adire">
          <div className="container mx-auto px-4">
            <h1 className="font-heading text-3xl font-semibold text-ff-cream mb-4">Checkout</h1>
            <div className="flex items-center gap-0">
              {steps.map((s, i) => (
                <div key={s.key} className="flex items-center">
                  <div
                    className={`flex items-center gap-2 text-sm font-medium font-body transition-colors ${
                      i <= stepIndex ? "text-ff-cream" : "text-ff-cream/40"
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-all ${
                        i < stepIndex
                          ? "bg-green-500 text-white"
                          : i === stepIndex
                          ? "text-white"
                          : "bg-white/10 text-ff-cream/40"
                      }`}
                      style={i === stepIndex ? { backgroundColor: "hsl(3 68% 32%)" } : {}}
                    >
                      {i < stepIndex ? <CheckCircle2 size={14} /> : i + 1}
                    </div>
                    <span className="hidden sm:inline">{s.label}</span>
                  </div>
                  {i < steps.length - 1 && (
                    <div
                      className={`w-12 h-px mx-2 transition-colors ${
                        i < stepIndex ? "bg-green-400/50" : "bg-white/15"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main form area */}
            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                {/* Step 1: Delivery */}
                {step === "delivery" && (
                  <motion.div
                    key="delivery"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="bg-white rounded-2xl border border-border p-6 shadow-sm"
                  >
                    <h2 className="font-heading text-2xl font-semibold text-foreground mb-6">
                      Delivery Information
                    </h2>
                    <form onSubmit={handleSubmit(onDeliverySubmit)} className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField
                          label="Full Name"
                          icon={<User size={15} />}
                          error={errors.name?.message}
                        >
                          <input {...register("name")} placeholder="e.g. Aisha Musa" className="ff-input" />
                        </FormField>
                        <FormField
                          label="Phone Number"
                          icon={<Phone size={15} />}
                          error={errors.phone?.message}
                        >
                          <input {...register("phone")} placeholder="080XXXXXXXX" className="ff-input" />
                        </FormField>
                      </div>
                      <FormField
                        label="Street Address"
                        icon={<MapPin size={15} />}
                        error={errors.street?.message}
                      >
                        <input {...register("street")} placeholder="e.g. 14 Yakubu Gowon Way" className="ff-input" />
                      </FormField>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField label="Area / LGA" error={errors.area?.message}>
                          <input {...register("area")} placeholder="e.g. Kaduna North" className="ff-input" />
                        </FormField>
                        <FormField label="Nearest Landmark (optional)">
                          <input {...register("landmark")} placeholder="e.g. Near Total Station" className="ff-input" />
                        </FormField>
                      </div>
                      <FormField label="Delivery Notes (optional)">
                        <textarea
                          {...register("notes")}
                          placeholder="Any instructions for the rider?"
                          rows={2}
                          className="ff-input resize-none"
                        />
                      </FormField>
                      <button type="submit" className="btn-spice w-full justify-center py-3.5 text-base mt-2">
                        Continue to Payment <ArrowRight size={18} />
                      </button>
                    </form>
                  </motion.div>
                )}

                {/* Step 2: Payment */}
                {step === "payment" && (
                  <motion.div
                    key="payment"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <div className="bg-white rounded-2xl border border-border p-6 shadow-sm">
                      <h2 className="font-heading text-2xl font-semibold text-foreground mb-6">
                        Payment Method
                      </h2>
                      <div className="space-y-3">
                        {PAYMENT_METHODS.map((pm) => (
                          <button
                            key={pm.id}
                            onClick={() => setPaymentMethod(pm.id)}
                            className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                              paymentMethod === pm.id
                                ? "border-ff-spice bg-ff-spice/5"
                                : "border-border hover:border-muted-foreground/30"
                            }`}
                            style={paymentMethod === pm.id ? { borderColor: "hsl(3 68% 32%)", backgroundColor: "hsl(3 68% 32% / 0.05)" } : {}}
                          >
                            <div
                              className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                                paymentMethod === pm.id ? "text-white" : "bg-secondary text-muted-foreground"
                              }`}
                              style={paymentMethod === pm.id ? { backgroundColor: "hsl(3 68% 32%)" } : {}}
                            >
                              {pm.icon}
                            </div>
                            <div>
                              <p className="font-medium text-foreground font-body text-sm">{pm.label}</p>
                              <p className="text-xs text-muted-foreground font-body mt-0.5">{pm.description}</p>
                            </div>
                            <div
                              className={`ml-auto w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                paymentMethod === pm.id ? "border-ff-spice" : "border-border"
                              }`}
                              style={paymentMethod === pm.id ? { borderColor: "hsl(3 68% 32%)" } : {}}
                            >
                              {paymentMethod === pm.id && (
                                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "hsl(3 68% 32%)" }} />
                              )}
                            </div>
                          </button>
                        ))}
                      </div>

                      {paymentMethod === "transfer" && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="mt-4 p-4 rounded-xl bg-secondary/60 border border-border"
                        >
                          <p className="text-sm font-semibold text-foreground mb-2">Bank Transfer Details</p>
                          <div className="space-y-1 text-sm text-muted-foreground font-body">
                            <p>Bank: <span className="text-foreground font-medium">First Bank Nigeria</span></p>
                            <p>Account: <span className="text-foreground font-medium">3012345678</span></p>
                            <p>Name: <span className="text-foreground font-medium">Felicia Foods Ltd</span></p>
                          </div>
                          <p className="text-xs text-muted-foreground mt-2">
                            ⚠️ Order will be processed after payment confirmation.
                          </p>
                        </motion.div>
                      )}
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => setStep("delivery")}
                        className="flex items-center gap-2 px-5 py-3 rounded-full border border-border text-sm font-medium hover:bg-secondary transition-colors font-body"
                      >
                        <ArrowLeft size={16} /> Back
                      </button>
                      <button
                        onClick={() => setStep("confirm")}
                        className="flex-1 btn-spice justify-center py-3.5 text-base"
                      >
                        Review Order <ArrowRight size={18} />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Confirm */}
                {step === "confirm" && (
                  <motion.div
                    key="confirm"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <div className="bg-white rounded-2xl border border-border p-6 shadow-sm">
                      <h2 className="font-heading text-2xl font-semibold text-foreground mb-5">
                        Review Your Order
                      </h2>

                      {/* Delivery summary */}
                      {deliveryData && (
                        <div className="p-4 rounded-xl bg-secondary/40 border border-border mb-5">
                          <div className="flex items-start justify-between">
                            <p className="text-sm font-semibold text-foreground mb-2">Delivery To</p>
                            <button onClick={() => setStep("delivery")} className="text-xs text-ff-spice hover:underline" style={{ color: "hsl(3 68% 32%)" }}>Edit</button>
                          </div>
                          <p className="text-sm text-muted-foreground font-body">{deliveryData.name} · {deliveryData.phone}</p>
                          <p className="text-sm text-muted-foreground font-body">{deliveryData.street}, {deliveryData.area}</p>
                        </div>
                      )}

                      {/* Items summary */}
                      <div className="space-y-3 mb-5">
                        {items.map((item) => (
                          <div key={item.meal.id} className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2">
                              <span className="text-xl">{item.meal.emoji}</span>
                              <span className="font-body text-foreground">{item.meal.name}</span>
                              <span className="text-muted-foreground">× {item.quantity}</span>
                            </div>
                            <span className="font-semibold font-body">{formatPrice(item.meal.price * item.quantity)}</span>
                          </div>
                        ))}
                      </div>

                      <p className="text-sm font-semibold text-foreground mb-2">Payment: <span className="font-normal text-muted-foreground">{PAYMENT_METHODS.find((p) => p.id === paymentMethod)?.label}</span></p>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => setStep("payment")}
                        className="flex items-center gap-2 px-5 py-3 rounded-full border border-border text-sm font-medium hover:bg-secondary transition-colors font-body"
                      >
                        <ArrowLeft size={16} /> Back
                      </button>
                      <button
                        onClick={handlePlaceOrder}
                        disabled={placing}
                        className="flex-1 btn-spice justify-center py-3.5 text-base disabled:opacity-70"
                      >
                        {placing ? (
                          <>
                            <Loader2 size={18} className="animate-spin" /> Placing Order...
                          </>
                        ) : (
                          <>
                            Place Order · {formatPrice(total)} <ArrowRight size={18} />
                          </>
                        )}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-white rounded-2xl border border-border shadow-sm p-5">
                <h3 className="font-heading text-lg font-semibold text-foreground mb-4">Order Summary</h3>
                <div className="space-y-2.5 mb-4 max-h-64 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.meal.id} className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${item.meal.gradient} flex items-center justify-center text-lg flex-shrink-0`}>
                        {item.meal.emoji}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-foreground truncate font-body">{item.meal.name}</p>
                        <p className="text-xs text-muted-foreground">× {item.quantity}</p>
                      </div>
                      <p className="text-xs font-semibold font-body text-foreground flex-shrink-0">
                        {formatPrice(item.meal.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="space-y-2 pt-3 border-t border-border text-sm">
                  <div className="flex justify-between text-muted-foreground font-body">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground font-body">
                    <span>Delivery</span>
                    <span>{formatPrice(deliveryFee)}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-base text-foreground pt-2 border-t border-border">
                    <span>Total</span>
                    <span style={{ color: "hsl(3 68% 32%)" }}>{formatPrice(total)}</span>
                  </div>
                </div>
                <p className="text-[11px] text-muted-foreground font-body text-center mt-3">
                  Estimated delivery: 30–45 minutes
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FormField({
  label,
  icon,
  error,
  children,
}: {
  label: string;
  icon?: React.ReactNode;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-foreground font-body flex items-center gap-1.5">
        {icon && <span className="text-muted-foreground">{icon}</span>}
        {label}
      </label>
      <div className="[&>input]:w-full [&>input]:px-3.5 [&>input]:py-2.5 [&>input]:rounded-xl [&>input]:border [&>input]:border-border [&>input]:bg-white [&>input]:text-sm [&>input]:font-body [&>input]:outline-none [&>input]:focus:ring-2 [&>input]:transition-all [&>textarea]:w-full [&>textarea]:px-3.5 [&>textarea]:py-2.5 [&>textarea]:rounded-xl [&>textarea]:border [&>textarea]:border-border [&>textarea]:bg-white [&>textarea]:text-sm [&>textarea]:font-body [&>textarea]:outline-none [&>textarea]:focus:ring-2 [&>textarea]:transition-all">
        {children}
      </div>
      {error && <p className="text-xs text-destructive font-body">{error}</p>}
    </div>
  );
}
