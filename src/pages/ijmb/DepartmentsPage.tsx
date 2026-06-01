import { motion } from "@/lib/motion";
import { Link } from "react-router-dom";
import { ArrowRight, Users, BookOpen } from "lucide-react";
import Navbar from "@/components/ijmb/Navbar";
import Footer from "@/components/ijmb/Footer";
import { departments } from "@/data/ijmb";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1, ease: [0.4, 0, 0.2, 1] } }),
};

export default function DepartmentsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-16 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-hero-radial" />
        <div className="absolute inset-0 pattern-geo" />
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="relative z-10 max-w-4xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold/20 bg-gold/5 text-gold text-xs font-semibold tracking-widest uppercase mb-6">
            Academic Departments
          </div>
          <h1 className="font-serif text-5xl md:text-6xl font-bold leading-tight mb-6">
            Choose Your <span className="text-gold-gradient">Academic Path</span>
          </h1>
          <p className="text-muted-foreground text-xl max-w-2xl mx-auto leading-relaxed">
            Five rigorous departments, each with advanced-level curricula crafted to position you for direct entry into top Nigerian universities.
          </p>
        </motion.div>
      </section>

      {/* Departments */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col gap-12">
          {departments.map((dept, i) => (
            <motion.div
              key={dept.id}
              id={dept.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              custom={0}
              variants={fadeUp}
              className="relative rounded-3xl border border-border bg-surface-1 overflow-hidden"
            >
              {/* Dept glow */}
              <div
                className="absolute top-0 right-0 w-[400px] h-[300px] rounded-full blur-[120px] opacity-8 pointer-events-none"
                style={{ background: dept.color }}
              />

              <div className="relative z-10 p-8 md:p-10">
                <div className="grid lg:grid-cols-3 gap-8 items-start">
                  {/* Left: dept overview */}
                  <div className="lg:col-span-2">
                    <div className="flex items-start gap-4 mb-6">
                      <div
                        className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
                        style={{ background: `${dept.color}20`, border: `1px solid ${dept.color}35` }}
                      >
                        {dept.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground">{dept.name}</h2>
                          <span
                            className="text-xs font-bold px-2.5 py-1 rounded-full"
                            style={{ background: `${dept.color}15`, color: dept.accent, border: `1px solid ${dept.color}25` }}
                          >
                            {dept.shortCode}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1.5">
                            <Users className="w-3.5 h-3.5" />
                            {dept.students.toLocaleString()} students
                          </span>
                          <span className="flex items-center gap-1.5">
                            <BookOpen className="w-3.5 h-3.5" />
                            {dept.courses.length} subjects
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-muted-foreground text-base leading-relaxed mb-6">{dept.description}</p>

                    {/* Subjects */}
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">Subjects Offered</h4>
                      <div className="flex flex-wrap gap-2">
                        {dept.courses.map((c) => (
                          <span
                            key={c}
                            className="px-3 py-1.5 rounded-lg text-sm font-medium border"
                            style={{
                              background: `${dept.color}10`,
                              borderColor: `${dept.color}25`,
                              color: dept.accent,
                            }}
                          >
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right: universities + CTA */}
                  <div>
                    <div className="p-5 rounded-2xl bg-surface-2 border border-border mb-4">
                      <h4 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">Target Universities</h4>
                      <div className="flex flex-col gap-2">
                        {dept.universities.map((u) => (
                          <div key={u} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: dept.color }} />
                            {u}
                          </div>
                        ))}
                        <div className="text-xs text-muted-foreground/60 mt-1">+ many more</div>
                      </div>
                    </div>
                    <Link
                      to="/ijmb/apply"
                      className="group flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-semibold text-sm transition-all"
                      style={{
                        background: `linear-gradient(135deg, ${dept.color}, ${dept.accent})`,
                        color: "#fff",
                        boxShadow: `0 0 30px -10px ${dept.color}60`,
                      }}
                    >
                      Apply for {dept.shortCode}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-surface-1/30 text-center">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="max-w-2xl mx-auto">
          <h2 className="font-serif text-4xl font-bold mb-4">
            Found Your <span className="text-gold-gradient">Department?</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Begin your application today. Spots for 2025/2026 are filling fast.
          </p>
          <Link
            to="/ijmb/apply"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gold-gradient text-background font-semibold shadow-[0_0_40px_-10px_hsl(43_80%_50%/0.5)] hover:scale-[1.02] transition-all"
          >
            Apply Now <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
