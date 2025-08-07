import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductGrid } from "@/components/ProductGrid";
import { ShoppingCart } from "@/components/ShoppingCart";
import { MessageChat } from "@/components/MessageChat";
import { ProductFilters } from "@/components/ProductFilters";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Grid3X3, List, ChevronLeft, ChevronRight } from "lucide-react";

const ProductListing = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("best-match");
  const [currentPage, setCurrentPage] = useState(1);
  
  const category = searchParams.get("category") || "";
  const search = searchParams.get("search") || "";
  const cartItemCount = 4;

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Mock data for demonstration
  const totalItems = 2552;
  const itemsPerPage = 24;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const mockProducts = [
    {
      id: 1,
      name: "Ethernet Wallplate HD Multimedia Network Wall Plate",
      price: 221.00,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=300&h=300&fit=crop",
      rating: 4.5,
      reviews: 128,
      discount: null,
      isInterlinkMall: true,
      badge: "InterlinkMall"
    },
    {
      id: 2,
      name: "Wall Plate Professional TV & Network Wallplate for Home",
      price: 231.00,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=300&h=300&fit=crop",
      rating: 4.3,
      reviews: 95,
      discount: null,
      isFreeShipping: true,
      badge: "InterlinkMall"
    },
    {
      id: 3,
      name: "Starlink Standard kit v4 Gen 3",
      price: 20000.00,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=300&h=300&fit=crop",
      rating: 4.8,
      reviews: 234,
      discount: null,
      badge: "สินค้าแนะนำ"
    },
    {
      id: 4,
      name: "Starlink mini",
      price: 19000.00,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&h=300&fit=crop",
      rating: 4.6,
      reviews: 156,
      discount: null,
      badge: "สินค้าแนะนำ"
    },
    {
      id: 5,
      name: "imou HR12F มาตรฐาน1วัน AC1200 Dual-Band Wi-Fi Router By Vika",
      price: 390.00,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=300&h=300&fit=crop",
      rating: 4.2,
      reviews: 67,
      discount: null,
      badge: null
    },
    {
      id: 6,
      name: "10M/100M/1000Mbps Network Card Gigabit Ethernet PCI Express",
      price: 87.18,
      originalPrice: 174.36,
      image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334?w=300&h=300&fit=crop",
      rating: 4.4,
      reviews: 89,
      discount: 50,
      isClearanceSale: true,
      badge: "Clearance Sale"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header onCartClick={() => setIsCartOpen(true)} cartItemCount={cartItemCount} />
      
      <div className="container mx-auto px-2 sm:px-4 py-6">
        {/* Breadcrumb */}
        <nav className="text-sm text-muted-foreground mb-4">
          <span className="cursor-pointer hover:text-primary transition-colors" onClick={() => navigate('/')}>หน้าแรก</span>
          {category && (
            <>
              <span className="mx-2">/</span>
              <span className="text-primary font-medium">{category}</span>
            </>
          )}
          {search && (
            <>
              <span className="mx-2">/</span>
              <span className="text-primary font-medium">ค้นหา: "{search}"</span>
            </>
          )}
        </nav>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar */}
          <div className="w-full lg:w-64 lg:shrink-0 hidden lg:block">
            <ProductFilters />
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Header */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold mb-2">
                {category || search || "Network Components"}
              </h1>
              <p className="text-muted-foreground">
                {totalItems.toLocaleString()} items found {category && `for "${category}"`}
                {search && `for "${search}"`}
              </p>
            </div>

            {/* Sort and View Options */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b gap-2">
              <div className="flex items-center gap-2 sm:gap-4">
                <span className="text-xs sm:text-sm text-muted-foreground">Sort By:</span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-32 sm:w-40 text-xs sm:text-sm h-8 sm:h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="best-match">Best Match</SelectItem>
                    <SelectItem value="price-low">Price Low to High</SelectItem>
                    <SelectItem value="price-high">Price High to Low</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="rating">Top Rated</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-1 sm:gap-2">
                <span className="text-xs sm:text-sm text-muted-foreground hidden sm:inline">View:</span>
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="h-8 w-8 sm:h-9 sm:w-9 p-0"
                >
                  <Grid3X3 className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="h-8 w-8 sm:h-9 sm:w-9 p-0"
                >
                  <List className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              </div>
            </div>

            {/* Products Grid */}
            <div className={`grid mb-8 ${
              viewMode === "grid" 
                ? "grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6" 
                : "grid-cols-1 gap-4"
            }`}>
              {mockProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  originalPrice={product.originalPrice}
                  discount={product.discount}
                  rating={product.rating}
                  reviews={product.reviews}
                  image={product.image}
                  isFreeShipping={product.isFreeShipping}
                  isInterlinkMall={product.isInterlinkMall}
                  isClearanceSale={product.isClearanceSale}
                />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-1 sm:gap-2 flex-wrap">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                className="text-xs sm:text-sm px-2 sm:px-3"
              >
                <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
              
              {/* Show fewer pages on mobile */}
              <div className="flex gap-1 sm:gap-2">
                {(window.innerWidth < 640 ? [1, 2, 3] : [1, 2, 3, 4, 5]).map((page) => (
                  <Button
                    key={page}
                    variant={page === currentPage ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className="text-xs sm:text-sm px-2 sm:px-3 min-w-[32px] sm:min-w-[36px]"
                  >
                    {page}
                  </Button>
                ))}
              </div>
              
              <span className="text-xs sm:text-sm text-muted-foreground mx-1 sm:mx-2">...</span>
              <Button 
                variant="outline" 
                size="sm"
                className="text-xs sm:text-sm px-2 sm:px-3 min-w-[32px] sm:min-w-[36px]"
              >
                64
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
                className="text-xs sm:text-sm px-2 sm:px-3"
              >
                <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <ShoppingCart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <MessageChat />
    </div>
  );
};

export default ProductListing;