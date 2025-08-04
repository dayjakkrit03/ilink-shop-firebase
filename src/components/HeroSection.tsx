import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import heroBanner from "@/assets/hero-banner.jpg";

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Main hero banner */}
      <div className="relative h-96 bg-gradient-hero">
        <img 
          src={heroBanner} 
          alt="Hero Banner" 
          className="w-full h-full object-cover mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-secondary/60">
          <div className="container mx-auto px-4 h-full flex items-center">
            <div className="text-white max-w-2xl">
              <Badge className="mb-4 bg-accent text-accent-foreground">
                🔥 เมกะเซล ลดสูงสุด 90%
              </Badge>
              <h1 className="text-5xl font-bold mb-4 leading-tight">
                ช็อปออนไลน์
                <br />
                ง่ายๆ ที่ <span className="text-accent">ไทยช็อป</span>
              </h1>
              <p className="text-xl mb-6 text-white/90">
                ของแท้ 100% ส่งฟรี ทั่วไทย ส่งไว ถึงมือใน 24 ชม.
              </p>
              <div className="flex gap-4">
                <Button size="lg" variant="secondary" className="text-lg px-8">
                  เริ่มช็อปเลย
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8 border-white text-white hover:bg-white hover:text-primary">
                  ดาวน์โหลดแอป
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Promotion banners */}
      <div className="bg-background py-4">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-r from-sale to-sale/80 text-sale-foreground p-4 rounded-lg flex items-center justify-between">
              <div>
                <h3 className="font-bold">ส่งฟรี</h3>
                <p className="text-sm">ซื้อครบ 299 บาท</p>
              </div>
              <div className="text-2xl">🚚</div>
            </div>
            <div className="bg-gradient-to-r from-success to-success/80 text-success-foreground p-4 rounded-lg flex items-center justify-between">
              <div>
                <h3 className="font-bold">เก็บเงินปลายทาง</h3>
                <p className="text-sm">ปลอดภัย 100%</p>
              </div>
              <div className="text-2xl">💰</div>
            </div>
            <div className="bg-gradient-to-r from-warning to-warning/80 text-warning-foreground p-4 rounded-lg flex items-center justify-between">
              <div>
                <h3 className="font-bold">รับประกัน</h3>
                <p className="text-sm">สินค้าของแท้</p>
              </div>
              <div className="text-2xl">✅</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};