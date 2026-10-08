import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
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
import PersonalPage from "./pages/PersonalPage.tsx";
import WorkPage from "./pages/WorkPage.tsx";
import BookingPage from "./pages/BookingPage.tsx";

const queryClient = new QueryClient();

// Without this the browser keeps the previous page's scroll position, so going
// from halfway down /fn to /work landed you at the bottom of /work.
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) return; // let anchor links do their own scrolling
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/book" element={<BookingPage />} />
          <Route path="/automation" element={<AutomationPage />} />
          <Route path="/social-media" element={<SocialMediaPage />} />
          <Route path="/social-media/results" element={<SocialMediaResultsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/case/:slug" element={<CaseStudyPage />} />
          <Route path="/fn" element={<PersonalPage />} />
          <Route path="/work" element={<WorkPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
