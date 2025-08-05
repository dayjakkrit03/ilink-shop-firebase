import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ProductCard } from "./ProductCard";
import { Clock } from "lucide-react";

const flashSaleProducts = [
  {
    id: 1,
    name: "แท็บเล็ต 10.1 นิ้ว 128GB WiFi+4G",
    price: 2990,
    originalPrice: 5990,
    discount: 50,
    rating: 4.6,
    reviews: 234,
    image: "https://images.unsplash.com/photo-1551808525-51a94da548ce?w=400&h=400&fit=crop",
    isFreeShipping: true,
  },
  {
    id: 2,
    name: "หม้อข้าวไฟฟ้า 1.8 ลิตร ผิวต้านติด",
    price: 590,
    originalPrice: 1190,
    discount: 50,
    rating: 4.7,
    reviews: 345,
    image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=400&fit=crop",
    isFreeShipping: true,
  },
  {
    id: 3,
    name: "เครื่องปั่นน้ำผลไม้ ความจุ 1.5L",
    price: 890,
    originalPrice: 1780,
    discount: 50,
    rating: 4.5,
    reviews: 167,
    image: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=400&h=400&fit=crop",
    isFreeShipping: true,
  },
  {
    id: 4,
    name: "ลำโพงบลูทูธ กันน้ำ เสียงใส 360 องศา",
    price: 799,
    originalPrice: 1598,
    discount: 50,
    rating: 4.8,
    reviews: 456,
    image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=400&h=400&fit=crop",
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