import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { AuthProvider } from "@/lib/ijmb-auth";

import HomePage from "./pages/ijmb/HomePage";
import AboutPage from "./pages/ijmb/AboutPage";
import DepartmentsPage from "./pages/ijmb/DepartmentsPage";
import AdmissionsPage from "./pages/ijmb/AdmissionsPage";
import FAQPage from "./pages/ijmb/FAQPage";
import ContactPage from "./pages/ijmb/ContactPage";
import LoginPage from "./pages/ijmb/auth/LoginPage";
import RegisterPage from "./pages/ijmb/auth/RegisterPage";
import StudentDashboardPage from "./pages/ijmb/student/DashboardPage";
import TeacherDashboardPage from "./pages/ijmb/teacher/DashboardPage";
import AdminDashboardPage from "./pages/ijmb/admin/DashboardPage";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Navigate to="/ijmb" replace />} />
            <Route path="/ijmb" element={<HomePage />} />
            <Route path="/ijmb/about" element={<AboutPage />} />
            <Route path="/ijmb/departments" element={<DepartmentsPage />} />
            <Route path="/ijmb/admissions" element={<AdmissionsPage />} />
            <Route path="/ijmb/apply" element={<RegisterPage />} />
            <Route path="/ijmb/faq" element={<FAQPage />} />
            <Route path="/ijmb/contact" element={<ContactPage />} />
            <Route path="/ijmb/login" element={<LoginPage />} />
            <Route path="/ijmb/register" element={<RegisterPage />} />
            <Route path="/ijmb/dashboard/student/*" element={<StudentDashboardPage />} />
            <Route path="/ijmb/dashboard/teacher/*" element={<TeacherDashboardPage />} />
            <Route path="/ijmb/dashboard/admin/*" element={<AdminDashboardPage />} />
            <Route path="*" element={<Navigate to="/ijmb" replace />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
