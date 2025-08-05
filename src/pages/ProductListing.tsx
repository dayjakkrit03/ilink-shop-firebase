import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductGrid } from "@/components/ProductGrid";
import { ShoppingCart } from "@/components/ShoppingCart";
import { MessageChat } from "@/components/MessageChat";
import { ProductFilters } from "@/components/ProductFilters";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Grid3X3, List, ChevronLeft, ChevronRight } from "lucide-react";

const ProductListing = () => {
  const [searchParams] = useSearchParams();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("best-match");
  const [currentPage, setCurrentPage] = useState(1);
  
  const category = searchParams.get("category") || "";
  const search = searchParams.get("search") || "";
  const cartItemCount = 4;

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
      badge: "LazMall"
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
      badge: "LazMall"
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
      badge: null
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
      badge: null
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
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334?w=300&h=300&fit=crop",
      rating: 4.4,
      reviews: 89,
      discount: 50,
      badge: "LazMall"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header onCartClick={() => setIsCartOpen(true)} cartItemCount={cartItemCount} />
      
      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav className="text-sm text-muted-foreground mb-4">
          <span>หน้าแรก</span>
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

        <div className="flex gap-6">
          {/* Filters Sidebar */}
          <div className="w-64 shrink-0 hidden lg:block">
            <ProductFilters />
          </div>

          {/* Main Content */}
          <div className="flex-1">
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
            <div className="flex items-center justify-between mb-6 pb-4 border-b">
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">Sort By:</span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
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

              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">View:</span>
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Products Grid */}
            <div className={`grid gap-4 mb-8 ${
              viewMode === "grid" 
                ? "grid-cols-2 md:grid-cols-3 xl:grid-cols-4" 
                : "grid-cols-1"
            }`}>
              {mockProducts.map((product) => (
                <div key={product.id} className="bg-card rounded-lg border p-4 hover:shadow-md transition-shadow">
                  <div className="relative mb-3">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-48 object-cover rounded-md"
                    />
                    {product.badge && (
                      <span className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
                        {product.badge}
                      </span>
                    )}
                    {product.discount && (
                      <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                        -{product.discount}%
                      </span>
                    )}
                  </div>
                  <h3 className="font-medium text-sm mb-2 line-clamp-2 min-h-[2.5rem]">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-1 mb-2">
                    <div className="flex text-yellow-400 text-sm">
                      {"★".repeat(Math.floor(product.rating))}
                      {"☆".repeat(5 - Math.floor(product.rating))}
                    </div>
                    <span className="text-xs text-muted-foreground">({product.reviews})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-primary">
                      ฿{product.price.toLocaleString()}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        ฿{product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              {[1, 2, 3, 4, 5].map((page) => (
                <Button
                  key={page}
                  variant={page === currentPage ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </Button>
              ))}
              
              <span className="text-sm text-muted-foreground mx-2">...</span>
              <Button variant="outline" size="sm">64</Button>
              
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                <ChevronRight className="h-4 w-4" />
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