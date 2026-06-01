import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "@/lib/motion";
import {
  LayoutDashboard, BookOpen, FileText, ClipboardList, BarChart3,
  CreditCard, Bell, Settings, LogOut, Menu, X, ChevronRight, Users,
  GraduationCap, Building2, Megaphone, Upload, CheckSquare,
} from "lucide-react";
import { useAuth } from "@/lib/ijmb-auth";

const studentNav = [
  { label: "Overview", href: "/ijmb/dashboard/student", icon: LayoutDashboard },
  { label: "My Courses", href: "/ijmb/dashboard/student/courses", icon: BookOpen },
  { label: "Study Materials", href: "/ijmb/dashboard/student/materials", icon: FileText },
  { label: "Assignments", href: "/ijmb/dashboard/student/assignments", icon: ClipboardList },
  { label: "Results", href: "/ijmb/dashboard/student/results", icon: BarChart3 },
  { label: "Payments", href: "/ijmb/dashboard/student/payments", icon: CreditCard },
];

const teacherNav = [
  { label: "Overview", href: "/ijmb/dashboard/teacher", icon: LayoutDashboard },
  { label: "My Classes", href: "/ijmb/dashboard/teacher/classes", icon: Users },
  { label: "Materials", href: "/ijmb/dashboard/teacher/materials", icon: Upload },
  { label: "Assignments", href: "/ijmb/dashboard/teacher/assignments", icon: ClipboardList },
  { label: "Results", href: "/ijmb/dashboard/teacher/results", icon: BarChart3 },
  { label: "Announcements", href: "/ijmb/dashboard/teacher/announcements", icon: Megaphone },
];

const adminNav = [
  { label: "Overview", href: "/ijmb/dashboard/admin", icon: LayoutDashboard },
  { label: "Applications", href: "/ijmb/dashboard/admin/applications", icon: CheckSquare },
  { label: "Students", href: "/ijmb/dashboard/admin/students", icon: GraduationCap },
  { label: "Teachers", href: "/ijmb/dashboard/admin/teachers", icon: Users },
  { label: "Departments", href: "/ijmb/dashboard/admin/departments", icon: Building2 },
  { label: "Results", href: "/ijmb/dashboard/admin/results", icon: BarChart3 },
  { label: "Payments", href: "/ijmb/dashboard/admin/payments", icon: CreditCard },
  { label: "Announcements", href: "/ijmb/dashboard/admin/announcements", icon: Megaphone },
];

const navByRole = { student: studentNav, teacher: teacherNav, admin: adminNav };
const roleColors = { student: "#1A6338", teacher: "#C4501A", admin: "#4A1D96" };
const roleLabels = { student: "Student", teacher: "Lecturer", admin: "Administrator" };

interface DashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export default function DashboardLayout({ children, title }: DashboardLayoutProps) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const role = user?.role ?? "student";
  const navItems = navByRole[role] ?? studentNav;
  const color = roleColors[role] ?? "#1A6338";

  const handleLogout = () => {
    logout();
    navigate("/ijmb/login");
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Brand */}
      <div className="p-5 border-b border-border">
        <Link to="/ijmb" className="flex items-center gap-2.5 group">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center shadow-sm"
            style={{ background: `linear-gradient(135deg, ${color}, ${color}cc)` }}
          >
            <span className="text-white font-bold text-xs font-serif">IJ</span>
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-serif font-bold text-foreground text-sm">IJMB</span>
            <span className="text-[9px] tracking-widest uppercase" style={{ color }}>
              .program
            </span>
          </div>
        </Link>
      </div>

      {/* User chip */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-surface-2">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-white text-sm flex-shrink-0"
            style={{ background: color }}
          >
            {user?.avatar ?? "??"}
          </div>
          <div className="min-w-0">
            <div className="font-medium text-foreground text-sm truncate">{user?.name}</div>
            <div className="text-xs text-muted-foreground">{roleLabels[role]}</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 overflow-y-auto scrollbar-thin">
        <div className="flex flex-col gap-1">
          {navItems.map(({ label, href, icon: Icon }) => {
            const active = location.pathname === href;
            return (
              <Link
                key={href}
                to={href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  active
                    ? "text-white"
                    : "text-muted-foreground hover:text-foreground hover:bg-surface-2"
                }`}
                style={active ? { background: color, boxShadow: `0 4px 20px -8px ${color}80` } : {}}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                {label}
                {active && <ChevronRight className="w-3 h-3 ml-auto opacity-60" />}
              </Link>
            );
          })}
        </div>

        <div className="mt-6 pt-4 border-t border-border flex flex-col gap-1">
          <Link
            to="/ijmb/dashboard/settings"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-surface-2 transition-all"
          >
            <Settings className="w-4 h-4" />
            Settings
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/5 transition-all w-full text-left"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </nav>
    </div>
  );

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-60 xl:w-64 border-r border-border bg-surface-1 flex-shrink-0 sticky top-0 h-screen overflow-hidden">
        <SidebarContent />
      </aside>

      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="lg:hidden fixed left-0 top-0 bottom-0 w-64 bg-surface-1 border-r border-border z-50 overflow-hidden"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="h-14 flex items-center justify-between px-6 border-b border-border bg-background/90 backdrop-blur-sm sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden w-8 h-8 flex items-center justify-center rounded-lg border border-border hover:border-gold/30 transition-colors"
            >
              <Menu className="w-4 h-4" />
            </button>
            {title && (
              <h1 className="font-serif text-lg font-semibold text-foreground">{title}</h1>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-border hover:border-gold/30 transition-colors relative">
              <Bell className="w-4 h-4 text-muted-foreground" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-gold" />
            </button>
            <Link
              to="/ijmb"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-xs text-muted-foreground hover:text-foreground hover:border-gold/30 transition-colors"
            >
              ← Public site
            </Link>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
