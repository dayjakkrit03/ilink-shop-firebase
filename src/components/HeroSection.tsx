import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import heroBanner from "@/assets/hero-banner.jpg";
export const HeroSection = () => {
  const navigate = useNavigate();

  const handleClearanceSaleClick = () => {
    navigate('/products?search=Clearance Sale');
  };
  return <section className="relative overflow-hidden">
      {/* Main hero banner */}
      <div className="relative h-[320px] lg:h-[400px] bg-gradient-hero">
        <img src={heroBanner} alt="Hero Banner" className="w-full h-full object-cover mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/60 to-secondary/60">
          <div className="container mx-auto px-4 h-full flex items-center">
            <div className="text-white w-full animate-slide-up">
              <Badge 
                className="mb-3 sm:mb-6 bg-sale/90 text-sale-foreground text-xs sm:text-sm px-3 sm:px-4 py-1 sm:py-2 animate-bounce-gentle shadow-glow cursor-pointer hover:bg-sale hover:scale-105 transition-all duration-200" 
                onClick={handleClearanceSaleClick}
              >
                🔥 Clearance Sale ลดสูงสุด 90%
              </Badge>
              <h1 className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-3 sm:mb-6 leading-tight">
                ช็อปออนไลน์
                <br />
                ง่ายๆ ที่ <span className="text-accent animate-float inline-block">Interlink</span>
              </h1>
              <p className="text-sm sm:text-lg md:text-xl lg:text-2xl mb-4 sm:mb-8 text-white/90">
                อุปกรณ์เครือข่ายคุณภาพสูง ส่งฟรี ทั่วไทย ส่งไว ถึงมือใน 24 ชม.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Button size="sm" className="text-sm sm:text-lg px-4 sm:px-8 py-2 sm:py-4 shadow-glow transition-spring hover:scale-105 bg-orange-500 hover:bg-orange-600 text-white sm:size-lg">
                  เริ่มช็อปเลย
                </Button>
                <Button size="sm" variant="outline" className="text-sm sm:text-lg px-4 sm:px-8 py-2 sm:py-4 border border-white sm:border-2 bg-white/10 text-white hover:bg-white hover:text-primary transition-spring hover:scale-105 sm:size-lg">
                  ดูแคตตาล็อก
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Promotion banners */}
      <div className="bg-gradient-subtle py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-r from-sale to-sale/80 text-sale-foreground p-6 rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300 hover:scale-105 group">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-lg mb-1">ส่งฟรี</h3>
                  <p className="text-sm opacity-90">ซื้อครบ 2,999 บาท</p>
                </div>
                <div className="text-3xl group-hover:animate-bounce-gentle">🚚</div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-success to-success/80 text-success-foreground p-6 rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300 hover:scale-105 group">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-lg mb-1">เก็บเงินปลายทาง</h3>
                  <p className="text-sm opacity-90">ปลอดภัย 100%</p>
                </div>
                <div className="text-3xl group-hover:animate-bounce-gentle">💰</div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-warning to-warning/80 text-warning-foreground p-6 rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300 hover:scale-105 group">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-lg mb-1">รับประกัน</h3>
                  <p className="text-sm opacity-90">สินค้าของแท้</p>
                </div>
                <div className="text-3xl group-hover:animate-bounce-gentle">✅</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};