import { ProductCard } from "./ProductCard";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import fiberOpticCable from "@/assets/fiber-optic-cable.jpg";
import networkSwitch from "@/assets/network-switch-professional.jpg";
import coaxialCable from "@/assets/coaxial-cable-reel.jpg";
import solarCable from "@/assets/solar-cable-red.jpg";
import telephoneCable from "@/assets/telephone-cable.jpg";
import serverRack from "@/assets/server-rack-19inch.jpg";
import lanCat5eBox from "@/assets/lan-cat5e-box.jpg";
import starlinkStandardKit from "@/assets/starlink-standard-kit.jpg";

// Mock product data with Interlink categories
const products = [
  {
    id: 1,
    name: "Fiber Optic Cable Single Mode 305m",
    price: 2150,
    originalPrice: 2750,
    discount: 22,
    rating: 4.8,
    reviews: 156,
    image: fiberOpticCable,
    isLiked: true,
    isFreeShipping: true,
  },
  {
    id: 2,
    name: "24-Port Gigabit Network Switch",
    price: 3890,
    originalPrice: 4500,
    discount: 14,
    rating: 4.6,
    reviews: 234,
    image: networkSwitch,
    isFreeShipping: true,
  },
  {
    id: 3,
    name: "RG-6 Coaxial Cable 305m",
    price: 1450,
    originalPrice: 1850,
    discount: 22,
    rating: 4.5,
    reviews: 189,
    image: coaxialCable,
    isLiked: false,
  },
  {
    id: 4,
    name: "Solar Cable 4mm² PV Wire 100m",
    price: 2800,
    originalPrice: 3200,
    discount: 13,
    rating: 4.7,
    reviews: 145,
    image: solarCable,
    isFreeShipping: true,
  },
  {
    id: 5,
    name: "Telephone Cable 4-Pair Indoor 305m",
    price: 980,
    originalPrice: 1250,
    discount: 22,
    rating: 4.4,
    reviews: 98,
    image: telephoneCable,
  },
  {
    id: 6,
    name: "19\" Server Rack Cabinet 42U",
    price: 15800,
    originalPrice: 18500,
    discount: 15,
    rating: 4.9,
    reviews: 87,
    image: serverRack,
    isFreeShipping: true,
  },
  {
    id: 7,
    name: "US-9035 CAT 5E UTP Cable Indoor 305m",
    price: 6094,
    originalPrice: 6800,
    discount: 10,
    rating: 4.7,
    reviews: 178,
    image: lanCat5eBox,
    isLiked: true,
  },
  {
    id: 8,
    name: "Telephone Cable 4-Pair Indoor 305m",
    price: 980,
    originalPrice: 1250,
    discount: 22,
    rating: 4.4,
    reviews: 98,
    image: telephoneCable,
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