import { useState, useEffect } from "react";
import { ArrowLeft, MapPin, Truck, CreditCard, Wallet } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

// Mock data for checkout items (in real app, this would come from state/props)
const checkoutItems = [
  {
    id: 1,
    name: "Switch 24 Port Gigabit",
    price: 2899,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=100&h=100&fit=crop",
    store: "TechMall Official Store"
  },
  {
    id: 2,
    name: "สายแลน Cat6 UTP Cable 305m",
    price: 1599,
    originalPrice: 1799,
    quantity: 2,
    image: "https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=100&h=100&fit=crop",
    store: "NetworkPro Store",
    discount: "Save ฿200"
  },
  {
    id: 3,
    name: "WiFi Router AC1200",
    price: 1899,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=100&h=100&fit=crop",
    store: "ConnectTech Store"
  }
];

export default function Checkout() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const location = useLocation();
  const [deliveryOption, setDeliveryOption] = useState("standard");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [voucherCode, setVoucherCode] = useState("");

  // Calculate totals
  const subtotal = checkoutItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shippingFee = deliveryOption === "standard" ? 0 : 65;
  const shippingDiscount = 0; // Could be calculated based on voucher
  const total = subtotal + shippingFee - shippingDiscount;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link to="/cart">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">ชำระเงิน</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Checkout Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Address */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <MapPin className="h-5 w-5" />
                  ที่อยู่จัดส่ง
                  <Button variant="ghost" size="sm" className="ml-auto text-primary">
                    แก้ไข
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-orange-50 p-3 rounded border border-orange-200">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded">HOME</span>
                    <span className="font-medium">สิรดา ธำรำ</span>
                    <span className="text-muted-foreground">0863527663</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    สบปิดิ์ ร้ำปี ร่ำวชำกระก๊วยิดส เคลส์ 50/37 ซอย 8 ซิ์ง อ.สิ่ง ลิ. สะหมำเชม/ Saphan Song, 10310, วำงห่องส่ำม/ Wang Thonglang, กรุงเทพมหำนคร/ Bangkok
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Package and Delivery */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Package 1 of 1</CardTitle>
                <p className="text-sm text-muted-foreground">Shipped by การแพตเซอเรวิ</p>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Delivery Options */}
                <div>
                  <h4 className="font-medium mb-3">Choose your delivery option</h4>
                  <RadioGroup value={deliveryOption} onValueChange={setDeliveryOption}>
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="standard" id="standard" />
                        <Label htmlFor="standard" className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="font-medium">฿7.00 Standard</div>
                              <div className="text-sm text-muted-foreground">
                                Guaranteed by 9 Aug. Get ฿25 Cashback if your package arrives late.
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm text-muted-foreground line-through">฿65.00</div>
                              <div className="font-medium">ฟรี</div>
                            </div>
                          </div>
                        </Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                {/* Product Item */}
                <div className="border rounded-lg p-4 bg-muted/30">
                  <div className="flex gap-3">
                    <img 
                      src="https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=80&h=80&fit=crop"
                      alt="Product"
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-sm">กาแฟอำราป้มำ ชำยขำยพ่วม เรน้น 125ml ขิงชิ</h3>
                      <div className="flex justify-between items-center mt-2">
                        <div className="text-orange-600 font-bold">฿99.00</div>
                        <div className="text-sm text-muted-foreground">Qty: 1</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Payment & Summary */}
          <div className="space-y-6">
            {/* Payment Method */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Select payment method</CardTitle>
                <Button variant="ghost" size="sm" className="text-primary self-start p-0 h-auto">
                  View all methods »
                </Button>
              </CardHeader>
              <CardContent className="space-y-3">
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg">
                    <RadioGroupItem value="cod" id="cod" />
                    <Truck className="h-5 w-5 text-blue-500" />
                    <Label htmlFor="cod" className="flex-1">
                      <div className="font-medium">Cash on Delivery</div>
                    </Label>
                    <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 p-3 border rounded-lg opacity-60">
                    <RadioGroupItem value="truemoney" id="truemoney" disabled />
                    <Wallet className="h-5 w-5 text-orange-500" />
                    <Label htmlFor="truemoney" className="flex-1">
                      <div className="font-medium">+66***###639</div>
                      <div className="text-sm text-muted-foreground">TrueMoney</div>
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Voucher */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Voucher</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter Voucher Code"
                    value={voucherCode}
                    onChange={(e) => setVoucherCode(e.target.value)}
                    className="flex-1"
                  />
                  <Button variant="outline" className="bg-teal-500 text-white border-teal-500 hover:bg-teal-600">
                    APPLY
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Invoice and Contact Info */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Invoice and Contact Info</CardTitle>
                <Button variant="ghost" size="sm" className="text-primary self-start p-0 h-auto">
                  Edit
                </Button>
              </CardHeader>
            </Card>

            {/* Order Detail */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">ORDER DETAIL</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Subtotal ({checkoutItems.length} items)</span>
                  <span>฿{subtotal.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span>Shipping Fee</span>
                  <span className={shippingFee === 0 ? "text-green-600" : ""}>
                    {shippingFee === 0 ? "฿65.00" : `฿${shippingFee}`}
                  </span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span>Shipping discount and voucher</span>
                  <span className="text-green-600">-฿{(65 + shippingDiscount).toLocaleString()}</span>
                </div>
                
                <Separator />
                
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-orange-600">฿{total.toLocaleString()}</span>
                </div>
                
                <Button className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white" size="lg">
                  PLACE ORDER NOW
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}