import { useState } from "react";
import { motion } from "@/lib/motion";
import {
  Users, Upload, FileText, BarChart3, CheckSquare, Megaphone,
  Plus, Download, BookOpen, TrendingUp, ClipboardList,
} from "lucide-react";
import DashboardLayout from "@/components/ijmb/DashboardLayout";
import { mockTeacherData } from "@/data/ijmb";
import { useAuth } from "@/lib/ijmb-auth";

const tabs = [
  { id: "overview", label: "Overview", icon: BarChart3 },
  { id: "classes", label: "My Classes", icon: Users },
  { id: "materials", label: "Materials", icon: Upload },
  { id: "assignments", label: "Assignments", icon: ClipboardList },
  { id: "results", label: "Results", icon: TrendingUp },
  { id: "announcements", label: "Announcements", icon: Megaphone },
];

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.45, delay: i * 0.07 } }),
};

const mockAssignments = [
  { title: "Cell Division Essay", class: "BIO301-A", due: "May 30", submitted: 36, total: 42, graded: 20 },
  { title: "Genetics Quiz", class: "BIO301-B", due: "May 28", submitted: 30, total: 38, graded: 30 },
  { title: "Ecology Report", class: "BIO302", due: "Jun 2", submitted: 10, total: 25, graded: 0 },
];

const mockStudentList = [
  { name: "Aisha Mohammed", id: "IJMB/2025/SCI/001", ca: 72, status: "Active" },
  { name: "Chukwuemeka Obi", id: "IJMB/2025/SCI/002", ca: 85, status: "Active" },
  { name: "Fatima Bello", id: "IJMB/2025/SCI/003", ca: 61, status: "Active" },
  { name: "Ibrahim Suleiman", id: "IJMB/2025/SCI/004", ca: 78, status: "Active" },
  { name: "Ngozi Eze", id: "IJMB/2025/SCI/005", ca: 55, status: "At Risk" },
  { name: "Emeka Johnson", id: "IJMB/2025/SCI/006", ca: 90, status: "Active" },
];

export default function TeacherDashboardPage() {
  const [tab, setTab] = useState("overview");
  const { user } = useAuth();
  const t = mockTeacherData;
  const totalStudents = t.classes.reduce((a, c) => a + c.students, 0);

  return (
    <DashboardLayout title="Lecturer Portal">
      {/* Header banner */}
      <motion.div
        initial="hidden" animate="visible" variants={fadeUp}
        className="relative rounded-2xl border border-border bg-surface-1 p-5 mb-6 overflow-hidden"
      >
        <div className="absolute inset-0 pattern-geo opacity-60" />
        <div className="absolute top-0 right-0 w-64 h-32 rounded-full blur-[80px] opacity-10 bg-dept-orange pointer-events-none" />
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-dept-orange flex items-center justify-center font-bold text-white text-lg flex-shrink-0">
            {user?.avatar ?? "AF"}
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-serif text-xl font-bold text-foreground">{user?.name ?? t.name}</div>
            <div className="text-muted-foreground text-sm">{t.subject} · {t.department} Department</div>
          </div>
          <div className="flex flex-wrap gap-3 text-sm">
            <span className="px-3 py-1.5 rounded-full bg-surface-2 border border-border text-foreground/80">{t.classes.length} Classes</span>
            <span className="px-3 py-1.5 rounded-full bg-surface-2 border border-border text-foreground/80">{totalStudents} Students</span>
            <span className="px-3 py-1.5 rounded-full bg-gold/15 border border-gold/30 text-gold font-medium">
              {t.pendingGrades} Pending Grades
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
              { label: "My Classes", value: t.classes.length, icon: Users, color: "#C4501A" },
              { label: "Total Students", value: totalStudents, icon: BookOpen, color: "#1A6338" },
              { label: "Pending Grades", value: t.pendingGrades, icon: ClipboardList, color: "#D4A017" },
              { label: "Materials Uploaded", value: t.recentUploads.length, icon: Upload, color: "#4A1D96" },
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

          <div className="grid lg:grid-cols-2 gap-5">
            {/* Classes summary */}
            <motion.div variants={fadeUp} className="p-5 rounded-2xl border border-border bg-surface-1">
              <h3 className="font-semibold text-foreground mb-4">Active Classes</h3>
              <div className="flex flex-col gap-3">
                {t.classes.map((cls) => (
                  <div key={cls.code} className="flex items-center gap-3 p-3 rounded-xl bg-surface-2">
                    <div className="w-9 h-9 rounded-lg bg-dept-orange/15 flex items-center justify-center">
                      <BookOpen className="w-4 h-4 text-dept-orange" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-sm text-foreground">{cls.name}</div>
                      <div className="text-xs text-muted-foreground">{cls.code} · {cls.students} students</div>
                    </div>
                    <span className="text-xs text-muted-foreground">{cls.term}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Recent uploads */}
            <motion.div variants={fadeUp} className="p-5 rounded-2xl border border-border bg-surface-1">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground">Recent Uploads</h3>
                <button
                  onClick={() => setTab("materials")}
                  className="text-xs text-gold hover:underline"
                >
                  View all
                </button>
              </div>
              <div className="flex flex-col gap-3">
                {t.recentUploads.map((u, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-surface-2">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${u.type === "Video" ? "bg-purple-500/15" : "bg-gold/10"}`}>
                      <FileText className={`w-3.5 h-3.5 ${u.type === "Video" ? "text-purple-400" : "text-gold"}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm text-foreground truncate">{u.title}</div>
                      <div className="text-xs text-muted-foreground">{u.class} · {u.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* ── CLASSES ── */}
      {tab === "classes" && (
        <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.07 } } }}>
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-serif text-xl font-bold">My Classes</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {t.classes.map((cls, i) => (
              <motion.div key={cls.code} custom={i} variants={fadeUp} className="p-5 rounded-2xl border border-border bg-surface-1 hover:border-gold/20 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{cls.code}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-gold/10 text-gold border border-gold/20">{cls.term}</span>
                </div>
                <h3 className="font-semibold text-foreground text-base mb-1">{cls.name}</h3>
                <div className="text-sm text-muted-foreground mb-4">{cls.students} enrolled students</div>
                <div className="h-1.5 rounded-full bg-surface-3 mb-4">
                  <div className="h-full rounded-full bg-dept-orange" style={{ width: "65%" }} />
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 py-2 rounded-lg border border-border text-xs font-medium text-foreground hover:border-gold/30 transition-colors">
                    View Students
                  </button>
                  <button className="px-3 py-2 rounded-lg bg-dept-orange/15 text-dept-orange text-xs font-medium border border-dept-orange/25 hover:bg-dept-orange/20 transition-colors">
                    Upload
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Student list */}
          <motion.div variants={fadeUp} className="p-5 rounded-2xl border border-border bg-surface-1">
            <h3 className="font-semibold text-foreground mb-4">BIO301-A Student List</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 px-3 text-xs text-muted-foreground font-medium uppercase tracking-wider">Student</th>
                    <th className="text-left py-2 px-3 text-xs text-muted-foreground font-medium uppercase tracking-wider">ID</th>
                    <th className="text-left py-2 px-3 text-xs text-muted-foreground font-medium uppercase tracking-wider">CA Score</th>
                    <th className="text-left py-2 px-3 text-xs text-muted-foreground font-medium uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {mockStudentList.map((s, i) => (
                    <tr key={i} className="border-b border-border/50 hover:bg-surface-2 transition-colors">
                      <td className="py-3 px-3 font-medium text-foreground">{s.name}</td>
                      <td className="py-3 px-3 text-muted-foreground font-mono text-xs">{s.id}</td>
                      <td className="py-3 px-3">
                        <span className={`font-semibold ${s.ca >= 70 ? "text-green-400" : s.ca >= 50 ? "text-gold" : "text-red-400"}`}>
                          {s.ca}%
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${s.status === "Active" ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"}`}>
                          {s.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* ── MATERIALS ── */}
      {tab === "materials" && (
        <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.07 } } }}>
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-serif text-xl font-bold">Study Materials</h2>
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gold-gradient text-background text-sm font-semibold hover:opacity-90 transition-opacity shadow-[0_0_20px_-8px_hsl(43_80%_50%/0.5)]">
              <Plus className="w-4 h-4" /> Upload Material
            </button>
          </div>

          {/* Upload drop zone */}
          <motion.div variants={fadeUp} className="border-2 border-dashed border-border hover:border-gold/30 rounded-2xl p-8 text-center mb-5 transition-colors cursor-pointer group">
            <Upload className="w-8 h-8 text-muted-foreground group-hover:text-gold mx-auto mb-3 transition-colors" />
            <p className="font-medium text-foreground mb-1">Drag & drop files here</p>
            <p className="text-muted-foreground text-sm">PDF, MP4, DOCX — up to 500MB per file</p>
            <button className="mt-4 px-4 py-2 rounded-lg border border-border text-sm text-foreground hover:border-gold/30 transition-colors">
              Browse Files
            </button>
          </motion.div>

          <div className="flex flex-col gap-3">
            {t.recentUploads.map((u, i) => (
              <motion.div key={i} custom={i} variants={fadeUp} className="flex items-center gap-4 p-4 rounded-2xl border border-border bg-surface-1 group hover:border-gold/20 transition-colors">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${u.type === "Video" ? "bg-purple-500/10" : "bg-gold/10"}`}>
                  <FileText className={`w-5 h-5 ${u.type === "Video" ? "text-purple-400" : "text-gold"}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm text-foreground">{u.title}</div>
                  <div className="text-xs text-muted-foreground">{u.class} · {u.date}</div>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${u.type === "Video" ? "bg-purple-500/10 text-purple-400" : "bg-gold/10 text-gold"}`}>
                  {u.type}
                </span>
                <button className="w-8 h-8 rounded-lg border border-border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
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
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-serif text-xl font-bold">Assignments</h2>
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gold-gradient text-background text-sm font-semibold hover:opacity-90 shadow-[0_0_20px_-8px_hsl(43_80%_50%/0.5)]">
              <Plus className="w-4 h-4" /> Create Assignment
            </button>
          </div>
          <div className="flex flex-col gap-4">
            {mockAssignments.map((a, i) => (
              <motion.div key={i} custom={i} variants={fadeUp} className="p-5 rounded-2xl border border-border bg-surface-1 hover:border-gold/20 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-foreground">{a.title}</h3>
                    <div className="text-xs text-muted-foreground mt-0.5">{a.class} · Due {a.due}</div>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-gold/10 text-gold border border-gold/20 font-medium">
                    {a.graded}/{a.submitted} graded
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                  <div className="text-center p-3 rounded-xl bg-surface-2">
                    <div className="font-bold text-foreground">{a.total}</div>
                    <div className="text-xs text-muted-foreground">Total</div>
                  </div>
                  <div className="text-center p-3 rounded-xl bg-green-500/5 border border-green-500/15">
                    <div className="font-bold text-green-400">{a.submitted}</div>
                    <div className="text-xs text-muted-foreground">Submitted</div>
                  </div>
                  <div className="text-center p-3 rounded-xl bg-gold/5 border border-gold/15">
                    <div className="font-bold text-gold">{a.submitted - a.graded}</div>
                    <div className="text-xs text-muted-foreground">To Grade</div>
                  </div>
                </div>
                <div className="h-1.5 rounded-full bg-surface-3 mb-4">
                  <div className="h-full rounded-full bg-green-500" style={{ width: `${(a.graded / a.total) * 100}%` }} />
                </div>
                <button className="px-4 py-2 rounded-lg bg-gold/10 text-gold border border-gold/20 text-sm font-medium hover:bg-gold/15 transition-colors">
                  Grade Submissions →
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* ── RESULTS ── */}
      {tab === "results" && (
        <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.07 } } }}>
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-serif text-xl font-bold">Upload Results</h2>
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gold-gradient text-background text-sm font-semibold hover:opacity-90 shadow-[0_0_20px_-8px_hsl(43_80%_50%/0.5)]">
              <Upload className="w-4 h-4" /> Upload Scores
            </button>
          </div>
          <motion.div variants={fadeUp} className="p-6 rounded-2xl border border-border bg-surface-1">
            <p className="text-muted-foreground text-sm mb-4">Select a class and upload a CSV or enter scores manually.</p>
            <div className="flex flex-col gap-3 mb-5">
              <select className="px-4 py-3 rounded-xl bg-surface-2 border border-border text-sm text-foreground focus:border-gold/40 focus:outline-none">
                <option>Select class</option>
                {t.classes.map((c) => <option key={c.code}>{c.name} ({c.code})</option>)}
              </select>
              <select className="px-4 py-3 rounded-xl bg-surface-2 border border-border text-sm text-foreground focus:border-gold/40 focus:outline-none">
                <option>Assessment type</option>
                <option>Continuous Assessment (CA)</option>
                <option>Final Examination</option>
                <option>Mid-Term Test</option>
              </select>
            </div>
            <div className="flex gap-3">
              <button className="flex-1 py-3 rounded-xl border border-border text-sm font-medium text-foreground hover:border-gold/30 transition-colors">
                Enter Manually
              </button>
              <button className="flex-1 py-3 rounded-xl bg-gold/10 text-gold border border-gold/20 text-sm font-medium hover:bg-gold/15 transition-colors">
                Upload CSV
              </button>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-4 p-5 rounded-2xl border border-border bg-surface-1">
            <h3 className="font-semibold text-foreground mb-3">BIO301-A — CA Scores</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 px-3 text-xs text-muted-foreground font-medium uppercase tracking-wider">Student</th>
                    <th className="text-center py-2 px-3 text-xs text-muted-foreground font-medium uppercase tracking-wider">CA Score</th>
                    <th className="text-center py-2 px-3 text-xs text-muted-foreground font-medium uppercase tracking-wider">Grade</th>
                    <th className="text-center py-2 px-3 text-xs text-muted-foreground font-medium uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {mockStudentList.map((s, i) => {
                    const grade = s.ca >= 70 ? "A" : s.ca >= 60 ? "B" : s.ca >= 50 ? "C" : "F";
                    return (
                      <tr key={i} className="border-b border-border/50 hover:bg-surface-2 transition-colors">
                        <td className="py-3 px-3 font-medium text-foreground">{s.name}</td>
                        <td className="py-3 px-3 text-center">
                          <span className={`font-semibold ${s.ca >= 70 ? "text-green-400" : s.ca >= 50 ? "text-gold" : "text-red-400"}`}>{s.ca}</span>
                        </td>
                        <td className="py-3 px-3 text-center">
                          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${grade === "A" ? "bg-green-500/10 text-green-400" : grade === "B" ? "bg-gold/10 text-gold" : grade === "C" ? "bg-yellow-500/10 text-yellow-400" : "bg-red-500/10 text-red-400"}`}>
                            {grade}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-center">
                          <button className="text-xs text-gold hover:underline">Edit</button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* ── ANNOUNCEMENTS ── */}
      {tab === "announcements" && (
        <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.07 } } }}>
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-serif text-xl font-bold">Announcements</h2>
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gold-gradient text-background text-sm font-semibold hover:opacity-90 shadow-[0_0_20px_-8px_hsl(43_80%_50%/0.5)]">
              <Plus className="w-4 h-4" /> New Announcement
            </button>
          </div>
          <motion.div variants={fadeUp} className="p-6 rounded-2xl border border-border bg-surface-1 mb-5">
            <h3 className="font-semibold text-foreground mb-4">Post to Students</h3>
            <div className="flex flex-col gap-3">
              <select className="px-4 py-3 rounded-xl bg-surface-2 border border-border text-sm text-foreground focus:border-gold/40 focus:outline-none">
                <option>All my classes</option>
                {t.classes.map((c) => <option key={c.code}>{c.name}</option>)}
              </select>
              <input
                placeholder="Announcement title"
                className="px-4 py-3 rounded-xl bg-surface-2 border border-border text-sm text-foreground placeholder-muted-foreground focus:border-gold/40 focus:outline-none"
              />
              <textarea
                rows={4}
                placeholder="Write your announcement here..."
                className="px-4 py-3 rounded-xl bg-surface-2 border border-border text-sm text-foreground placeholder-muted-foreground resize-none focus:border-gold/40 focus:outline-none"
              />
              <button className="self-end flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gold-gradient text-background text-sm font-semibold hover:opacity-90">
                Post Announcement
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </DashboardLayout>
  );
}
