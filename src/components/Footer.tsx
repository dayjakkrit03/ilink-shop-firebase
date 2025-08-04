import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-secondary to-secondary/80 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Company info */}
          <div>
            <div className="text-white font-bold text-2xl mb-4 flex items-center gap-2">
              <img 
                src="/lovable-uploads/445c1f0e-86bc-45a1-a47c-fe9bd739d132.png" 
                alt="Interlink Logo" 
                className="h-8 w-auto"
              />
              Interlink Shop
            </div>
            <p className="text-white/80 mb-6 leading-relaxed">
              ผู้จำหน่ายอุปกรณ์เครือข่ายชั้นนำของไทย พร้อมให้บริการลูกค้าด้วยสินค้าคุณภาพสูง
            </p>
            <div className="flex gap-4">
              <Facebook className="h-6 w-6 hover:text-accent cursor-pointer transition-colors duration-300 hover:scale-110" />
              <Instagram className="h-6 w-6 hover:text-accent cursor-pointer transition-colors duration-300 hover:scale-110" />
              <Twitter className="h-6 w-6 hover:text-accent cursor-pointer transition-colors duration-300 hover:scale-110" />
              <Youtube className="h-6 w-6 hover:text-accent cursor-pointer transition-colors duration-300 hover:scale-110" />
            </div>
          </div>

          {/* Customer service */}
          <div>
            <h3 className="font-semibold mb-6 text-white text-lg">ฝ่ายบริการลูกค้า</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-accent transition-colors duration-300 text-white/80 hover:text-white">ศูนย์ช่วยเหลือ</a></li>
              <li><a href="#" className="hover:text-accent transition-colors duration-300 text-white/80 hover:text-white">วิธีการซื้อ</a></li>
              <li><a href="#" className="hover:text-accent transition-colors duration-300 text-white/80 hover:text-white">การชำระเงิน</a></li>
              <li><a href="#" className="hover:text-accent transition-colors duration-300 text-white/80 hover:text-white">ข้อกำหนดและเงื่อนไข</a></li>
              <li><a href="#" className="hover:text-accent transition-colors duration-300 text-white/80 hover:text-white">นโยบายความเป็นส่วนตัว</a></li>
            </ul>
          </div>

          {/* About us */}
          <div>
            <h3 className="font-semibold mb-6 text-white text-lg">เกี่ยวกับเรา</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-accent transition-colors duration-300 text-white/80 hover:text-white">เกี่ยวกับ Interlink</a></li>
              <li><a href="#" className="hover:text-accent transition-colors duration-300 text-white/80 hover:text-white">งานกับเรา</a></li>
              <li><a href="#" className="hover:text-accent transition-colors duration-300 text-white/80 hover:text-white">ข่าวสาร</a></li>
              <li><a href="#" className="hover:text-accent transition-colors duration-300 text-white/80 hover:text-white">บทความเทคนิค</a></li>
              <li><a href="#" className="hover:text-accent transition-colors duration-300 text-white/80 hover:text-white">ติดต่อเรา</a></li>
            </ul>
          </div>

          {/* Payment & shipping */}
          <div>
            <h3 className="font-semibold mb-6 text-white text-lg">การชำระเงิน</h3>
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg border border-white/20 text-xs text-center text-white font-medium hover:bg-white/20 transition-colors">VISA</div>
              <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg border border-white/20 text-xs text-center text-white font-medium hover:bg-white/20 transition-colors">MC</div>
              <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg border border-white/20 text-xs text-center text-white font-medium hover:bg-white/20 transition-colors">JCB</div>
              <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg border border-white/20 text-xs text-center text-white font-medium hover:bg-white/20 transition-colors">พร้อมเพย์</div>
              <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg border border-white/20 text-xs text-center text-white font-medium hover:bg-white/20 transition-colors">TrueMoney</div>
              <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg border border-white/20 text-xs text-center text-white font-medium hover:bg-white/20 transition-colors">เก็บปลายทาง</div>
            </div>
            <h3 className="font-semibold mb-4 text-white text-lg">การขนส่ง</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg border border-white/20 text-xs text-center text-white font-medium hover:bg-white/20 transition-colors">Kerry</div>
              <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg border border-white/20 text-xs text-center text-white font-medium hover:bg-white/20 transition-colors">Thailand Post</div>
              <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg border border-white/20 text-xs text-center text-white font-medium hover:bg-white/20 transition-colors">Flash Express</div>
              <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg border border-white/20 text-xs text-center text-white font-medium hover:bg-white/20 transition-colors">J&T Express</div>
            </div>
          </div>
        </div>

        {/* Bottom footer */}
        <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
          <div className="mb-4 md:mb-0 text-white/80">
            © 2024 Interlink Shop สงวนลิขสิทธิ์
          </div>
          <div className="flex gap-6 text-white/80">
            <span className="hover:text-white transition-colors cursor-pointer">ประเทศไทย</span>
            <span>|</span>
            <span className="hover:text-white transition-colors cursor-pointer">ภาษาไทย</span>
          </div>
        </div>
      </div>
    </footer>
  );
};