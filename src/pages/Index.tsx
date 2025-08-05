import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { CategoryGrid } from "@/components/CategoryGrid";
import { FlashSale } from "@/components/FlashSale";
import { InterlinkMall } from "@/components/InterlinkMall";
import { ProductGrid } from "@/components/ProductGrid";
import { Footer } from "@/components/Footer";
import { ShoppingCart } from "@/components/ShoppingCart";
import { MessageChat } from "@/components/MessageChat";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <ProductGrid />
      <CategoryGrid />
      <FlashSale />
      <InterlinkMall />
      <Footer />
      <ShoppingCart />
      <MessageChat />
    </div>
  );
};

export default Index;
