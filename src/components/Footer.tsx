import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-muted/50 text-muted-foreground pt-12 pb-6">
      <div className="container mx-auto px-4">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company info */}
          <div>
            <div className="text-primary font-bold text-xl mb-4">ไทยช็อป</div>
            <p className="text-sm mb-4">
              แพลตฟอร์มอีคอมเมิร์ซชั้นนำของไทย ให้คุณช็อปสินค้าคุณภาพในราคาดี
            </p>
            <div className="flex gap-3">
              <Facebook className="h-5 w-5 hover:text-primary cursor-pointer" />
              <Instagram className="h-5 w-5 hover:text-primary cursor-pointer" />
              <Twitter className="h-5 w-5 hover:text-primary cursor-pointer" />
              <Youtube className="h-5 w-5 hover:text-primary cursor-pointer" />
            </div>
          </div>

          {/* Customer service */}
          <div>
            <h3 className="font-semibold mb-4">ฝ่ายบริการลูกค้า</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-primary">ศูนย์ช่วยเหลือ</a></li>
              <li><a href="#" className="hover:text-primary">วิธีการซื้อ</a></li>
              <li><a href="#" className="hover:text-primary">วิธีการขาย</a></li>
              <li><a href="#" className="hover:text-primary">ข้อกำหนดและเงื่อนไข</a></li>
              <li><a href="#" className="hover:text-primary">นโยบายความเป็นส่วนตัว</a></li>
            </ul>
          </div>

          {/* About us */}
          <div>
            <h3 className="font-semibold mb-4">เกี่ยวกับเรา</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-primary">เกี่ยวกับ ไทยช็อป</a></li>
              <li><a href="#" className="hover:text-primary">งานกับเรา</a></li>
              <li><a href="#" className="hover:text-primary">ข่าวสาร</a></li>
              <li><a href="#" className="hover:text-primary">นักลงทุนสัมพันธ์</a></li>
              <li><a href="#" className="hover:text-primary">ความรับผิดชอบต่อสังคม</a></li>
            </ul>
          </div>

          {/* Payment & shipping */}
          <div>
            <h3 className="font-semibold mb-4">การชำระเงิน</h3>
            <div className="grid grid-cols-3 gap-2 mb-4">
              <div className="bg-white p-2 rounded border text-xs text-center">VISA</div>
              <div className="bg-white p-2 rounded border text-xs text-center">MC</div>
              <div className="bg-white p-2 rounded border text-xs text-center">JCB</div>
              <div className="bg-white p-2 rounded border text-xs text-center">พร้อมเพย์</div>
              <div className="bg-white p-2 rounded border text-xs text-center">TrueMoney</div>
              <div className="bg-white p-2 rounded border text-xs text-center">เก็บปลายทาง</div>
            </div>
            <h3 className="font-semibold mb-2">การขนส่ง</h3>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-white p-2 rounded border text-xs text-center">Kerry</div>
              <div className="bg-white p-2 rounded border text-xs text-center">Thailand Post</div>
              <div className="bg-white p-2 rounded border text-xs text-center">Flash Express</div>
              <div className="bg-white p-2 rounded border text-xs text-center">J&T Express</div>
            </div>
          </div>
        </div>

        {/* Bottom footer */}
        <div className="border-t pt-6 flex flex-col md:flex-row justify-between items-center text-sm">
          <div className="mb-4 md:mb-0">
            © 2024 ไทยช็อป สงวนลิขสิทธิ์
          </div>
          <div className="flex gap-4">
            <span>ประเทศไทย</span>
            <span>|</span>
            <span>ภาษาไทย</span>
          </div>
        </div>
      </div>
    </footer>
  );
};