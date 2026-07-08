import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const logos = [
  { src: "/logos/kaminskiy-logo.png", alt: "Kaminskiy Care & Repair" },
  { src: "/logos/popin-logo.png", alt: "POPIN" },
  { src: "/logos/logo1.png", alt: "Client logo" },
  { src: "/logos/logo2.png", alt: "Client logo" },
  { src: "/logos/logo3.png", alt: "Client logo" },
  { src: "/logos/logo4.png", alt: "Client logo" },
  { src: "/logos/logo5.png", alt: "Client logo" },
  { src: "/logos/logo6.png", alt: "Client logo" },
];

const LogoMarquee = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const allLogos = [...logos, ...logos];

  return (
    <section ref={ref} className="py-16 border-y border-border overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <p className="font-mono text-xs text-dim tracking-widest uppercase">
          Businesses I've worked with
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative"
      >
        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-background to-transparent pointer-events-none" />
        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-background to-transparent pointer-events-none" />

        <div className="marquee-track flex items-center gap-6">
          {allLogos.map((logo, i) => (
            <div
              key={i}
              className="flex-shrink-0 hover:scale-105 transition-transform duration-300"
              style={{
                width: "160px",
                height: "80px",
                background: "#ffffff",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "12px 16px",
                boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
              }}
            >
              <img
                src={logo.src}
                alt={logo.alt}
                loading="lazy"
                decoding="async"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  objectPosition: "center",
                  display: "block",
                }}
              />
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default LogoMarquee;
