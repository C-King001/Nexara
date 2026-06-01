import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import { OrderProvider } from "@/context/OrderContext";

import HomePage from "@/pages/felicia/HomePage";
import MenuPage from "@/pages/felicia/MenuPage";
import CheckoutPage from "@/pages/felicia/CheckoutPage";
import OrderTrackingPage from "@/pages/felicia/OrderTrackingPage";
import TrackOrderPage from "@/pages/felicia/TrackOrderPage";
import AuthPage from "@/pages/felicia/AuthPage";
import AccountPage from "@/pages/felicia/AccountPage";
import AdminPage from "@/pages/felicia/AdminPage";
import AdminOrdersPage from "@/pages/felicia/AdminOrdersPage";
import AdminMenuPage from "@/pages/felicia/AdminMenuPage";
import AdminAnalyticsPage from "@/pages/felicia/AdminAnalyticsPage";
import AdminRidersPage from "@/pages/felicia/AdminRidersPage";

import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <OrderProvider>
          <CartProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                {/* Customer routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/menu" element={<MenuPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/order/:orderId/tracking" element={<OrderTrackingPage />} />
                <Route path="/track" element={<TrackOrderPage />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/account" element={<AccountPage />} />
                <Route path="/account/orders" element={<AccountPage />} />

                {/* Admin routes */}
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/admin/orders" element={<AdminOrdersPage />} />
                <Route path="/admin/menu" element={<AdminMenuPage />} />
                <Route path="/admin/analytics" element={<AdminAnalyticsPage />} />
                <Route path="/admin/riders" element={<AdminRidersPage />} />

                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </CartProvider>
        </OrderProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
