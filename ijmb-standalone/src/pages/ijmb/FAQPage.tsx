import { useState } from "react";
import { motion, AnimatePresence } from "@/lib/motion";
import { Link } from "react-router-dom";
import { ChevronDown, ArrowRight, Search } from "lucide-react";
import Navbar from "@/components/ijmb/Navbar";
import Footer from "@/components/ijmb/Footer";
import { faqs } from "@/data/ijmb";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1, ease: [0.4, 0, 0.2, 1] } }),
};

export default function FAQPage() {
  const [open, setOpen] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const filtered = faqs.filter((f) => f.question.toLowerCase().includes(search.toLowerCase()) || f.answer.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <section className="relative pt-32 pb-16 px-6 overflow-hidden">
        <div className="absolute inset-0 pattern-geo" />
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="relative z-10 max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold/20 bg-gold/5 text-gold text-xs font-semibold tracking-widest uppercase mb-6">FAQ</div>
          <h1 className="font-serif text-5xl md:text-6xl font-bold leading-tight mb-6">Common <span className="text-gold-gradient">Questions</span></h1>
          <p className="text-muted-foreground text-xl max-w-xl mx-auto mb-8">Everything you need to know about IJMB.program.</p>
          <div className="relative max-w-lg mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input type="text" placeholder="Search questions..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-surface-1 border border-border focus:border-gold/40 focus:outline-none text-foreground placeholder-muted-foreground text-sm transition-colors" />
          </div>
        </motion.div>
      </section>

      <section className="py-12 px-6 max-w-3xl mx-auto pb-20">
        {filtered.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
            <div className="text-4xl mb-4">🔍</div>
            <p className="text-muted-foreground">No results for "{search}".</p>
          </motion.div>
        ) : (
          <div className="flex flex-col gap-3">
            {filtered.map((faq, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i * 0.05} variants={fadeUp} className={`rounded-2xl border transition-all duration-200 overflow-hidden ${open === i ? "border-gold/35 bg-gold/4" : "border-border bg-surface-1 hover:border-gold/20"}`}>
                <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between gap-4 p-5 text-left">
                  <span className={`font-medium text-base transition-colors ${open === i ? "text-gold" : "text-foreground"}`}>{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 flex-shrink-0 transition-all duration-300 ${open === i ? "rotate-180 text-gold" : "text-muted-foreground"}`} />
                </button>
                <AnimatePresence>
                  {open === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}>
                      <div className="px-5 pb-5"><div className="h-px w-full bg-gold/15 mb-4" /><p className="text-muted-foreground text-sm leading-relaxed">{faq.answer}</p></div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        )}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mt-12 p-8 rounded-3xl border border-gold/20 bg-gold/4 text-center">
          <div className="text-3xl mb-4">💬</div>
          <h3 className="font-serif text-2xl font-bold mb-3">Still have questions?</h3>
          <p className="text-muted-foreground mb-6">Our admissions team is available Monday–Friday, 8am–5pm.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/ijmb/contact" className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gold-gradient text-background font-semibold text-sm hover:scale-[1.02] transition-all">Contact Us <ArrowRight className="w-4 h-4" /></Link>
            <a href="tel:+2348012345678" className="flex items-center gap-2 px-6 py-3 rounded-xl border border-border bg-surface-1 text-foreground font-medium text-sm hover:border-gold/30 transition-colors">📞 +234 801 234 5678</a>
          </div>
        </motion.div>
      </section>
      <Footer />
    </div>
  );
}
