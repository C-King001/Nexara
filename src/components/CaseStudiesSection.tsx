import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { caseStudies } from "@/data/caseStudies";

const CaseStudiesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="cases" ref={ref} className="py-32 px-6 relative">
      <div className="absolute inset-0 bg-surface-2/30" />
      
      <div className="relative max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-xs text-primary tracking-widest uppercase block mb-4">// Proof</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground">
            Systems That Delivered
          </h2>
        </motion.div>

        <div className="grid gap-8">
          {caseStudies.map((item, i) => (
            <motion.div
              key={item.tag}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
            >
              <Link
                to={`/case/${item.slug}`}
                className="module-border bg-surface-1 hover:shadow-glow transition-shadow duration-500 group cursor-pointer block overflow-hidden"
              >
                {/* Cover image */}
                {item.coverImage && (
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={item.coverImage}
                      alt={item.title}
                      className="w-full h-full object-cover object-top opacity-50 group-hover:opacity-70 group-hover:scale-105 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-surface-1/30 to-surface-1" />
                  </div>
                )}

                <div className="p-8 md:p-10">
                  <div className="flex flex-col md:flex-row md:items-start gap-8">
                    <div className="flex-1">
                      <span className="font-mono text-xs text-primary tracking-widest">{item.tag}</span>
                      <h3 className="font-display text-xl md:text-2xl font-bold text-foreground mt-2 mb-3 group-hover:text-gradient transition-all">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed mb-4">{item.description}</p>
                      <div className="flex flex-wrap items-center gap-2">
                        {item.tools.map((tool) => (
                          <span key={tool} className="px-3 py-1 rounded-full bg-surface-3 text-xs font-mono text-muted-foreground">
                            {tool}
                          </span>
                        ))}
                        <span className="ml-2 font-mono text-xs text-primary group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                          View details →
                        </span>
                      </div>
                    </div>

                    <div className="flex md:flex-col gap-6 md:gap-4 md:text-right">
                      {item.metrics.map((metric) => (
                        <div key={metric.label}>
                          <div className="font-display text-2xl font-bold text-gradient">{metric.value}</div>
                          <div className="font-mono text-xs text-dim">{metric.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;
