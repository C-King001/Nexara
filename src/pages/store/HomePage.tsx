import StoreNavbar from '@/components/store/StoreNavbar';
import StoreFooter from '@/components/store/StoreFooter';
import CartDrawer from '@/components/store/CartDrawer';
import AIAssistant from '@/components/store/AIAssistant';
import HeroSection from '@/components/store/sections/HeroSection';
import FeaturedDevices from '@/components/store/sections/FeaturedDevices';
import BrandsSection from '@/components/store/sections/BrandsSection';
import CategoriesSection from '@/components/store/sections/CategoriesSection';
import AIBuyingSection from '@/components/store/sections/AIBuyingSection';
import FlashDeals from '@/components/store/sections/FlashDeals';
import BestSellers from '@/components/store/sections/BestSellers';
import TestimonialsSection from '@/components/store/sections/TestimonialsSection';
import NewsletterSection from '@/components/store/sections/NewsletterSection';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#070709]">
      <StoreNavbar />
      <main>
        <HeroSection />
        <FeaturedDevices />
        <BrandsSection />
        <CategoriesSection />
        <AIBuyingSection />
        <FlashDeals />
        <BestSellers />
        <TestimonialsSection />
        <NewsletterSection />
      </main>
      <StoreFooter />
      <CartDrawer />
      <AIAssistant />
    </div>
  );
}
