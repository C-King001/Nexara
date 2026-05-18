import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { caseStudies } from "@/data/caseStudies";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const CaseStudyPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const study = caseStudies.find((c) => c.slug === slug);

  if (!study) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-2xl font-bold text-foreground mb-4">Case study not found</h1>
          <Link to="/" className="text-primary font-mono text-sm hover:underline">← Back to home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-28 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Back link */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
            <Link to="/#cases" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-mono text-xs tracking-wider uppercase mb-10 block">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 17l-4-4m0 0l4-4m-4 4h18" />
              </svg>
              Back to all cases
            </Link>
          </motion.div>

          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
            <span className="font-mono text-xs text-primary tracking-widest">{study.tag}</span>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground mt-3 mb-4 leading-tight">
              {study.title}
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl">{study.description}</p>
          </motion.div>

          {/* Metrics bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-3 gap-4 mt-10 mb-16"
          >
            {study.metrics.map((m) => (
              <div key={m.label} className="module-border bg-surface-1 p-5 text-center">
                <div className="font-display text-2xl md:text-3xl font-bold text-gradient">{m.value}</div>
                <div className="font-mono text-xs text-dim mt-1">{m.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Tools & Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="flex flex-wrap items-center gap-4 mb-16"
          >
            <div className="flex flex-wrap gap-2">
              {study.tools.map((tool) => (
                <span key={tool} className="px-3 py-1.5 rounded-full bg-surface-3 text-xs font-mono text-muted-foreground border border-border">
                  {tool}
                </span>
              ))}
            </div>
            <span className="text-border">|</span>
            <span className="font-mono text-xs text-dim">{study.timeline}</span>
          </motion.div>

          {/* Challenge */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-14"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-destructive" />
              <h2 className="font-mono text-xs text-destructive tracking-widest uppercase">The Challenge</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">{study.challenge}</p>
          </motion.section>

          {/* Approach */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mb-14"
          >
            <div className="flex items-center gap-2 mb-6">
              <span className="w-2 h-2 rounded-full bg-primary" />
              <h2 className="font-mono text-xs text-primary tracking-widest uppercase">The Approach</h2>
            </div>
            <div className="space-y-4">
              {study.approach.map((step, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <span className="font-mono text-sm text-primary/50 mt-0.5 w-6 shrink-0">{String(i + 1).padStart(2, "0")}</span>
                  <p className="text-muted-foreground text-sm leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Workflow Screenshots */}
          {study.images && study.images.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.38 }}
              className="mb-14"
            >
              <div className="flex items-center gap-2 mb-6">
                <span className="w-2 h-2 rounded-full bg-primary/40" />
                <h2 className="font-mono text-xs text-muted-foreground tracking-widest uppercase">Workflow Screenshots</h2>
              </div>
              <div className={`grid gap-4 ${study.images.length === 1 ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"}`}>
                {study.images.map((img, i) => (
                  <div key={i} className="module-border overflow-hidden bg-surface-1">
                    <div className="overflow-hidden">
                      <img
                        src={img.src}
                        alt={img.caption}
                        className="w-full object-cover object-top hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <p className="font-mono text-xs text-dim px-4 py-3 border-t border-border leading-relaxed">
                      {img.caption}
                    </p>
                  </div>
                ))}
              </div>
            </motion.section>
          )}

          {/* Results */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-14"
          >
            <div className="flex items-center gap-2 mb-6">
              <span className="w-2 h-2 rounded-full bg-accent" />
              <h2 className="font-mono text-xs text-accent tracking-widest uppercase">The Results</h2>
            </div>
            <div className="module-border bg-surface-1 p-6 md:p-8 space-y-4">
              {study.results.map((result, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-primary font-mono text-sm mt-0.5">→</span>
                  <p className="text-muted-foreground text-sm leading-relaxed">{result}</p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Testimonial */}
          {study.testimonial && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="mb-14"
            >
              <div className="p-8 md:p-10 rounded-lg bg-primary/5 border border-primary/20">
                <p className="text-foreground leading-relaxed italic text-lg mb-6">
                  "{study.testimonial.quote}"
                </p>
                <div>
                  <p className="font-display font-semibold text-foreground text-sm">{study.testimonial.name}</p>
                  <p className="font-mono text-xs text-dim">{study.testimonial.role}</p>
                </div>
              </div>
            </motion.section>
          )}

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center pt-8 border-t border-border"
          >
            <p className="font-display text-xl font-bold text-foreground mb-2">Want results like these?</p>
            <p className="text-muted-foreground text-sm mb-6">Let's find the biggest revenue leak in your system.</p>
            <a
              href="https://calendly.com/faithfulnyama/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-display font-semibold rounded-md hover:shadow-glow transition-shadow"
            >
              Book a Free System Audit
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CaseStudyPage;
