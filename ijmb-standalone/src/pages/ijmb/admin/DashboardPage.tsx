import { useState } from "react";
import { motion } from "@/lib/motion";
import {
  Users, GraduationCap, CheckSquare, Building2, BarChart3,
  CreditCard, Megaphone, TrendingUp, AlertCircle, Plus,
  Check, X, Search, Download, Upload,
} from "lucide-react";
import DashboardLayout from "@/components/ijmb/DashboardLayout";
import { mockAdminStats, departments } from "@/data/ijmb";

const tabs = [
  { id: "overview", label: "Overview", icon: BarChart3 },
  { id: "applications", label: "Applications", icon: CheckSquare },
  { id: "students", label: "Students", icon: GraduationCap },
  { id: "teachers", label: "Teachers", icon: Users },
  { id: "departments", label: "Departments", icon: Building2 },
  { id: "results", label: "Results", icon: TrendingUp },
  { id: "payments", label: "Payments", icon: CreditCard },
  { id: "announcements", label: "Announcements", icon: Megaphone },
];

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.45, delay: i * 0.07 } }),
};

const mockStudents = [
  { name: "Aisha Mohammed", id: "IJMB/2025/SCI/001", dept: "Sciences", status: "Active", fees: "Paid", enrolled: "Jan 2025" },
  { name: "Chukwuemeka Obi", id: "IJMB/2025/ARTS/002", dept: "Arts", status: "Active", fees: "Partial", enrolled: "Jan 2025" },
  { name: "Fatima Bello", id: "IJMB/2025/SS/003", dept: "Social Sciences", status: "Active", fees: "Paid", enrolled: "Jan 2025" },
  { name: "Ibrahim Suleiman", id: "IJMB/2025/TECH/004", dept: "Technology", status: "Active", fees: "Pending", enrolled: "Jan 2025" },
  { name: "Ngozi Eze", id: "IJMB/2025/COM/005", dept: "Commerce", status: "At Risk", fees: "Paid", enrolled: "Jan 2025" },
  { name: "Hassan Usman", id: "IJMB/2025/ARTS/006", dept: "Arts", status: "Active", fees: "Paid", enrolled: "Feb 2025" },
];

const mockTeachers = [
  { name: "Dr. Adeyemi Femi", subject: "Biology", dept: "Sciences", classes: 3, students: 105, status: "Active" },
  { name: "Prof. Ngozi Okonkwo", subject: "Chemistry", dept: "Sciences", classes: 2, students: 80, status: "Active" },
  { name: "Dr. Ibrahim Musa", subject: "Physics", dept: "Sciences", classes: 2, students: 76, status: "Active" },
  { name: "Mrs. Amaka Obiora", subject: "Literature", dept: "Arts", classes: 2, students: 90, status: "Active" },
  { name: "Dr. Chisom Eze", subject: "Mathematics", dept: "All Depts", classes: 4, students: 160, status: "Active" },
];

const statusConfig: Record<string, { color: string; bg: string }> = {
  Pending: { color: "#D4A017", bg: "#D4A01718" },
  Approved: { color: "#1A6338", bg: "#1A633818" },
  Rejected: { color: "#C4501A", bg: "#C4501A18" },
  Active: { color: "#1A6338", bg: "#1A633818" },
  "At Risk": { color: "#C4501A", bg: "#C4501A18" },
  Paid: { color: "#1A6338", bg: "#1A633818" },
  Partial: { color: "#D4A017", bg: "#D4A01718" },
  Pending2: { color: "#C4501A", bg: "#C4501A18" },
};

export default function AdminDashboardPage() {
  const [tab, setTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const s = mockAdminStats;

  const filteredStudents = mockStudents.filter((st) =>
    st.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    st.dept.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout title="Admin Control Panel">
      {/* Admin banner */}
      <motion.div
        initial="hidden" animate="visible" variants={fadeUp}
        className="relative rounded-2xl border border-purple-500/20 bg-surface-1 p-5 mb-6 overflow-hidden"
      >
        <div className="absolute inset-0 pattern-geo opacity-60" />
        <div className="absolute top-0 right-0 w-64 h-32 rounded-full blur-[80px] opacity-8 bg-dept-purple pointer-events-none" />
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-dept-purple flex items-center justify-center font-bold text-white text-lg flex-shrink-0">
            AU
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-serif text-xl font-bold text-foreground">Admin Control Panel</div>
            <div className="text-muted-foreground text-sm">IJMB.program — Full Platform Access</div>
          </div>
          <div className="flex flex-wrap gap-3">
            {s.pendingApplications > 0 && (
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gold/15 border border-gold/30 text-gold text-sm font-medium">
                <AlertCircle className="w-3.5 h-3.5" />
                {s.pendingApplications} Pending Applications
              </span>
            )}
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
              tab === id ? "bg-gold/10 text-gold border border-gold/30" : "text-muted-foreground hover:text-foreground hover:bg-surface-1"
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
            {[
              { label: "Total Students", value: s.totalStudents.toLocaleString(), icon: GraduationCap, color: "#1A6338" },
              { label: "Pending Applications", value: s.pendingApplications, icon: CheckSquare, color: "#D4A017" },
              { label: "Monthly Revenue", value: `₦${(s.revenueThisMonth / 1000000).toFixed(1)}M`, icon: CreditCard, color: "#4A1D96" },
              { label: "Outstanding Fees", value: `₦${(s.outstandingFees / 1000000).toFixed(1)}M`, icon: AlertCircle, color: "#C4501A" },
            ].map(({ label, value, icon: Icon, color }, i) => (
              <motion.div key={label} custom={i} variants={fadeUp} className="p-5 rounded-2xl border border-border bg-surface-1 hover:border-gold/20 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">{label}</span>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${color}18` }}>
                    <Icon className="w-4 h-4" style={{ color }} />
                  </div>
                </div>
                <div className="font-serif text-2xl font-bold text-foreground">{value}</div>
              </motion.div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-5 mb-5">
            {/* Department breakdown */}
            <motion.div variants={fadeUp} className="p-5 rounded-2xl border border-border bg-surface-1">
              <h3 className="font-semibold text-foreground mb-4">Enrolment by Department</h3>
              <div className="flex flex-col gap-3">
                {s.departmentBreakdown.map((d) => (
                  <div key={d.name} className="flex items-center gap-3">
                    <div className="w-20 text-xs text-muted-foreground truncate">{d.name}</div>
                    <div className="flex-1 h-2 rounded-full bg-surface-3 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${(d.count / s.totalStudents) * 100}%`, background: d.color }}
                      />
                    </div>
                    <div className="w-14 text-right text-sm font-semibold" style={{ color: d.color }}>
                      {d.count.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Recent applications */}
            <motion.div variants={fadeUp} className="p-5 rounded-2xl border border-border bg-surface-1">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground">Recent Applications</h3>
                <button onClick={() => setTab("applications")} className="text-xs text-gold hover:underline">View all</button>
              </div>
              <div className="flex flex-col gap-2">
                {s.recentApplications.slice(0, 5).map((a, i) => {
                  const sc = statusConfig[a.status] ?? statusConfig.Pending;
                  return (
                    <div key={i} className="flex items-center gap-3 p-2.5 rounded-xl bg-surface-2">
                      <div className="w-7 h-7 rounded-full bg-gold/15 flex items-center justify-center text-gold font-bold text-xs">
                        {a.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm text-foreground truncate">{a.name}</div>
                        <div className="text-xs text-muted-foreground">{a.dept}</div>
                      </div>
                      <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ background: sc.bg, color: sc.color }}>
                        {a.status}
                      </span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* ── APPLICATIONS ── */}
      {tab === "applications" && (
        <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.07 } } }}>
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-serif text-xl font-bold">Applications</h2>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">{s.pendingApplications} pending</span>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            {s.recentApplications.map((a, i) => {
              const sc = statusConfig[a.status] ?? statusConfig.Pending;
              return (
                <motion.div key={i} custom={i} variants={fadeUp} className="flex items-center gap-4 p-4 rounded-2xl border border-border bg-surface-1 hover:border-gold/20 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center text-gold font-bold flex-shrink-0">
                    {a.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-foreground">{a.name}</div>
                    <div className="text-xs text-muted-foreground">{a.dept} · Applied {a.date}</div>
                  </div>
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full" style={{ background: sc.bg, color: sc.color }}>
                    {a.status}
                  </span>
                  {a.status === "Pending" && (
                    <div className="flex gap-2">
                      <button className="w-8 h-8 rounded-lg bg-green-500/10 border border-green-500/25 flex items-center justify-center hover:bg-green-500/20 transition-colors">
                        <Check className="w-4 h-4 text-green-400" />
                      </button>
                      <button className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/25 flex items-center justify-center hover:bg-red-500/20 transition-colors">
                        <X className="w-4 h-4 text-red-400" />
                      </button>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* ── STUDENTS ── */}
      {tab === "students" && (
        <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.07 } } }}>
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-serif text-xl font-bold">Students</h2>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search students..."
                  className="pl-9 pr-4 py-2 rounded-xl bg-surface-1 border border-border focus:border-gold/40 focus:outline-none text-sm text-foreground placeholder-muted-foreground w-48"
                />
              </div>
              <button className="flex items-center gap-2 px-3 py-2 rounded-xl border border-border text-sm text-foreground hover:border-gold/30 transition-colors">
                <Download className="w-3.5 h-3.5" /> Export
              </button>
            </div>
          </div>
          <motion.div variants={fadeUp} className="rounded-2xl border border-border bg-surface-1 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-surface-2">
                  <th className="text-left py-3 px-4 text-xs text-muted-foreground font-medium uppercase tracking-wider">Student</th>
                  <th className="text-left py-3 px-4 text-xs text-muted-foreground font-medium uppercase tracking-wider hidden md:table-cell">ID</th>
                  <th className="text-left py-3 px-4 text-xs text-muted-foreground font-medium uppercase tracking-wider hidden lg:table-cell">Department</th>
                  <th className="text-left py-3 px-4 text-xs text-muted-foreground font-medium uppercase tracking-wider">Status</th>
                  <th className="text-left py-3 px-4 text-xs text-muted-foreground font-medium uppercase tracking-wider hidden lg:table-cell">Fees</th>
                  <th className="text-left py-3 px-4 text-xs text-muted-foreground font-medium uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((st, i) => {
                  const sc = statusConfig[st.status] ?? statusConfig.Active;
                  const fc = st.fees === "Paid" ? statusConfig.Approved : st.fees === "Partial" ? statusConfig.Pending : { color: "#C4501A", bg: "#C4501A18" };
                  return (
                    <tr key={i} className="border-b border-border/50 hover:bg-surface-2 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full bg-gold/15 flex items-center justify-center text-gold font-bold text-xs">
                            {st.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                          </div>
                          <span className="font-medium text-foreground">{st.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-muted-foreground font-mono text-xs hidden md:table-cell">{st.id}</td>
                      <td className="py-3 px-4 text-muted-foreground hidden lg:table-cell">{st.dept}</td>
                      <td className="py-3 px-4">
                        <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ background: sc.bg, color: sc.color }}>{st.status}</span>
                      </td>
                      <td className="py-3 px-4 hidden lg:table-cell">
                        <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ background: fc.bg, color: fc.color }}>{st.fees}</span>
                      </td>
                      <td className="py-3 px-4">
                        <button className="text-xs text-gold hover:underline">View →</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </motion.div>
        </motion.div>
      )}

      {/* ── TEACHERS ── */}
      {tab === "teachers" && (
        <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.07 } } }}>
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-serif text-xl font-bold">Lecturers</h2>
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gold-gradient text-background text-sm font-semibold hover:opacity-90 shadow-[0_0_20px_-8px_hsl(43_80%_50%/0.5)]">
              <Plus className="w-4 h-4" /> Add Lecturer
            </button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockTeachers.map((t, i) => (
              <motion.div key={i} custom={i} variants={fadeUp} className="p-5 rounded-2xl border border-border bg-surface-1 hover:border-gold/20 transition-colors">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-dept-orange/15 flex items-center justify-center font-bold text-dept-orange">
                    {t.name.split(" ").slice(-1)[0][0]}
                  </div>
                  <div>
                    <div className="font-semibold text-foreground text-sm">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.subject}</div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 mb-3 text-center text-xs">
                  <div className="p-2 rounded-lg bg-surface-2">
                    <div className="font-bold text-foreground">{t.classes}</div>
                    <div className="text-muted-foreground">Classes</div>
                  </div>
                  <div className="p-2 rounded-lg bg-surface-2">
                    <div className="font-bold text-foreground">{t.students}</div>
                    <div className="text-muted-foreground">Students</div>
                  </div>
                  <div className="p-2 rounded-lg bg-surface-2">
                    <div className="font-bold text-green-400">Active</div>
                    <div className="text-muted-foreground">Status</div>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">{t.dept}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* ── DEPARTMENTS ── */}
      {tab === "departments" && (
        <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.07 } } }}>
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-serif text-xl font-bold">Departments</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {departments.map((d, i) => (
              <motion.div key={d.id} custom={i} variants={fadeUp} className="p-5 rounded-2xl border border-border bg-surface-1 hover:border-gold/20 transition-colors relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 rounded-full blur-[50px] opacity-10 pointer-events-none" style={{ background: d.color }} />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: `${d.color}20` }}>
                      {d.icon}
                    </div>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: `${d.color}15`, color: d.accent }}>
                      {d.shortCode}
                    </span>
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">{d.name}</h3>
                  <div className="text-xs text-muted-foreground mb-3">{d.students.toLocaleString()} students · {d.courses.length} subjects</div>
                  <div className="flex gap-2">
                    <button className="flex-1 py-2 rounded-lg border border-border text-xs font-medium text-foreground hover:border-gold/30 transition-colors">
                      Manage
                    </button>
                    <button className="px-3 py-2 rounded-lg text-xs font-medium" style={{ background: `${d.color}15`, color: d.accent }}>
                      View
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* ── RESULTS ── */}
      {tab === "results" && (
        <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.07 } } }}>
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-serif text-xl font-bold">Results Management</h2>
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gold-gradient text-background text-sm font-semibold hover:opacity-90 shadow-[0_0_20px_-8px_hsl(43_80%_50%/0.5)]">
              <Upload className="w-4 h-4" /> Upload Results
            </button>
          </div>
          <div className="grid sm:grid-cols-3 gap-4 mb-5">
            {[
              { label: "Published Results", value: "0", color: "#1A6338" },
              { label: "Pending Upload", value: "5 depts", color: "#D4A017" },
              { label: "Exam Period", value: "Jun 10–20", color: "#4A1D96" },
            ].map((r, i) => (
              <motion.div key={i} custom={i} variants={fadeUp} className="p-5 rounded-2xl border border-border bg-surface-1">
                <div className="text-xs text-muted-foreground mb-1">{r.label}</div>
                <div className="font-serif text-2xl font-bold" style={{ color: r.color }}>{r.value}</div>
              </motion.div>
            ))}
          </div>
          <motion.div variants={fadeUp} className="p-6 rounded-2xl border border-border bg-surface-1">
            <h3 className="font-semibold text-foreground mb-4">Upload Result Sheet</h3>
            <div className="flex flex-col gap-3">
              <div className="grid sm:grid-cols-2 gap-3">
                <select className="px-4 py-3 rounded-xl bg-surface-2 border border-border text-sm text-foreground focus:border-gold/40 focus:outline-none">
                  <option>Select department</option>
                  {departments.map((d) => <option key={d.id}>{d.name}</option>)}
                </select>
                <select className="px-4 py-3 rounded-xl bg-surface-2 border border-border text-sm text-foreground focus:border-gold/40 focus:outline-none">
                  <option>Select session</option>
                  <option>2025 — First Term</option>
                  <option>2025 — Second Term</option>
                  <option>2025 — Final Exams</option>
                </select>
              </div>
              <div className="flex items-center justify-center gap-3 py-8 rounded-xl border-2 border-dashed border-border hover:border-gold/30 transition-colors cursor-pointer">
                <Upload className="w-5 h-5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Drop result sheet CSV here or click to browse</span>
              </div>
              <button className="self-end px-6 py-2.5 rounded-xl bg-gold-gradient text-background text-sm font-semibold hover:opacity-90">
                Publish Results
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* ── PAYMENTS ── */}
      {tab === "payments" && (
        <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.07 } } }}>
          <h2 className="font-serif text-xl font-bold mb-5">Payment Tracking</h2>
          <div className="grid sm:grid-cols-3 gap-4 mb-6">
            <motion.div variants={fadeUp} className="p-5 rounded-2xl border border-green-500/20 bg-green-500/5">
              <div className="text-xs text-muted-foreground mb-1">This Month's Revenue</div>
              <div className="font-serif text-2xl font-bold text-green-400">₦{(s.revenueThisMonth / 1000000).toFixed(2)}M</div>
            </motion.div>
            <motion.div variants={fadeUp} className="p-5 rounded-2xl border border-gold/20 bg-gold/5">
              <div className="text-xs text-muted-foreground mb-1">Outstanding Fees</div>
              <div className="font-serif text-2xl font-bold text-gold">₦{(s.outstandingFees / 1000000).toFixed(2)}M</div>
            </motion.div>
            <motion.div variants={fadeUp} className="p-5 rounded-2xl border border-border bg-surface-1">
              <div className="text-xs text-muted-foreground mb-1">Total Enrolled</div>
              <div className="font-serif text-2xl font-bold text-foreground">{s.activeStudents.toLocaleString()}</div>
            </motion.div>
          </div>
          <motion.div variants={fadeUp} className="rounded-2xl border border-border bg-surface-1 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-surface-2">
                  <th className="text-left py-3 px-4 text-xs text-muted-foreground font-medium uppercase tracking-wider">Student</th>
                  <th className="text-left py-3 px-4 text-xs text-muted-foreground font-medium uppercase tracking-wider hidden md:table-cell">Description</th>
                  <th className="text-left py-3 px-4 text-xs text-muted-foreground font-medium uppercase tracking-wider">Amount</th>
                  <th className="text-left py-3 px-4 text-xs text-muted-foreground font-medium uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody>
                {mockStudents.slice(0, 5).map((st, i) => {
                  const feePaid = st.fees === "Paid";
                  return (
                    <tr key={i} className="border-b border-border/50 hover:bg-surface-2 transition-colors">
                      <td className="py-3 px-4 font-medium text-foreground">{st.name}</td>
                      <td className="py-3 px-4 text-muted-foreground hidden md:table-cell">Tuition Fee {feePaid ? "— Full" : "— Partial"}</td>
                      <td className="py-3 px-4 font-semibold text-foreground">₦{feePaid ? "225,000" : "75,000"}</td>
                      <td className="py-3 px-4">
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${feePaid ? "bg-green-500/10 text-green-400" : "bg-gold/10 text-gold"}`}>
                          {st.fees}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </motion.div>
        </motion.div>
      )}

      {/* ── ANNOUNCEMENTS ── */}
      {tab === "announcements" && (
        <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.07 } } }}>
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-serif text-xl font-bold">Announcements</h2>
          </div>
          <motion.div variants={fadeUp} className="p-6 rounded-2xl border border-border bg-surface-1 mb-5">
            <h3 className="font-semibold text-foreground mb-4">Publish New Announcement</h3>
            <div className="flex flex-col gap-3">
              <div className="grid sm:grid-cols-2 gap-3">
                <select className="px-4 py-3 rounded-xl bg-surface-2 border border-border text-sm text-foreground focus:border-gold/40 focus:outline-none">
                  <option>Audience</option>
                  <option>All Students</option>
                  <option>Sciences Students</option>
                  <option>Arts Students</option>
                  <option>All Lecturers</option>
                  <option>Everyone</option>
                </select>
                <select className="px-4 py-3 rounded-xl bg-surface-2 border border-border text-sm text-foreground focus:border-gold/40 focus:outline-none">
                  <option>Category</option>
                  <option>Academic</option>
                  <option>Admissions</option>
                  <option>Payments</option>
                  <option>Examinations</option>
                  <option>General</option>
                </select>
              </div>
              <input
                placeholder="Announcement title"
                className="px-4 py-3 rounded-xl bg-surface-2 border border-border text-sm text-foreground placeholder-muted-foreground focus:border-gold/40 focus:outline-none"
              />
              <textarea
                rows={4}
                placeholder="Write your announcement here..."
                className="px-4 py-3 rounded-xl bg-surface-2 border border-border text-sm text-foreground placeholder-muted-foreground resize-none focus:border-gold/40 focus:outline-none"
              />
              <div className="flex items-center gap-3 self-end">
                <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
                  <input type="checkbox" className="rounded" />
                  Mark as urgent
                </label>
                <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gold-gradient text-background text-sm font-semibold hover:opacity-90">
                  <Megaphone className="w-4 h-4" /> Publish
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </DashboardLayout>
  );
}
