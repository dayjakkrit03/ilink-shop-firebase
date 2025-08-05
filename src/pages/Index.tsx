import { useState } from "react";
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
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Mock cart items count - in real app this would come from state management
  const cartItemCount = 4;

  return (
    <div className="min-h-screen bg-background">
      <Header onCartClick={() => setIsCartOpen(true)} cartItemCount={cartItemCount} />
      
      {/* Breadcrumb for homepage */}
      <div className="container mx-auto px-4 py-4">
        <nav className="text-sm text-muted-foreground">
          <span className="text-primary font-medium">หน้าแรก</span>
        </nav>
      </div>
      
      <HeroSection />
      <ProductGrid />
      <CategoryGrid />
      <FlashSale />
      <InterlinkMall />
      <Footer />
      <ShoppingCart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <MessageChat />
    </div>
  );
};

export default Index;
