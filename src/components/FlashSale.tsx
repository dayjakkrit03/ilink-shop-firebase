import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ProductCard } from "./ProductCard";
import { Clock } from "lucide-react";
import ethernetPciCard from "@/assets/ethernet-pci-card.jpg";
import wifiRouterAc1200 from "@/assets/wifi-router-ac1200.jpg";
import switch24port from "@/assets/switch-24port.jpg";
import lanCat5eLszh from "@/assets/lan-cat5e-lszh.jpg";

const flashSaleProducts = [
  {
    id: 1,
    name: "Ethernet PCI Network Card Gigabit",
    price: 650,
    originalPrice: 1300,
    discount: 50,
    rating: 4.6,
    reviews: 234,
    image: ethernetPciCard,
    isFreeShipping: true,
  },
  {
    id: 2,
    name: "WiFi Router AC1200 Dual Band",
    price: 1490,
    originalPrice: 2980,
    discount: 50,
    rating: 4.7,
    reviews: 345,
    image: wifiRouterAc1200,
    isFreeShipping: true,
  },
  {
    id: 3,
    name: "24-Port Managed Switch Gigabit",
    price: 1945,
    originalPrice: 3890,
    discount: 50,
    rating: 4.5,
    reviews: 167,
    image: switch24port,
    isFreeShipping: true,
  },
  {
    id: 4,
    name: "CAT5E UTP Cable LSZH 305m",
    price: 1297,
    originalPrice: 2594,
    discount: 50,
    rating: 4.8,
    reviews: 456,
    image: lanCat5eLszh,
    isFreeShipping: true,
  },
];

export const FlashSale = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState({
    hours: 2,
    minutes: 30,
    seconds: 45,
  });

  const handleViewAll = () => {
    navigate('/products?search=Clearance Sale');
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-8 bg-gradient-to-r from-sale/10 to-warning/10">
      <div className="container mx-auto px-4">
        {/* Flash Sale Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 bg-gradient-to-r from-sale to-warning text-white p-4 rounded-lg">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
            <div className="flex items-center gap-2">
              <div className="text-xl sm:text-2xl">⚡</div>
              <h2 className="text-xl sm:text-2xl font-bold">Clearance Sale</h2>
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm">
              <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>เหลือเวลา:</span>
              <div className="flex gap-1">
                <div className="bg-white/20 px-1 sm:px-2 py-1 rounded font-mono text-xs sm:text-sm">
                  {timeLeft.hours.toString().padStart(2, "0")}
                </div>
                <span className="text-xs sm:text-sm">:</span>
                <div className="bg-white/20 px-1 sm:px-2 py-1 rounded font-mono text-xs sm:text-sm">
                  {timeLeft.minutes.toString().padStart(2, "0")}
                </div>
                <span className="text-xs sm:text-sm">:</span>
                <div className="bg-white/20 px-1 sm:px-2 py-1 rounded font-mono text-xs sm:text-sm">
                  {timeLeft.seconds.toString().padStart(2, "0")}
                </div>
              </div>
            </div>
          </div>
          <Button variant="secondary" size="sm" className="w-full sm:w-auto shrink-0 text-sm" onClick={handleViewAll}>
            ดูทั้งหมด
          </Button>
        </div>

        {/* Flash Sale Products */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {flashSaleProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
};