import { ProductCard } from "./ProductCard";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

// Mock product data
const products = [
  {
    id: 1,
    name: "UF-005SSM SC SMF Fiber Optic Adapter",
    price: 21,
    originalPrice: 28,
    discount: 25,
    rating: 4.5,
    reviews: 128,
    image: "https://images.unsplash.com/photo-1551808525-51a94da548ce?w=400&h=400&fit=crop",
    isLiked: true,
    isFreeShipping: true,
  },
  {
    id: 2,
    name: "UF-005SSM-APC SC SMF Connector",
    price: 21,
    originalPrice: 30,
    discount: 30,
    rating: 4.2,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=400&fit=crop",
    isFreeShipping: true,
  },
  {
    id: 3,
    name: "UF-0066 SC DUPI Optical Adapter",
    price: 41,
    originalPrice: 55,
    discount: 25,
    rating: 4.7,
    reviews: 256,
    image: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=400&h=400&fit=crop",
    isLiked: false,
  },
  {
    id: 4,
    name: "UF-0066SM SC DUPI Single Mode",
    price: 41,
    originalPrice: 58,
    discount: 29,
    rating: 4.3,
    reviews: 167,
    image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=400&h=400&fit=crop",
    isFreeShipping: true,
  },
  {
    id: 5,
    name: "UF-0066SM-APC SC/APC Adapter",
    price: 41,
    originalPrice: 52,
    discount: 21,
    rating: 4.8,
    reviews: 92,
    image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=400&h=400&fit=crop",
  },
  {
    id: 6,
    name: "UF-0088 FC D-type Connector",
    price: 52,
    originalPrice: 68,
    discount: 24,
    rating: 4.1,
    reviews: 201,
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&h=400&fit=crop",
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
    image: "https://images.unsplash.com/photo-1572949645841-094f3ee6eca2?w=400&h=400&fit=crop",
    isLiked: true,
  },
  {
    id: 8,
    name: "US-9025LSZH CAT 5e Network Cable",
    price: 6046,
    originalPrice: 7200,
    discount: 16,
    rating: 4.4,
    reviews: 178,
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=400&fit=crop",
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