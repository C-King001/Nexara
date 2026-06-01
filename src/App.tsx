import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/lib/ijmb-auth";

// IJMB Public Pages
import HomePage from "./pages/ijmb/HomePage";
import AboutPage from "./pages/ijmb/AboutPage";
import DepartmentsPage from "./pages/ijmb/DepartmentsPage";
import AdmissionsPage from "./pages/ijmb/AdmissionsPage";
import FAQPage from "./pages/ijmb/FAQPage";
import ContactPage from "./pages/ijmb/ContactPage";

// IJMB Auth
import LoginPage from "./pages/ijmb/auth/LoginPage";
import RegisterPage from "./pages/ijmb/auth/RegisterPage";

// IJMB Dashboards
import StudentDashboardPage from "./pages/ijmb/student/DashboardPage";
import TeacherDashboardPage from "./pages/ijmb/teacher/DashboardPage";
import AdminDashboardPage from "./pages/ijmb/admin/DashboardPage";

// Legacy pages (kept, not removed)
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Root → IJMB home */}
            <Route path="/" element={<Navigate to="/ijmb" replace />} />

            {/* IJMB Public */}
            <Route path="/ijmb" element={<HomePage />} />
            <Route path="/ijmb/about" element={<AboutPage />} />
            <Route path="/ijmb/departments" element={<DepartmentsPage />} />
            <Route path="/ijmb/admissions" element={<AdmissionsPage />} />
            <Route path="/ijmb/apply" element={<RegisterPage />} />
            <Route path="/ijmb/faq" element={<FAQPage />} />
            <Route path="/ijmb/contact" element={<ContactPage />} />

            {/* IJMB Auth */}
            <Route path="/ijmb/login" element={<LoginPage />} />
            <Route path="/ijmb/register" element={<RegisterPage />} />

            {/* IJMB Dashboards */}
            <Route path="/ijmb/dashboard/student" element={<StudentDashboardPage />} />
            <Route path="/ijmb/dashboard/student/*" element={<StudentDashboardPage />} />
            <Route path="/ijmb/dashboard/teacher" element={<TeacherDashboardPage />} />
            <Route path="/ijmb/dashboard/teacher/*" element={<TeacherDashboardPage />} />
            <Route path="/ijmb/dashboard/admin" element={<AdminDashboardPage />} />
            <Route path="/ijmb/dashboard/admin/*" element={<AdminDashboardPage />} />

            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
