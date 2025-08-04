import { Search, ShoppingCart, User, Menu, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Header = () => {
  return (
    <header className="bg-gradient-primary text-primary-foreground shadow-header sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-primary/90 text-xs py-1">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span>ขายของกับเรา</span>
            <span>ดาวน์โหลดแอป</span>
            <span>ติดตาม</span>
          </div>
          <div className="flex items-center gap-4">
            <span>แจ้งเตือน</span>
            <span>ช่วยเหลือ</span>
            <span>ภาษาไทย</span>
            <span>เข้าสู่ระบบ</span>
            <span>สมัครสมาชิก</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img 
              src="/lovable-uploads/445c1f0e-86bc-45a1-a47c-fe9bd739d132.png" 
              alt="Interlink Logo" 
              className="h-10 w-auto"
            />
            <div className="text-white font-bold text-xl drop-shadow-lg" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.8)'}}>
              Interlink Shop
            </div>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-2xl">
            <div className="relative flex items-center">
              <Input
                placeholder="ค้นหาสินค้า หมวดหมู่ หรือร้านค้า..."
                className="w-full pl-4 pr-12 py-3 text-foreground bg-white border-0 focus:ring-2 focus:ring-white/50 h-12"
              />
              <Button
                size="sm"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-secondary hover:bg-secondary/90 h-10 w-10 p-0"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
              <User className="h-5 w-5" />
            </Button>
            <Button variant="cart" size="sm" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-2 -right-2 bg-sale text-sale-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white text-primary border-t border-primary/10">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-8 py-3 text-sm">
            <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10">
              <Menu className="h-4 w-4 mr-2" />
              หมวดหมู่สินค้า
            </Button>
            <a href="#" className="hover:text-primary/80 transition-colors">สายเคเบิ้ล</a>
            <a href="#" className="hover:text-primary/80 transition-colors">Router/Switch</a>
            <a href="#" className="hover:text-primary/80 transition-colors">Server/Storage</a>
            <a href="#" className="hover:text-primary/80 transition-colors">Wireless</a>
            <a href="#" className="hover:text-primary/80 transition-colors">Audio/Video</a>
            <a href="#" className="hover:text-primary/80 transition-colors">Network Tools</a>
            <span className="text-sale font-semibold ml-auto">Sale ลดสูงสุด 80%</span>
          </nav>
        </div>
      </div>
    </header>
  );
};