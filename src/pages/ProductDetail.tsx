import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Star, Heart, Share2, ShoppingCart, Plus, Minus, Shield, Truck, RotateCcw, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ShoppingCart as ShoppingCartComponent } from "@/components/ShoppingCart";
import { MessageChat } from "@/components/MessageChat";
import lanCable1 from "@/assets/lan-cable-1.jpg";
import lanCable2 from "@/assets/lan-cable-2.jpg";
import lanCable3 from "@/assets/lan-cable-3.jpg";
import lanCable4 from "@/assets/lan-cable-4.jpg";
import lanCable5 from "@/assets/lan-cable-5.jpg";

// Mock product data (ในการใช้งานจริงจะดึงจาก API โดยใช้ id)
const mockProduct = {
  id: 1,
  name: "CAT 6 UTP (250 MHz) w/Cross Filler, 24 AWG, CM , UL Blue 305 M./Reelex",
  price: 2390,
  originalPrice: 2990,
  discount: 20,
  rating: 4.5,
  reviews: 128,
  stock: 15,
  brand: "Kingston",
  model: "KF432C16BBK2/16",
  images: [
    lanCable1,
    lanCable2,
    lanCable3,
    lanCable4,
    lanCable5
  ],
  description: "Kingston FURY Beast DDR4 delivers the reliable high-performance needed to power desktops with the latest AMD and Intel CPUs. The aggressive look with bold heat spreaders will level up the look of your rig.",
  specifications: {
    "Memory Type": "DDR4",
    "Capacity": "16GB (2x8GB)",
    "Speed": "3200MHz",
    "CAS Latency": "CL16",
    "Voltage": "1.35V",
    "Form Factor": "DIMM",
    "Pin Configuration": "288-pin"
  },
  features: [
    "Intel XMP Ready",
    "Plug N Play functionality",
    "Aggressive styling with bold heat spreaders", 
    "Available in multiple speeds"
  ]
};

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [showZoom, setShowZoom] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });

  const product = mockProduct; // ในการใช้งานจริงจะใช้ id เพื่อดึงข้อมูลสินค้า

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  const handleMouseEnterImage = (e: React.MouseEvent<HTMLImageElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
    setShowZoom(true);
  };

  const handleMouseMoveImage = (e: React.MouseEvent<HTMLImageElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
  };

  const handleMouseLeaveImage = () => {
    setShowZoom(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onCartClick={() => setIsCartVisible(true)} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-muted-foreground mb-8">
          <span 
            className="hover:text-primary cursor-pointer" 
            onClick={() => navigate('/')}
          >
            หน้าแรก
          </span>
          <span className="mx-2">/</span>
          <span 
            className="hover:text-primary cursor-pointer"
            onClick={() => navigate('/products')}
          >
            สินค้า
          </span>
          <span className="mx-2">/</span>
          <span className="text-primary">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-5 gap-12 mb-12">
          {/* Product Images */}
          <div className="lg:col-span-2 space-y-4 relative">
            <div className="aspect-square bg-muted/30 rounded-lg overflow-hidden relative">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover cursor-zoom-in"
                onMouseEnter={handleMouseEnterImage}
                onMouseMove={handleMouseMoveImage}
                onMouseLeave={handleMouseLeaveImage}
              />
              {showZoom && (
                <div className="absolute inset-0 pointer-events-none">
                  <ZoomIn className="absolute top-4 right-4 h-6 w-6 text-white/80" />
                </div>
              )}
            </div>
            
            {/* Zoom overlay */}
            {showZoom && (
              <div 
                className="absolute top-0 left-full ml-4 w-96 h-96 bg-white rounded-lg shadow-xl border overflow-hidden z-50"
                style={{
                  backgroundImage: `url(${product.images[selectedImage]})`,
                  backgroundSize: '200%',
                  backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                  backgroundRepeat: 'no-repeat'
                }}
              />
            )}

            {/* Thumbnail Carousel */}
            <div className="max-w-md mx-auto">
              <Carousel className="w-full">
                <CarouselContent className="-ml-2">
                  {product.images.map((image, index) => (
                    <CarouselItem key={index} className="pl-2 basis-1/4">
                      <button
                        onMouseEnter={() => setSelectedImage(index)}
                        className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors w-full ${
                          selectedImage === index 
                            ? 'border-primary' 
                            : 'border-muted hover:border-primary/50'
                        }`}
                      >
                        <img
                          src={image}
                          alt={`${product.name} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-0" />
                <CarouselNext className="right-0" />
              </Carousel>
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:col-span-3 space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <p className="text-muted-foreground">Brand: {product.brand} | Model: {product.model}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating)
                        ? "text-warning fill-current"
                        : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="ml-2 text-lg font-medium">{product.rating}</span>
              </div>
              <Separator orientation="vertical" className="h-6" />
              <span className="text-muted-foreground">{product.reviews} รีวิว</span>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-sale">
                  ฿{product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through">
                    ฿{product.originalPrice.toLocaleString()}
                  </span>
                )}
                {product.discount && (
                  <Badge className="bg-sale text-sale-foreground text-sm px-3 py-1">
                    ประหยัด {product.discount}%
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground">รวม VAT แล้ว</p>
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span className="text-success font-medium">มีสินค้าในสต็อก ({product.stock} ชิ้น)</span>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="font-medium">จำนวน:</span>
                <div className="flex items-center border rounded-lg">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="h-10 w-10 p-0"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="px-4 py-2 min-w-[3rem] text-center">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= product.stock}
                    className="h-10 w-10 p-0"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button 
                  size="lg" 
                  className="flex-1"
                  onClick={() => setIsCartVisible(true)}
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  เพิ่มลงตะกร้า
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setIsLiked(!isLiked)}
                  className={isLiked ? "text-sale border-sale" : ""}
                >
                  <Heart className={`h-5 w-5 ${isLiked ? "fill-current" : ""}`} />
                </Button>
                <Button variant="outline" size="lg">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Service Features */}
            <Card>
              <CardContent className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3">
                    <Truck className="h-5 w-5 text-success" />
                    <div>
                      <p className="font-medium text-sm">ส่งฟรี</p>
                      <p className="text-xs text-muted-foreground">สั่งซื้อขั้นต่ำ 1,000฿</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium text-sm">รับประกัน</p>
                      <p className="text-xs text-muted-foreground">3 ปี</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <RotateCcw className="h-5 w-5 text-warning" />
                    <div>
                      <p className="font-medium text-sm">เปลี่ยน/คืนสินค้า</p>
                      <p className="text-xs text-muted-foreground">ภายใน 7 วัน</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Product Details Tabs */}
        <Tabs defaultValue="description" className="mb-12">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="description">รายละเอียด</TabsTrigger>
            <TabsTrigger value="specifications">สเปค</TabsTrigger>
            <TabsTrigger value="reviews">รีวิว ({product.reviews})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="description" className="space-y-4">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">รายละเอียดสินค้า</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {product.description}
                </p>
                <h4 className="font-semibold mb-3">คุณสมบัติเด่น:</h4>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="specifications">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">สเปคสินค้า</h3>
                <div className="space-y-3">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b border-muted/30">
                      <span className="font-medium">{key}</span>
                      <span className="text-muted-foreground">{value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reviews">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">รีวิวลูกค้า</h3>
                <div className="text-center py-12 text-muted-foreground">
                  <p>ยังไม่มีรีวิวสำหรับสินค้านี้</p>
                  <p className="text-sm mt-2">เป็นคนแรกที่ให้รีวิวสินค้านี้</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
      <ShoppingCartComponent isVisible={isCartVisible} onClose={() => setIsCartVisible(false)} />
      <MessageChat />
    </div>
  );
};

export default ProductDetail;