import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import CaseStudyPage from "./pages/CaseStudyPage.tsx";
import AutomationPage from "./pages/AutomationPage.tsx";
import SocialMediaPage from "./pages/SocialMediaPage.tsx";
import SocialMediaResultsPage from "./pages/SocialMediaResultsPage.tsx";
import AboutPage from "./pages/AboutPage.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/automation" element={<AutomationPage />} />
          <Route path="/social-media" element={<SocialMediaPage />} />
          <Route path="/social-media/results" element={<SocialMediaResultsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/case/:slug" element={<CaseStudyPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
