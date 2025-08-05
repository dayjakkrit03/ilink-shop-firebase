import { Search, ShoppingCart, User, Menu, Bell, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface HeaderProps {
  onCartClick?: () => void;
}

export const Header = ({ onCartClick }: HeaderProps) => {
  return <header className="bg-gradient-primary text-primary-foreground shadow-header sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-primary/90 text-xs py-1 hidden md:block">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span>ร้านค้าของเรา</span>
            <span>ดาวน์โหลดแคตาล็อก</span>
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
        <div className="flex items-center gap-4 lg:gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2 lg:gap-3">
            <img src="/lovable-uploads/445c1f0e-86bc-45a1-a47c-fe9bd739d132.png" alt="Interlink Logo" className="h-8 lg:h-10 w-auto" />
            <div className="text-white font-bold text-lg lg:text-xl drop-shadow-lg hidden sm:block" style={{
            textShadow: '2px 2px 4px rgba(0,0,0,0.8)'
          }}>
              Interlink Shop
            </div>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-2xl">
            <div className="relative flex items-center">
              <Input placeholder="ค้นหาสินค้า..." className="w-full pl-4 pr-12 py-2 lg:py-3 text-foreground bg-white border-0 focus:ring-2 focus:ring-white/50 h-10 lg:h-12 text-sm lg:text-base" />
              <Button size="sm" className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-secondary hover:bg-secondary/90 h-8 w-8 lg:h-10 lg:w-10 p-0">
                <Search className="h-3 w-3 lg:h-4 lg:w-4" />
              </Button>
            </div>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2 lg:gap-4">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 hidden md:flex">
              <Bell className="h-4 w-4 lg:h-5 lg:w-5" />
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 hidden sm:flex">
              <User className="h-4 w-4 lg:h-5 lg:w-5" />
            </Button>
            <Button variant="cart" size="sm" className="relative" onClick={onCartClick}>
              <ShoppingCart className="h-4 w-4 lg:h-5 lg:w-5" />
              <span className="absolute -top-1 -right-1 lg:-top-2 lg:-right-2 bg-sale text-sale-foreground text-xs rounded-full w-4 h-4 lg:w-5 lg:h-5 flex items-center justify-center">
                0
              </span>
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white text-primary border-t border-primary/10">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 md:gap-4 lg:gap-8 py-3 text-sm">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10 shrink-0">
                  <Menu className="h-4 w-4 mr-1" />
                  <span className="hidden sm:inline">หมวดหมู่สินค้า</span>
                  <span className="sm:hidden text-xs">หมวดหมู่</span>
                  <ChevronDown className="h-3 w-3 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64 bg-white shadow-lg border border-primary/10 z-50">
                <DropdownMenuItem className="text-primary hover:bg-primary/10 cursor-pointer">
                  LAN (UTP) System
                </DropdownMenuItem>
                <DropdownMenuItem className="text-primary hover:bg-primary/10 cursor-pointer">
                  FIBER OPTIC System
                </DropdownMenuItem>
                <DropdownMenuItem className="text-primary hover:bg-primary/10 cursor-pointer">
                  FTTR/FTTx OVAL / FLAT CABLE
                </DropdownMenuItem>
                <DropdownMenuItem className="text-primary hover:bg-primary/10 cursor-pointer">
                  DATA CENTER System
                </DropdownMenuItem>
                <DropdownMenuItem className="text-primary hover:bg-primary/10 cursor-pointer">
                  COAXIAL (RG) System
                </DropdownMenuItem>
                <DropdownMenuItem className="text-primary hover:bg-primary/10 cursor-pointer">
                  Telephone CABLE
                </DropdownMenuItem>
                <DropdownMenuItem className="text-primary hover:bg-primary/10 cursor-pointer">
                  SOLAR CABLE
                </DropdownMenuItem>
                <DropdownMenuItem className="text-primary hover:bg-primary/10 cursor-pointer">
                  SECURITY AND CONTROL System
                </DropdownMenuItem>
                <DropdownMenuItem className="text-primary hover:bg-primary/10 cursor-pointer">
                  NETWORKING System
                </DropdownMenuItem>
                <DropdownMenuItem className="text-primary hover:bg-primary/10 cursor-pointer">
                  GERMANY RACK
                </DropdownMenuItem>
                <DropdownMenuItem className="text-primary hover:bg-primary/10 cursor-pointer">
                  CCTV OUTDOOR CABINET
                </DropdownMenuItem>
                <DropdownMenuItem className="text-primary hover:bg-primary/10 cursor-pointer">
                  LINK RACK
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="hidden xl:flex items-center gap-6">
              <a href="#" className="hover:text-primary/80 transition-colors whitespace-nowrap text-sm">LAN (UTP)</a>
              <a href="#" className="hover:text-primary/80 transition-colors whitespace-nowrap text-sm">FIBER OPTIC</a>
              <a href="#" className="hover:text-primary/80 transition-colors whitespace-nowrap text-sm">DATA CENTER</a>
              <a href="#" className="hover:text-primary/80 transition-colors whitespace-nowrap text-sm">COAXIAL (RG)</a>
              <a href="#" className="hover:text-primary/80 transition-colors whitespace-nowrap text-sm">NETWORKING</a>
            </div>
            <div className="hidden lg:flex xl:hidden items-center gap-4">
              <a href="#" className="hover:text-primary/80 transition-colors whitespace-nowrap text-sm">LAN</a>
              <a href="#" className="hover:text-primary/80 transition-colors whitespace-nowrap text-sm">FIBER</a>
              <a href="#" className="hover:text-primary/80 transition-colors whitespace-nowrap text-sm">DATA CENTER</a>
              <a href="#" className="hover:text-primary/80 transition-colors whitespace-nowrap text-sm">NETWORKING</a>
            </div>
            <span className="text-sale font-semibold ml-auto shrink-0 text-xs sm:text-sm">Clearance Sale ลดสูงสุด 90%</span>
          </nav>
        </div>
      </div>
    </header>;
};