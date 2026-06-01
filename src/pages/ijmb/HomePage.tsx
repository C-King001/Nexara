import { Link } from "react-router-dom";
import { motion } from "@/lib/motion";
import { ArrowRight, BookOpen, Users, Clock, Trophy, ChevronRight, Star, Play } from "lucide-react";
import Navbar from "@/components/ijmb/Navbar";
import Footer from "@/components/ijmb/Footer";
import { departments, stats, testimonials, announcements, admissionSteps } from "@/data/ijmb";
import { useState } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1, ease: [0.4, 0, 0.2, 1] } }),
};

const statIcons = [Users, BookOpen, Clock, Trophy, Users, Star];

export default function HomePage() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Background layers */}
        <div className="absolute inset-0 bg-hero-radial" />
        <div className="absolute inset-0 pattern-geo opacity-100" />
        {/* Radial gold glow top-center */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full bg-gold/5 blur-[120px] pointer-events-none" />
        {/* Ambient bottom glow */}
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[300px] rounded-full bg-dept-green/5 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[300px] rounded-full bg-dept-purple/5 blur-[100px] pointer-events-none" />

        {/* Geometric decorations */}
        <div className="absolute top-32 left-10 w-40 h-40 border border-gold/8 rounded-full animate-drift opacity-60 hidden lg:block" />
        <div className="absolute top-20 right-16 w-20 h-20 border border-gold/10 rounded-lg rotate-45 animate-drift opacity-40 hidden lg:block" style={{ animationDelay: "2s" }} />
        <div className="absolute bottom-32 left-1/4 w-12 h-12 bg-gold/6 rounded-full blur-sm hidden lg:block" />
        <div className="absolute top-1/3 right-10 w-6 h-6 bg-dept-green/20 rounded-full hidden lg:block" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold/25 bg-gold/5 mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-gold-pulse" />
            <span className="text-gold text-xs font-semibold tracking-widest uppercase">
              2025/2026 Applications Open
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight mb-6"
          >
            <span className="text-foreground">Your Gateway to</span>
            <br />
            <span className="text-gold-gradient">Nigeria's Top</span>
            <br />
            <span className="text-foreground">Universities</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10"
          >
            The IJMB Advanced Level program — 9 months to secure direct 200-level admission into any Nigerian federal university. Study online, excel in exams, achieve your university dream.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Link
              to="/ijmb/apply"
              className="group flex items-center gap-2.5 px-7 py-4 rounded-xl bg-gold-gradient text-background font-semibold text-base shadow-[0_0_40px_-10px_hsl(43_80%_50%/0.6)] hover:shadow-[0_0_60px_-10px_hsl(43_80%_50%/0.8)] hover:scale-[1.02] transition-all duration-300"
            >
              Start Your Application
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/ijmb/about"
              className="flex items-center gap-2.5 px-7 py-4 rounded-xl border border-border hover:border-gold/40 bg-surface-1/50 backdrop-blur-sm text-foreground font-medium text-base hover:bg-surface-1 transition-all duration-300"
            >
              <Play className="w-4 h-4 text-gold" />
              Explore the Program
            </Link>
          </motion.div>

          {/* Floating stat chips */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            {[
              { label: "Students Enrolled", value: "5,200+" },
              { label: "University Placement", value: "95%" },
              { label: "Program Duration", value: "9 Months" },
              { label: "Partner Universities", value: "30+" },
            ].map((s) => (
              <div
                key={s.label}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-surface-1/80 backdrop-blur-sm border border-border/60 text-sm"
              >
                <span className="text-gold font-semibold font-serif">{s.value}</span>
                <span className="text-muted-foreground">{s.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        >
          <span className="text-muted-foreground text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-gold/40 to-transparent" />
        </motion.div>
      </section>

      {/* ── STATS MARQUEE ── */}
      <section className="py-6 border-y border-border/60 bg-surface-1/50 overflow-hidden relative">
        <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />
        <div className="marquee-track flex items-center gap-12 px-6">
          {[...stats, ...stats].map((s, i) => (
            <div key={i} className="flex items-center gap-3 flex-shrink-0">
              <span className="text-2xl">{s.icon}</span>
              <div className="flex items-baseline gap-2">
                <span className="font-serif font-bold text-gold text-xl">{s.value}</span>
                <span className="text-muted-foreground text-sm whitespace-nowrap">{s.label}</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-border mx-4" />
            </div>
          ))}
        </div>
      </section>

      {/* ── ABOUT IJMB ── */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold/20 bg-gold/5 text-gold text-xs font-semibold tracking-widest uppercase mb-6">
              About IJMB
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold leading-tight mb-6">
              What is the{" "}
              <span className="text-gold-gradient">IJMB Program?</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              The Interim Joint Matriculation Board (IJMB) is an advanced level pre-degree program accredited by Nigerian universities. Established to provide a rigorous academic alternative to UTME, IJMB gives secondary school graduates a direct path to 200-level admission.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Over 9 intensive months, students study three principal subjects at advanced level — equivalent to A-Level standards — and upon completion, apply for university direct entry through JAMB, bypassing 100-level entirely.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                { label: "Direct Entry to 200-Level", icon: "🎓" },
                { label: "Nationally Recognised", icon: "🏛️" },
                { label: "Online & In-Person", icon: "💻" },
                { label: "Structured 9-Month Program", icon: "📅" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2.5 p-3 rounded-lg bg-surface-1 border border-border">
                  <span>{item.icon}</span>
                  <span className="text-sm font-medium text-foreground/90">{item.label}</span>
                </div>
              ))}
            </div>
            <Link
              to="/ijmb/about"
              className="inline-flex items-center gap-2 text-gold font-medium hover:gap-3 transition-all"
            >
              Learn more about IJMB <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {/* Visual side */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={{ ...fadeUp, visible: { ...fadeUp.visible(0), transition: { delay: 0.2 } } }}
            className="relative"
          >
            <div className="relative z-10 grid grid-cols-2 gap-4">
              {[
                { value: "5,200+", label: "Active Students", color: "#1A6338" },
                { value: "30+", label: "Partner Universities", color: "#C4501A" },
                { value: "95%", label: "Placement Rate", color: "#4A1D96" },
                { value: "12+", label: "Years Running", color: "#102060" },
              ].map((card, i) => (
                <motion.div
                  key={card.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i, duration: 0.5 }}
                  className="p-6 rounded-2xl border border-border bg-surface-1 hover:border-gold/20 transition-colors"
                  style={{ boxShadow: `0 20px 60px -20px ${card.color}25` }}
                >
                  <div className="w-3 h-3 rounded-full mb-4" style={{ backgroundColor: card.color }} />
                  <div className="font-serif text-4xl font-bold text-foreground mb-1">{card.value}</div>
                  <div className="text-muted-foreground text-sm">{card.label}</div>
                </motion.div>
              ))}
            </div>
            {/* Background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full rounded-full bg-gold/4 blur-[80px] pointer-events-none" />
          </motion.div>
        </div>
      </section>

      {/* ── DEPARTMENTS ── */}
      <section className="py-24 px-6 bg-surface-1/30 relative overflow-hidden">
        <div className="absolute inset-0 pattern-geo opacity-50" />
        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold/20 bg-gold/5 text-gold text-xs font-semibold tracking-widest uppercase mb-4">
              Academic Departments
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
              Choose Your <span className="text-gold-gradient">Department</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Five specialised departments, each with carefully curated courses aligned to Nigerian university direct entry requirements.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {departments.map((dept, i) => (
              <motion.div
                key={dept.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                custom={i * 0.08}
                variants={fadeUp}
              >
                <Link
                  to={`/ijmb/departments#${dept.id}`}
                  className="group block p-6 rounded-2xl border border-border bg-surface-1 hover:border-opacity-50 card-hover relative overflow-hidden"
                  style={{ "--dept-color": dept.color } as React.CSSProperties}
                >
                  {/* Dept color glow */}
                  <div
                    className="absolute top-0 right-0 w-32 h-32 rounded-full blur-[60px] opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none"
                    style={{ background: dept.color }}
                  />
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                        style={{ background: `${dept.color}20`, border: `1px solid ${dept.color}30` }}
                      >
                        {dept.icon}
                      </div>
                      <span
                        className="text-xs font-bold px-2.5 py-1 rounded-full"
                        style={{ background: `${dept.color}15`, color: dept.accent, border: `1px solid ${dept.color}25` }}
                      >
                        {dept.shortCode}
                      </span>
                    </div>
                    <h3 className="font-serif text-xl font-bold text-foreground mb-2 group-hover:text-gold transition-colors">
                      {dept.name}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                      {dept.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {dept.courses.slice(0, 3).map((c) => (
                        <span
                          key={c}
                          className="text-xs px-2 py-0.5 rounded-full bg-surface-2 border border-border text-muted-foreground"
                        >
                          {c}
                        </span>
                      ))}
                      {dept.courses.length > 3 && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-surface-2 border border-border text-muted-foreground">
                          +{dept.courses.length - 3} more
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{dept.students.toLocaleString()} students</span>
                      <span className="text-gold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                        Explore <ChevronRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}

            {/* CTA Card */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              custom={departments.length * 0.08}
              variants={fadeUp}
            >
              <Link
                to="/ijmb/apply"
                className="group flex flex-col items-center justify-center p-6 rounded-2xl border border-gold/20 bg-gold/4 hover:bg-gold/8 card-hover text-center h-full min-h-[220px] transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-gold/15 flex items-center justify-center mb-4 group-hover:bg-gold/25 transition-colors">
                  <ArrowRight className="w-5 h-5 text-gold" />
                </div>
                <h3 className="font-serif text-lg font-bold text-gold mb-2">Ready to Apply?</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Start your application for the 2025/2026 session today.
                </p>
                <span className="text-gold font-medium text-sm group-hover:underline">
                  Apply Now →
                </span>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold/20 bg-gold/5 text-gold text-xs font-semibold tracking-widest uppercase mb-4">
            Admission Process
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
            How to Get <span className="text-gold-gradient">Started</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Five simple steps from discovery to enrollment. The entire process takes less than a week.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-10 left-1/2 -translate-x-1/2 w-[calc(100%-12rem)] h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {admissionSteps.map((step, i) => (
              <motion.div
                key={step.step}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                custom={i * 0.1}
                variants={fadeUp}
                className="flex flex-col items-center text-center"
              >
                <div className="relative mb-4">
                  <div className="w-20 h-20 rounded-2xl bg-surface-1 border border-border flex items-center justify-center text-3xl mb-2 hover:border-gold/30 transition-colors">
                    {step.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gold/15 border border-gold/30 flex items-center justify-center">
                    <span className="text-gold text-[10px] font-bold">{step.step}</span>
                  </div>
                </div>
                <h4 className="font-semibold text-foreground text-base mb-2">{step.title}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center mt-12"
        >
          <Link
            to="/ijmb/apply"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gold-gradient text-background font-semibold shadow-[0_0_40px_-10px_hsl(43_80%_50%/0.5)] hover:shadow-[0_0_60px_-10px_hsl(43_80%_50%/0.7)] hover:scale-[1.02] transition-all"
          >
            Begin Your Application <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-24 px-6 bg-surface-1/30 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-gold/3 blur-[120px] pointer-events-none" />
        <div className="relative z-10 max-w-5xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold/20 bg-gold/5 text-gold text-xs font-semibold tracking-widest uppercase mb-4">
              Student Stories
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
              Alumni Who <span className="text-gold-gradient">Made It</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Thousands of Nigerian students have used IJMB.program to secure university admission. Here are their stories.
            </p>
          </motion.div>

          {/* Featured testimonial */}
          <motion.div
            key={activeTestimonial}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="relative p-8 md:p-12 rounded-3xl border border-border bg-surface-1 mb-8"
          >
            {/* Quote decoration */}
            <div className="absolute top-6 right-8 font-serif text-8xl text-gold/10 leading-none select-none">"</div>
            <div className="relative z-10">
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white text-lg"
                  style={{ background: testimonials[activeTestimonial].avatarColor }}
                >
                  {testimonials[activeTestimonial].avatar}
                </div>
                <div>
                  <div className="font-semibold text-foreground">{testimonials[activeTestimonial].name}</div>
                  <div className="text-muted-foreground text-sm">{testimonials[activeTestimonial].role}</div>
                </div>
                <span
                  className="ml-auto text-xs font-medium px-3 py-1 rounded-full"
                  style={{
                    background: `${testimonials[activeTestimonial].avatarColor}15`,
                    color: testimonials[activeTestimonial].avatarColor,
                    border: `1px solid ${testimonials[activeTestimonial].avatarColor}25`,
                  }}
                >
                  {testimonials[activeTestimonial].dept}
                </span>
              </div>
              <p className="font-serif text-xl md:text-2xl text-foreground/90 leading-relaxed italic">
                "{testimonials[activeTestimonial].quote}"
              </p>
            </div>
          </motion.div>

          {/* Thumbnails */}
          <div className="flex items-center justify-center gap-3 flex-wrap">
            {testimonials.map((t, i) => (
              <button
                key={i}
                onClick={() => setActiveTestimonial(i)}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl border transition-all text-sm ${
                  i === activeTestimonial
                    ? "border-gold/50 bg-gold/8 text-foreground"
                    : "border-border bg-surface-1 text-muted-foreground hover:border-border-gold/20 hover:text-foreground"
                }`}
              >
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0"
                  style={{ background: t.avatarColor }}
                >
                  {t.avatar}
                </div>
                <span className="hidden sm:inline">{t.name.split(" ")[0]}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── ANNOUNCEMENTS ── */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold/20 bg-gold/5 text-gold text-xs font-semibold tracking-widest uppercase mb-4">
              Latest Updates
            </div>
            <h2 className="font-serif text-4xl font-bold">
              News & <span className="text-gold-gradient">Announcements</span>
            </h2>
          </motion.div>
          <Link to="/ijmb/about" className="hidden md:flex items-center gap-1 text-gold text-sm font-medium hover:gap-2 transition-all">
            View all <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {announcements.map((a, i) => (
            <motion.div
              key={a.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              custom={i * 0.08}
              variants={fadeUp}
              className="p-6 rounded-2xl border border-border bg-surface-1 card-hover"
            >
              {a.urgent && (
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gold/10 border border-gold/25 text-gold text-[11px] font-semibold mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold animate-gold-pulse" />
                  Important
                </div>
              )}
              <div className="text-xs text-muted-foreground mb-2">{a.date}</div>
              <h4 className="font-semibold text-foreground text-base mb-2 leading-snug">{a.title}</h4>
              <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">{a.excerpt}</p>
              <div className="mt-4 pt-4 border-t border-border">
                <span className="text-xs font-medium text-gold/70 uppercase tracking-wider">{a.category}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-surface-1/50" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-gold/5 blur-[100px] pointer-events-none" />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          className="relative z-10 max-w-3xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold/20 bg-gold/5 text-gold text-xs font-semibold tracking-widest uppercase mb-6">
            2025/2026 Session
          </div>
          <h2 className="font-serif text-5xl md:text-6xl font-bold leading-tight mb-6">
            Your University Journey <br />
            <span className="text-gold-gradient">Begins Today</span>
          </h2>
          <p className="text-muted-foreground text-xl mb-10 leading-relaxed">
            Join over 5,000 Nigerian students who chose the smarter path to university admission. Apply now for the 2025/2026 IJMB session.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/ijmb/apply"
              className="group flex items-center gap-2.5 px-8 py-5 rounded-xl bg-gold-gradient text-background font-bold text-lg shadow-[0_0_50px_-10px_hsl(43_80%_50%/0.6)] hover:shadow-[0_0_80px_-10px_hsl(43_80%_50%/0.8)] hover:scale-[1.02] transition-all duration-300"
            >
              Apply for 2025/2026
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/ijmb/contact"
              className="flex items-center gap-2 px-8 py-5 rounded-xl border border-border hover:border-gold/30 text-foreground font-medium text-lg hover:bg-surface-1 transition-all"
            >
              Talk to an Advisor
            </Link>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
