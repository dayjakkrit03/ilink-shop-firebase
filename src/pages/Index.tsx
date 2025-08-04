import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { CategoryGrid } from "@/components/CategoryGrid";
import { FlashSale } from "@/components/FlashSale";
import { ProductGrid } from "@/components/ProductGrid";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <CategoryGrid />
      <FlashSale />
      <ProductGrid />
      <Footer />
    </div>
  );
};

export default Index;
