import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { ArrowRight, MapPin, Clock, ShieldCheck, Star, ChevronRight } from "lucide-react";
import DeliciaNavbar from "@/components/felicia/DeliciaNavbar";
import DeliciaFooter from "@/components/felicia/DeliciaFooter";
import MealCard from "@/components/felicia/MealCard";
import { categories } from "@/data/categories";
import { getPopularMeals } from "@/data/meals";

const popularMeals = getPopularMeals().slice(0, 6);

const testimonials = [
  {
    name: "Fatima Al-Hassan",
    role: "Kaduna North",
    text: "The jollof rice is absolutely unmatched. It arrives hot, perfectly portioned, and it tastes like home. Delivery was fast!",
    rating: 5,
    avatar: "F",
  },
  {
    name: "Emmanuel Okafor",
    role: "City Centre",
    text: "Best suya I've ever ordered online. The kilishi is the real deal — authentic Northern flavor. I order every week now.",
    rating: 5,
    avatar: "E",
  },
  {
    name: "Ngozi Adeyemi",
    role: "Barnawa",
    text: "The delivery verification code system is genius. I know exactly when my food arrives and can confirm it. 10/10 experience.",
    rating: 5,
    avatar: "N",
  },
];

const features = [
  {
    icon: "🍽️",
    title: "Fresh Every Order",
    description: "We prepare every meal after you order. No reheated food — ever.",
  },
  {
    icon: "🛵",
    title: "City-Wide Delivery",
    description: "We deliver across all areas of Kaduna State, 7 days a week.",
  },
  {
    icon: "📱",
    title: "Real-Time Tracking",
    description: "Watch your order move from kitchen to your door. Live status updates.",
  },
  {
    icon: "🔐",
    title: "Verified Delivery",
    description: "A unique code confirms your delivery. No order marked done without you.",
  },
];

const howItWorksSteps = [
  {
    step: "01",
    title: "Browse & Choose",
    description: "Explore our menu of authentic Nigerian meals and add your favorites to cart.",
    icon: "🔍",
  },
  {
    step: "02",
    title: "Pay Securely",
    description: "Complete your order with our trusted Nigerian payment gateways — fast and safe.",
    icon: "💳",
  },
  {
    step: "03",
    title: "Track & Receive",
    description: "Watch your order in real time. Confirm delivery with your unique verification code.",
    icon: "📍",
  },
];

function FadeInSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <DeliciaNavbar />

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center section-dark pattern-adire overflow-hidden">
        {/* Layered gradient orbs */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 70% 40%, hsl(16 56% 47% / 0.15) 0%, transparent 60%), radial-gradient(ellipse 60% 80% at 10% 80%, hsl(3 68% 32% / 0.2) 0%, transparent 50%)",
          }}
        />

        <div className="container mx-auto px-4 pt-20 pb-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: copy */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-ff-gold/30 bg-ff-gold/10 text-ff-gold text-sm font-body"
                style={{ color: "hsl(43 78% 62%)", borderColor: "hsl(43 78% 45% / 0.3)" }}
              >
                <MapPin size={13} />
                Delivering across Kaduna State
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] text-ff-cream"
              >
                Taste the
                <br />
                <em className="not-italic" style={{ color: "hsl(16 56% 60%)" }}>
                  Soul
                </em>{" "}
                of
                <br />
                Kaduna
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-base sm:text-lg text-ff-cream/70 font-body leading-relaxed max-w-lg"
              >
                From Delicia's kitchen to your doorstep — authentic Northern Nigerian cuisine, premium quality, and real-time delivery tracking. No compromise.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-wrap gap-3"
              >
                <Link to="/menu" className="btn-spice text-base px-8 py-3.5">
                  Order Now <ArrowRight size={18} />
                </Link>
                <Link to="/#how-it-works" className="btn-outline-cream text-base px-8 py-3.5">
                  How It Works
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex items-center gap-6 pt-2"
              >
                {[
                  { value: "500+", label: "Daily Orders" },
                  { value: "4.9★", label: "Rating" },
                  { value: "45min", label: "Avg Delivery" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p className="font-heading text-2xl font-bold text-ff-cream">{stat.value}</p>
                    <p className="text-xs text-ff-cream/50 font-body">{stat.label}</p>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right: visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:flex justify-center relative"
            >
              {/* Main plate visual */}
              <div className="relative">
                <div
                  className="w-80 h-80 rounded-full flex items-center justify-center text-9xl shadow-2xl animate-float"
                  style={{
                    background: "radial-gradient(circle at 40% 35%, hsl(16 56% 55%), hsl(3 68% 32%) 60%, hsl(28 20% 8%))",
                    boxShadow: "0 40px 80px -20px hsl(3 68% 32% / 0.5), inset 0 1px 0 hsl(36 55% 92% / 0.1)",
                  }}
                >
                  🍛
                </div>

                {/* Floating mini cards */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                  className="absolute -left-8 top-16 bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-3"
                >
                  <span className="text-2xl">🔥</span>
                  <div>
                    <p className="text-xs font-semibold text-foreground">Party Jollof</p>
                    <p className="text-xs text-ff-spice font-medium" style={{ color: "hsl(3 68% 32%)" }}>₦2,800</p>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                  className="absolute -right-4 bottom-20 bg-white rounded-2xl shadow-xl px-4 py-3"
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} size={10} fill="hsl(43 78% 45%)" color="hsl(43 78% 45%)" />
                    ))}
                  </div>
                  <p className="text-xs font-semibold text-foreground">Order confirmed</p>
                  <p className="text-[10px] text-muted-foreground">ETA: 35 minutes</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-12 fill-background">
            <path d="M0,60 C360,0 1080,0 1440,60 L1440,60 L0,60 Z" />
          </svg>
        </div>
      </section>

      {/* ── CATEGORIES ───────────────────────────────────────────────── */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <FadeInSection>
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-xs uppercase tracking-widest text-ff-terracotta font-body font-medium mb-1">
                  What's Cooking
                </p>
                <h2 className="font-heading text-3xl md:text-4xl font-semibold text-foreground">
                  Browse by Category
                </h2>
              </div>
              <Link to="/menu" className="hidden sm:flex items-center gap-1 text-sm font-medium text-ff-spice hover:text-ff-spice-bright transition-colors" style={{ color: "hsl(3 68% 32%)" }}>
                See all <ChevronRight size={16} />
              </Link>
            </div>
          </FadeInSection>

          <FadeInSection delay={0.1}>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {categories.map((cat, i) => (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                >
                  <Link
                    to={`/menu?category=${cat.id}`}
                    className="group flex flex-col items-center gap-3 p-4 rounded-2xl bg-white border border-border hover:border-ff-spice/30 hover:shadow-md transition-all duration-200"
                  >
                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-200`}
                    >
                      {cat.emoji}
                    </div>
                    <p className="text-xs font-medium text-foreground text-center leading-snug font-body">
                      {cat.name}
                    </p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* ── POPULAR MEALS ─────────────────────────────────────────────── */}
      <section className="py-16 section-smoke pattern-adire-warm">
        <div className="container mx-auto px-4">
          <FadeInSection>
            <div className="flex items-center justify-between mb-10">
              <div>
                <p className="text-xs uppercase tracking-widest text-ff-terracotta font-body font-medium mb-1">
                  Customer Favorites
                </p>
                <h2 className="font-heading text-3xl md:text-4xl font-semibold text-foreground">
                  Most Popular Meals
                </h2>
              </div>
              <Link
                to="/menu"
                className="hidden sm:flex items-center gap-1 text-sm font-medium hover:opacity-80 transition-colors"
                style={{ color: "hsl(3 68% 32%)" }}
              >
                View all <ChevronRight size={16} />
              </Link>
            </div>
          </FadeInSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {popularMeals.map((meal, i) => (
              <FadeInSection key={meal.id} delay={i * 0.08}>
                <MealCard meal={meal} />
              </FadeInSection>
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link to="/menu" className="btn-spice">
              View Full Menu <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────── */}
      <section id="how-it-works" className="py-20 section-dark pattern-adire">
        <div className="container mx-auto px-4">
          <FadeInSection>
            <div className="text-center mb-14">
              <p className="text-xs uppercase tracking-widest font-body font-medium mb-2" style={{ color: "hsl(43 78% 62%)" }}>
                Simple & Seamless
              </p>
              <h2 className="font-heading text-3xl md:text-5xl font-semibold text-ff-cream">
                How It Works
              </h2>
              <p className="text-ff-cream/60 mt-3 max-w-md mx-auto font-body">
                From browsing to delivery — your entire order in three simple steps.
              </p>
            </div>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {howItWorksSteps.map((step, i) => (
              <FadeInSection key={step.step} delay={i * 0.15}>
                <div className="relative p-7 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm text-center group hover:border-white/20 transition-all duration-300">
                  <div className="absolute top-4 right-4 font-heading text-5xl font-bold text-white/5 select-none">
                    {step.step}
                  </div>
                  <div className="text-5xl mb-5">{step.icon}</div>
                  <h3 className="font-heading text-xl font-semibold text-ff-cream mb-2">{step.title}</h3>
                  <p className="text-sm text-ff-cream/60 font-body leading-relaxed">{step.description}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY US ───────────────────────────────────────────────────── */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <FadeInSection>
            <div className="text-center mb-12">
              <p className="text-xs uppercase tracking-widest text-ff-terracotta font-body font-medium mb-2">
                Our Promise
              </p>
              <h2 className="font-heading text-3xl md:text-4xl font-semibold text-foreground">
                Why Choose Delicia Foods
              </h2>
            </div>
          </FadeInSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((f, i) => (
              <FadeInSection key={f.title} delay={i * 0.1}>
                <div className="p-6 rounded-2xl bg-white border border-border hover:shadow-md transition-all duration-300 text-center">
                  <div className="text-4xl mb-4">{f.icon}</div>
                  <h3 className="font-heading text-lg font-semibold text-foreground mb-2">{f.title}</h3>
                  <p className="text-sm text-muted-foreground font-body leading-relaxed">{f.description}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────── */}
      <section className="py-16 section-smoke">
        <div className="container mx-auto px-4">
          <FadeInSection>
            <div className="text-center mb-12">
              <p className="text-xs uppercase tracking-widest text-ff-terracotta font-body font-medium mb-2">
                What Customers Say
              </p>
              <h2 className="font-heading text-3xl md:text-4xl font-semibold text-foreground">
                Real Stories, Real Flavor
              </h2>
            </div>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <FadeInSection key={t.name} delay={i * 0.12}>
                <div className="p-6 rounded-2xl bg-white border border-border shadow-sm">
                  <div className="flex items-center gap-1 mb-4">
                    {Array.from({ length: t.rating }).map((_, s) => (
                      <Star key={s} size={14} fill="hsl(43 78% 45%)" color="hsl(43 78% 45%)" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground font-body leading-relaxed italic mb-5">
                    "{t.text}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm"
                      style={{ backgroundColor: "hsl(3 68% 32%)" }}
                    >
                      {t.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground font-body">{t.name}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <MapPin size={10} /> {t.role}
                      </p>
                    </div>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────────────────────── */}
      <section
        className="py-20 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, hsl(3 68% 28%) 0%, hsl(16 56% 40%) 50%, hsl(25 85% 45%) 100%)",
        }}
      >
        <div className="absolute inset-0 pattern-adire opacity-50" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <FadeInSection>
            <p className="text-xs uppercase tracking-widest text-ff-cream/60 font-body mb-3">
              Ready to order?
            </p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-ff-cream mb-5">
              Hungry? Let's Fix That.
            </h2>
            <p className="text-ff-cream/80 font-body mb-8 max-w-md mx-auto">
              Browse our full menu and have authentic Northern Nigerian food delivered to you in under an hour.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/menu"
                className="inline-flex items-center gap-2 bg-white rounded-full px-8 py-3.5 text-base font-semibold hover:bg-ff-cream transition-colors"
                style={{ color: "hsl(3 68% 32%)" }}
              >
                Browse Menu <ArrowRight size={18} />
              </Link>
              <Link to="/auth" className="btn-outline-cream text-base px-8 py-3.5">
                Create Account
              </Link>
            </div>
          </FadeInSection>
        </div>
      </section>

      <DeliciaFooter />
    </div>
  );
}
