import { useState } from "react";
import { motion } from "@/lib/motion";
import {
  BookOpen, FileText, ClipboardList, BarChart3, CreditCard,
  Download, CheckCircle2, Clock, AlertCircle, TrendingUp, Calendar,
  Play, ExternalLink,
} from "lucide-react";
import DashboardLayout from "@/components/ijmb/DashboardLayout";
import { mockStudentData } from "@/data/ijmb";
import { useAuth } from "@/lib/ijmb-auth";

const tabs = [
  { id: "overview", label: "Overview", icon: BarChart3 },
  { id: "courses", label: "Courses", icon: BookOpen },
  { id: "materials", label: "Materials", icon: FileText },
  { id: "assignments", label: "Assignments", icon: ClipboardList },
  { id: "results", label: "Results", icon: TrendingUp },
  { id: "payments", label: "Payments", icon: CreditCard },
];

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.45, delay: i * 0.07 } }),
};

function StatCard({ label, value, sub, color, icon: Icon }: {
  label: string; value: string | number; sub?: string; color: string; icon: React.ElementType;
}) {
  return (
    <div className="p-5 rounded-2xl border border-border bg-surface-1 hover:border-gold/20 transition-colors">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-muted-foreground uppercase tracking-wider">{label}</span>
        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${color}18` }}>
          <Icon className="w-4 h-4" style={{ color }} />
        </div>
      </div>
      <div className="font-serif text-2xl font-bold text-foreground">{value}</div>
      {sub && <div className="text-xs text-muted-foreground mt-1">{sub}</div>}
    </div>
  );
}

function GradeBar({ score, max = 100 }: { score: number; max?: number }) {
  const pct = (score / max) * 100;
  const color = pct >= 70 ? "#1A6338" : pct >= 50 ? "#D4A017" : "#C4501A";
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-1.5 rounded-full bg-surface-3 overflow-hidden">
        <div className="h-full rounded-full transition-all duration-700" style={{ width: `${pct}%`, background: color }} />
      </div>
      <span className="text-sm font-medium tabular-nums" style={{ color }}>{score}%</span>
    </div>
  );
}

export default function StudentDashboardPage() {
  const [tab, setTab] = useState("overview");
  const { user } = useAuth();
  const s = mockStudentData;

  const paidAmount = s.payments.filter((p) => p.status === "Paid").reduce((a, p) => a + p.amount, 0);
  const pendingAmount = s.payments.filter((p) => p.status === "Pending").reduce((a, p) => a + p.amount, 0);
  const avgCA = Math.round(s.courses.reduce((a, c) => a + c.ca, 0) / s.courses.length);

  return (
    <DashboardLayout title="Student Portal">
      {/* Profile banner */}
      <motion.div
        initial="hidden" animate="visible" variants={fadeUp}
        className="relative rounded-2xl border border-border bg-surface-1 p-5 mb-6 overflow-hidden"
      >
        <div className="absolute inset-0 pattern-geo opacity-60" />
        <div className="absolute top-0 right-0 w-64 h-32 rounded-full blur-[80px] opacity-10 bg-dept-green pointer-events-none" />
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center font-bold text-white text-lg flex-shrink-0"
            style={{ background: s.departmentColor }}
          >
            {s.photo}
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-serif text-xl font-bold text-foreground">{user?.name ?? s.name}</div>
            <div className="text-muted-foreground text-sm">{s.id}</div>
          </div>
          <div className="flex flex-wrap gap-3 text-sm">
            <span className="px-3 py-1.5 rounded-full bg-surface-2 border border-border text-foreground/80">{s.department}</span>
            <span className="px-3 py-1.5 rounded-full text-white font-medium" style={{ background: s.departmentColor }}>
              Active
            </span>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="flex items-center gap-1 mb-6 overflow-x-auto scrollbar-hide pb-1">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
              tab === id
                ? "bg-gold/10 text-gold border border-gold/30"
                : "text-muted-foreground hover:text-foreground hover:bg-surface-1"
            }`}
          >
            <Icon className="w-3.5 h-3.5" />
            {label}
          </button>
        ))}
      </div>

      {/* ── OVERVIEW ── */}
      {tab === "overview" && (
        <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.07 } } }}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <motion.div variants={fadeUp}><StatCard label="Enrolled Courses" value={s.courses.length} icon={BookOpen} color="#1A6338" /></motion.div>
            <motion.div variants={fadeUp}><StatCard label="Avg. CA Score" value={`${avgCA}%`} sub="Continuous Assessment" icon={TrendingUp} color="#D4A017" /></motion.div>
            <motion.div variants={fadeUp}><StatCard label="Pending Tasks" value={s.assignments.filter(a => a.status === "Pending").length} sub="Assignments due" icon={ClipboardList} color="#C4501A" /></motion.div>
            <motion.div variants={fadeUp}><StatCard label="Fees Paid" value={`₦${(paidAmount / 1000).toFixed(0)}k`} sub={`₦${(pendingAmount / 1000).toFixed(0)}k outstanding`} icon={CreditCard} color="#4A1D96" /></motion.div>
          </div>

          <div className="grid lg:grid-cols-3 gap-5">
            {/* Schedule */}
            <motion.div variants={fadeUp} className="lg:col-span-2 p-5 rounded-2xl border border-border bg-surface-1">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground flex items-center gap-2"><Calendar className="w-4 h-4 text-gold" /> Today's Schedule</h3>
                <span className="text-xs text-muted-foreground">Monday</span>
              </div>
              <div className="flex flex-col gap-2">
                {s.schedule.filter((_, i) => i < 3).map((cls, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-surface-2 border border-border">
                    <div className="text-xs text-muted-foreground w-20 flex-shrink-0">{cls.time}</div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm text-foreground">{cls.course}</div>
                      <div className="text-xs text-muted-foreground">{cls.room}</div>
                    </div>
                    <div className="w-2 h-2 rounded-full bg-gold/60" />
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Announcements */}
            <motion.div variants={fadeUp} className="p-5 rounded-2xl border border-border bg-surface-1">
              <h3 className="font-semibold text-foreground flex items-center gap-2 mb-4">
                <AlertCircle className="w-4 h-4 text-gold" /> Announcements
              </h3>
              <div className="flex flex-col gap-3">
                {[
                  { title: "First Term Exams: June 10–20", urgent: true },
                  { title: "Biology notes updated", urgent: false },
                  { title: "Fee deadline: June 5", urgent: true },
                ].map((a, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${a.urgent ? "bg-gold animate-gold-pulse" : "bg-muted-foreground/40"}`} />
                    <span className={`text-sm ${a.urgent ? "text-foreground" : "text-muted-foreground"}`}>{a.title}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* ── COURSES ── */}
      {tab === "courses" && (
        <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.07 } } }} className="flex flex-col gap-4">
          {s.courses.map((course, i) => (
            <motion.div key={course.code} custom={i} variants={fadeUp} className="p-5 rounded-2xl border border-border bg-surface-1 hover:border-gold/20 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">{course.name}</div>
                    <div className="text-xs text-muted-foreground">{course.lecturer} · {course.code}</div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">CA Score</div>
                    <GradeBar score={course.ca} />
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground mb-1">Exam</div>
                    <span className="text-sm text-muted-foreground">{course.exam ?? "Pending"}</span>
                  </div>
                  <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-border hover:border-gold/30 text-xs font-medium text-foreground transition-colors">
                    <Play className="w-3 h-3" /> Enter
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* ── MATERIALS ── */}
      {tab === "materials" && (
        <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.07 } } }}>
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-serif text-xl font-bold">Study Materials</h2>
            <div className="text-sm text-muted-foreground">{s.materials.length} files available</div>
          </div>
          <div className="flex flex-col gap-3">
            {s.materials.map((m, i) => (
              <motion.div key={i} custom={i} variants={fadeUp} className="flex items-center gap-4 p-4 rounded-2xl border border-border bg-surface-1 hover:border-gold/20 transition-colors group">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${m.type === "Video" ? "bg-purple-500/10" : "bg-gold/10"}`}>
                  {m.type === "Video" ? <Play className="w-4 h-4 text-purple-400" /> : <FileText className="w-4 h-4 text-gold" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm text-foreground truncate">{m.title}</div>
                  <div className="text-xs text-muted-foreground">{m.course} · {m.size} · {m.uploaded}</div>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${m.type === "Video" ? "bg-purple-500/10 text-purple-400" : "bg-gold/10 text-gold"}`}>
                  {m.type}
                </span>
                <button className="w-8 h-8 rounded-lg border border-border flex items-center justify-center opacity-0 group-hover:opacity-100 hover:border-gold/30 transition-all">
                  <Download className="w-3.5 h-3.5 text-muted-foreground" />
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* ── ASSIGNMENTS ── */}
      {tab === "assignments" && (
        <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.07 } } }}>
          <h2 className="font-serif text-xl font-bold mb-5">Assignments</h2>
          <div className="flex flex-col gap-3">
            {s.assignments.map((a, i) => {
              const statusConfig = {
                Pending: { color: "#C4501A", bg: "#C4501A18", icon: Clock },
                Submitted: { color: "#D4A017", bg: "#D4A01718", icon: CheckCircle2 },
                Graded: { color: "#1A6338", bg: "#1A633818", icon: CheckCircle2 },
              }[a.status] ?? { color: "#666", bg: "#66666618", icon: Clock };
              const StatusIcon = statusConfig.icon;
              return (
                <motion.div key={i} custom={i} variants={fadeUp} className="flex items-center gap-4 p-4 rounded-2xl border border-border bg-surface-1 hover:border-gold/20 transition-colors">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: statusConfig.bg }}>
                    <StatusIcon className="w-5 h-5" style={{ color: statusConfig.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm text-foreground">{a.title}</div>
                    <div className="text-xs text-muted-foreground">{a.course} · Due {a.dueDate}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    {a.marks !== null && (
                      <span className="text-sm font-semibold" style={{ color: statusConfig.color }}>{a.marks}%</span>
                    )}
                    <span className="text-xs font-medium px-2.5 py-1 rounded-full" style={{ background: statusConfig.bg, color: statusConfig.color }}>
                      {a.status}
                    </span>
                    {a.status === "Pending" && (
                      <button className="px-3 py-1.5 rounded-lg bg-gold-gradient text-background text-xs font-semibold hover:opacity-90 transition-opacity">
                        Submit
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* ── RESULTS ── */}
      {tab === "results" && (
        <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.07 } } }}>
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-serif text-xl font-bold">Academic Results</h2>
            <div className="text-sm text-muted-foreground">First Term 2025</div>
          </div>

          <motion.div variants={fadeUp} className="p-5 rounded-2xl border border-gold/20 bg-gold/4 mb-5">
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="font-serif text-4xl font-bold text-gold">{avgCA}%</div>
                <div className="text-xs text-muted-foreground">Overall CA</div>
              </div>
              <div className="flex-1 h-px bg-border mx-2" />
              <div className="text-sm text-muted-foreground max-w-xs">
                Final examination results will be published after the exam period ends in June 2025. CA scores shown below.
              </div>
            </div>
          </motion.div>

          <div className="flex flex-col gap-3">
            {s.courses.map((c, i) => (
              <motion.div key={c.code} custom={i} variants={fadeUp} className="p-5 rounded-2xl border border-border bg-surface-1">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="font-medium text-foreground">{c.name}</div>
                    <div className="text-xs text-muted-foreground">{c.lecturer}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground mb-1">Exam</div>
                    <span className="text-sm text-muted-foreground italic">{c.exam ?? "Pending"}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xs text-muted-foreground w-28">Continuous Assessment</span>
                  <GradeBar score={c.ca} />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* ── PAYMENTS ── */}
      {tab === "payments" && (
        <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.07 } } }}>
          <div className="grid sm:grid-cols-3 gap-4 mb-6">
            <motion.div variants={fadeUp} className="p-5 rounded-2xl border border-border bg-surface-1">
              <div className="text-xs text-muted-foreground mb-1">Total Fees</div>
              <div className="font-serif text-2xl font-bold text-foreground">₦230,000</div>
            </motion.div>
            <motion.div variants={fadeUp} className="p-5 rounded-2xl border border-green-500/20 bg-green-500/5">
              <div className="text-xs text-muted-foreground mb-1">Amount Paid</div>
              <div className="font-serif text-2xl font-bold text-green-400">₦{(paidAmount / 1000).toFixed(0)},000</div>
            </motion.div>
            <motion.div variants={fadeUp} className="p-5 rounded-2xl border border-gold/20 bg-gold/5">
              <div className="text-xs text-muted-foreground mb-1">Outstanding</div>
              <div className="font-serif text-2xl font-bold text-gold">₦{(pendingAmount / 1000).toFixed(0)},000</div>
            </motion.div>
          </div>

          <div className="flex flex-col gap-3">
            {s.payments.map((p, i) => (
              <motion.div key={i} custom={i} variants={fadeUp} className="flex items-center gap-4 p-4 rounded-2xl border border-border bg-surface-1">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${p.status === "Paid" ? "bg-green-500/10" : "bg-gold/10"}`}>
                  <CreditCard className={`w-5 h-5 ${p.status === "Paid" ? "text-green-400" : "text-gold"}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm text-foreground">{p.description}</div>
                  <div className="text-xs text-muted-foreground">{p.date}</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-foreground">₦{p.amount.toLocaleString()}</div>
                  <span className={`text-xs font-medium ${p.status === "Paid" ? "text-green-400" : "text-gold"}`}>
                    {p.status}
                  </span>
                </div>
                {p.status === "Paid" ? (
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-xs text-muted-foreground hover:border-gold/30 transition-colors">
                    <Download className="w-3 h-3" /> Receipt
                  </button>
                ) : (
                  <button className="px-3 py-1.5 rounded-lg bg-gold-gradient text-background text-xs font-semibold hover:opacity-90 transition-opacity">
                    Pay Now
                  </button>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </DashboardLayout>
  );
}
