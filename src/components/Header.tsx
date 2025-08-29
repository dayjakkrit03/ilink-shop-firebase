
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Search, ShoppingCart, User, Menu, Bell, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCategories } from "@/hooks/useCategories";
import { DynamicLinkComponents } from "./DynamicLinkComponents"; 
import { CategoryDropdown } from "./CategoryDropdown"; // Import the new dropdown component

interface HeaderProps {
  onCartClick?: () => void;
  cartItemCount?: number;
}

export const Header = ({
  onCartClick,
  cartItemCount = 0
}: HeaderProps) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const { categories, loading, error } = useCategories();

  useEffect(() => {
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    if (category) {
      setSearchTerm(category);
    } else if (search) {
      setSearchTerm(search);
    } else {
      setSearchTerm("");
    }
  }, [searchParams]);

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const handleCategoryClick = (category: string) => {
    setSearchTerm(category);
    navigate(`/products?category=${encodeURIComponent(category)}`);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  
  const handleClearanceSaleClick = () => {
    navigate('/products?search=Clearance Sale');
  };

  return <header className="bg-gradient-primary text-primary-foreground shadow-header sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-primary/90 text-xs py-1 hidden md:block">
          <div className="container mx-auto px-4 flex justify-between items-center">
              <div className="flex items-center gap-4">
                  <span className="cursor-pointer hover:text-white/80 transition-colors" onClick={() => navigate('/')}>หน้าแรก</span>
                  <span>ร้านค้าของเรา</span>
                  <span>ดาวน์โหลดแคตาล็อก</span>
                  <span>ติดตาม</span>
              </div>
              <div className="flex items-center gap-4">
                  <span>แจ้งเตือน</span>
                  <span>ช่วยเหลือ</span>
                  <span>ภาษาไทย</span>
                  <span>เข้าสู่ระบบ</span>
                  <span>สมัครใหม่</span>
              </div>
          </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4 lg:gap-6">
              <div className="flex items-center gap-2 lg:gap-3 cursor-pointer" onClick={() => navigate('/')}>
                  <img src="/lovable-uploads/445c1f0e-86bc-45a1-a47c-fe9bd739d132.png" alt="Interlink Logo" className="h-8 lg:h-10 w-auto hover:scale-105 transition-transform" />
                  <div className="text-white font-bold text-lg lg:text-xl drop-shadow-lg hidden sm:block hover:text-white/90 transition-colors" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
                      Interlink Shop
                  </div>
              </div>
              <div className="flex-1 max-w-2xl">
                  <div className="relative flex items-center">
                      <Input placeholder="ค้นหาสินค้า..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} onKeyPress={handleKeyPress} className="w-full pl-4 pr-12 py-2 lg:py-3 text-foreground bg-white border-0 focus:ring-2 focus:ring-white/50 h-10 lg:h-12 text-sm lg:text-base" />
                      <Button size="sm" onClick={handleSearch} className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-secondary hover:bg-secondary/90 h-8 w-8 lg:h-10 lg:w-10 p-0">
                          <Search className="h-3 w-3 lg:h-4 lg:w-4" />
                      </Button>
                  </div>
              </div>
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
                          {cartItemCount}
                      </span>
                  </Button>
              </div>
          </div>
      </div>

      {/* Navigation */}
      <div className="bg-white text-primary border-t border-primary/10">
          <div className="container mx-auto px-4">
              <nav className="flex items-center gap-2 md:gap-4 lg:gap-8 py-3 text-sm">
                  
                  {/* Use the new CategoryDropdown component */}
                  <CategoryDropdown 
                    categories={categories} 
                    loading={loading} 
                    error={error} 
                    onCategoryClick={handleCategoryClick} 
                  />
                  
                  {/* Use the DynamicLinkComponents for nav links */}
                  <DynamicLinkComponents categories={categories} onCategoryClick={handleCategoryClick} />
                  
                  <span className="text-sale font-semibold ml-auto shrink-0 text-xs sm:text-sm cursor-pointer hover:text-sale/80 transition-colors" onClick={handleClearanceSaleClick}>
                      Clearance Sale ลดสูงสุด 90%
                  </span>
              </nav>
          </div>
      </div>
  </header>;
};
