import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const testimonials = [
  {
    quote:
      "I hired Faithful for a complex wine project after reaching the limits of what standard automation could handle. He consistently delivered creative, out-of-the-box solutions in a timely manner. I highly recommend him for anyone facing unique technical challenges.",
    name: "Peter Douglas",
    role: "CEO, Sustaina Wines",
    image: "/images/clients/peter-douglas.jpeg",
  },
  {
    quote:
      "Faithful did an excellent job leading our social media presence at Educato. In just a couple of weeks, he grasped our brand voice, created engaging content, and helped us grow our online presence. I highly recommend him for any social media or content marketing role!",
    name: "Pierre-Louis Monnot",
    role: "Co-founder, Educato AI",
    image: "/images/clients/Pierre.jpg",
  },
  {
    quote:
      "He is amazing at what he does, very prompt and professional. Looking forward for future collabs.",
    name: "Avantika",
    role: "Publishing Company",
    image: null,
    initial: "A",
  },
  {
    quote:
      "I truly appreciate your support and efforts. Your work ethic and the dedication that you have put into the Instagram page is an integral part of our journey.",
    name: "Tekla Balfour",
    role: "CEO, POPIN",
    image: "/images/clients/Tekla.jpg",
  },
];

const StarRating = () => (
  <div className="flex gap-1 mb-5">
    {Array.from({ length: 5 }).map((_, i) => (
      <svg key={i} className="w-4 h-4 text-primary fill-current" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

const TestimonialsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const allTestimonials = [...testimonials, ...testimonials];

  return (
    <section ref={ref} className="py-32 overflow-hidden relative">
      {/* Section background */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "hsl(var(--surface-2) / 0.3)" }} />
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(to right, transparent, hsl(var(--border)), transparent)" }} />
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "linear-gradient(to right, transparent, hsl(var(--border)), transparent)" }} />

      <div className="px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-xs text-primary tracking-widest uppercase block mb-4">// Verified</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
            The Receipts
          </h2>
          <p className="text-muted-foreground text-lg">Real clients. Real outcomes. Unedited.</p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative"
      >
        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none" style={{ background: "linear-gradient(to right, hsl(var(--background)), transparent)" }} />
        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none" style={{ background: "linear-gradient(to left, hsl(var(--background)), transparent)" }} />

        <div className="marquee-track-slow flex items-stretch gap-6 px-6">
          {allTestimonials.map((t, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-[390px] rounded-xl border p-8 flex flex-col justify-between transition-colors hover:border-primary/40"
              style={{ background: "hsl(var(--surface-1))", borderColor: "hsl(var(--border))" }}
            >
              <div>
                <StarRating />
                <p className="text-muted-foreground leading-relaxed text-sm italic">
                  "{t.quote}"
                </p>
              </div>
              <div className="flex items-center gap-3 pt-6 mt-6 border-t border-border">
                {t.image ? (
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                    style={{ boxShadow: "0 0 0 2px hsl(var(--primary) / 0.3)" }}
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full border border-glow flex items-center justify-center flex-shrink-0" style={{ background: "hsl(var(--primary) / 0.15)" }}>
                    <span className="text-primary font-display font-bold text-sm">{t.initial}</span>
                  </div>
                )}
                <div>
                  <p className="font-display font-semibold text-foreground text-sm">{t.name}</p>
                  <p className="font-mono text-xs text-dim">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default TestimonialsSection;
