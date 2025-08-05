import { ProductCard } from "./ProductCard";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

// Mock product data
const products = [
  {
    id: 1,
    name: "UF-005SSM SC SMF Fiber Optic Adapter",
    price: 21,
    rating: 4.5,
    reviews: 128,
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&h=400&fit=crop",
    isLiked: true,
    isFreeShipping: true,
  },
  {
    id: 2,
    name: "UF-005SSM-APC SC SMF Connector",
    price: 21,
    rating: 4.2,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=400&fit=crop",
    isFreeShipping: true,
  },
  {
    id: 3,
    name: "UF-0066 SC DUPI Optical Adapter",
    price: 41,
    rating: 4.7,
    reviews: 256,
    image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=400&h=400&fit=crop",
    isLiked: false,
  },
  {
    id: 4,
    name: "UF-0066SM SC DUPI Single Mode",
    price: 41,
    rating: 4.3,
    reviews: 167,
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=400&fit=crop",
    isFreeShipping: true,
  },
  {
    id: 5,
    name: "UF-0066SM-APC SC/APC Adapter",
    price: 41,
    rating: 4.8,
    reviews: 92,
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&h=400&fit=crop",
  },
  {
    id: 6,
    name: "UF-0088 FC D-type Connector",
    price: 52,
    rating: 4.1,
    reviews: 201,
    image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=400&h=400&fit=crop",
    isFreeShipping: true,
  },
  {
    id: 7,
    name: "US-9015LSZH CAT 6 UTP Cable",
    price: 4837,
    originalPrice: 5200,
    discount: 7,
    rating: 4.6,
    reviews: 143,
    image: "https://images.unsplash.com/photo-1562408590-e32931084e23?w=400&h=400&fit=crop",
    isLiked: true,
  },
  {
    id: 8,
    name: "US-9025LSZH CAT 5e Network Cable",
    price: 6046,
    rating: 4.4,
    reviews: 178,
    image: "https://images.unsplash.com/photo-1562408590-e32931084e23?w=400&h=400&fit=crop",
    isFreeShipping: true,
  },
];

export const ProductGrid = () => {
  return (
    <section className="py-12 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        {/* Product Grid Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">สินค้าแนะนำ</h2>
          <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
            ดูทั้งหมด
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {products.map((product, index) => (
            <div
              key={product.id}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ProductCard {...product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};