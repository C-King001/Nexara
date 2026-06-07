import { motion } from "@/lib/motion";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, BookOpen, Award, Globe } from "lucide-react";
import Navbar from "@/components/ijmb/Navbar";
import Footer from "@/components/ijmb/Footer";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1, ease: [0.4, 0, 0.2, 1] } }),
};

const partnerUniversities = [
  "University of Lagos", "Ahmadu Bello University", "University of Ibadan",
  "Obafemi Awolowo University", "University of Nigeria Nsukka",
  "University of Benin", "Bayero University Kano",
  "Federal University of Technology Akure", "Covenant University",
  "University of Ilorin", "LASU", "UNIABUJA",
];

const milestones = [
  { year: "2012", event: "IJMB.program founded with two departments and 150 students" },
  { year: "2015", event: "Expanded to all five departments; crossed 1,000 enrolled students" },
  { year: "2018", event: "Launched digital portal for online study materials and results" },
  { year: "2021", event: "Full LMS platform launched with live classes and CBT assessments" },
  { year: "2023", event: "Crossed 5,000 active students. 30+ partner universities." },
  { year: "2025", event: "Next-generation IJMB.program platform launched — the one you're on now" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 pattern-geo" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-gold/5 blur-[100px] pointer-events-none" />
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold/20 bg-gold/5 text-gold text-xs font-semibold tracking-widest uppercase mb-6">About the Program</div>
          <h1 className="font-serif text-5xl md:text-7xl font-bold leading-tight mb-6">Building Nigeria's <br /><span className="text-gold-gradient">Academic Future</span></h1>
          <p className="text-muted-foreground text-xl max-w-2xl mx-auto leading-relaxed">IJMB.program has been Nigeria's premier advanced level institution for over a decade, transforming secondary school graduates into university-ready scholars.</p>
        </motion.div>
      </section>

      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h2 className="font-serif text-4xl font-bold mb-6">Our <span className="text-gold-gradient">Mission</span></h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">We exist to democratise access to quality university education for every Nigerian student, regardless of their background.</p>
            <p className="text-muted-foreground leading-relaxed mb-8">By combining world-class academic content with modern technology — live classes, AI study tools, and comprehensive digital resources — we prepare students not just for IJMB examinations, but for university success and beyond.</p>
            <div className="flex flex-col gap-3">
              {["Accessible education for every Nigerian student","Digital-first learning environment","Rigorous academic standards matched to university demands","Mentorship from experienced educators and alumni"].map((point) => (
                <div key={point} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground/85">{point}</span>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="grid grid-cols-2 gap-4">
            {[
              { icon: BookOpen, label: "Academic Excellence", desc: "Advanced level curriculum aligned to university standards" },
              { icon: Globe, label: "Digital Campus", desc: "Full online learning platform accessible 24/7" },
              { icon: Award, label: "Proven Results", desc: "95% of students secure university direct entry" },
              { icon: UsersIcon, label: "Community", desc: "5,000+ students across 5 departments" },
            ].map(({ icon: Icon, label, desc }) => (
              <div key={label} className="p-5 rounded-2xl border border-border bg-surface-1 hover:border-gold/25 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center mb-3"><Icon className="w-5 h-5 text-gold" /></div>
                <h4 className="font-semibold text-foreground text-sm mb-1.5">{label}</h4>
                <p className="text-muted-foreground text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-6 bg-surface-1/30 relative overflow-hidden">
        <div className="absolute inset-0 pattern-geo opacity-40" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-16">
            <h2 className="font-serif text-4xl font-bold mb-4">Our <span className="text-gold-gradient">Journey</span></h2>
            <p className="text-muted-foreground text-lg">Over a decade of academic excellence and student transformation.</p>
          </motion.div>
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-gold/40 via-gold/20 to-transparent md:left-1/2" />
            <div className="flex flex-col gap-8">
              {milestones.map((m, i) => (
                <motion.div key={m.year} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i * 0.1} variants={fadeUp} className={`flex gap-6 items-start md:items-center ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} pl-14 md:pl-0`}>
                  <div className={`flex-1 ${i % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                    <div className="p-5 rounded-2xl border border-border bg-surface-1 inline-block text-left">
                      <div className="text-gold font-serif font-bold text-xl mb-1">{m.year}</div>
                      <p className="text-foreground/85 text-sm leading-relaxed">{m.event}</p>
                    </div>
                  </div>
                  <div className="absolute left-6 md:static w-3 h-3 rounded-full bg-gold/60 border-2 border-gold/30 flex-shrink-0 md:mx-0" />
                  <div className="hidden md:block flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 max-w-7xl mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
          <h2 className="font-serif text-4xl font-bold mb-4">Partner <span className="text-gold-gradient">Universities</span></h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">Our graduates have secured admission into these and many more Nigerian universities.</p>
        </motion.div>
        <div className="flex flex-wrap justify-center gap-3">
          {partnerUniversities.map((uni, i) => (
            <motion.div key={uni} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }} className="px-4 py-2.5 rounded-full border border-border bg-surface-1 text-sm text-muted-foreground hover:border-gold/30 hover:text-foreground transition-all">{uni}</motion.div>
          ))}
          <div className="px-4 py-2.5 rounded-full border border-gold/20 bg-gold/5 text-gold text-sm font-medium">+ 18 more universities</div>
        </div>
      </section>

      <section className="py-20 px-6 bg-surface-1/30 text-center">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="max-w-2xl mx-auto">
          <h2 className="font-serif text-4xl font-bold mb-4">Be Part of the <span className="text-gold-gradient">Story</span></h2>
          <p className="text-muted-foreground text-lg mb-8">Applications for the 2025/2026 session are open. Begin your journey today.</p>
          <Link to="/ijmb/apply" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gold-gradient text-background font-semibold shadow-[0_0_40px_-10px_hsl(43_80%_50%/0.5)] hover:scale-[1.02] transition-all">
            Apply Now <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}

function UsersIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
