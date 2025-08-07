import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, CreditCard } from "lucide-react";
import switchImage from "@/assets/switch-24port.jpg";
import cableImage from "@/assets/lan-cable-cat6.jpg";
import routerImage from "@/assets/wifi-router-ac1200.jpg";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

interface PaymentData {
  amount: number;
  orderId: string;
  items: any[];
  subtotal?: number;
  shippingFee?: number;
  shippingDiscount?: number;
  voucherDiscount?: number;
  appliedVouchers?: Array<{
    code: string;
    discount: number;
  }>;
}

const getProductImage = (productName: string) => {
  if (productName.includes("Switch") || productName.includes("switch")) {
    return switchImage;
  } else if (productName.includes("สายแลน") || productName.includes("Cable") || productName.includes("cable")) {
    return cableImage;
  } else if (productName.includes("WiFi") || productName.includes("Router") || productName.includes("router")) {
    return routerImage;
  }
  return switchImage; // default fallback
};

const PaymentCard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);

  useEffect(() => {
    const data = location.state as PaymentData;
    if (!data) {
      navigate('/checkout');
      return;
    }
    setPaymentData(data);

    // สร้าง script สำหรับ K-Payment Gateway (Card Payment)
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://kpaymentgateway.kasikornbank.com/ui/v2/kpayment.min.js';
    script.setAttribute('data-apikey', 'pkey_prod_75677dushd74774gdgdgd77d7dhsgfhfghfhgdh'); // ใส่ API Key จริง
    script.setAttribute('data-amount', data.amount.toFixed(2));
    script.setAttribute('data-payment-methods', 'card');
    script.setAttribute('data-order-id', data.orderId);
    
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [location.state, navigate]);

  if (!paymentData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/checkout')}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            กลับไปหน้าชำระเงิน
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Payment Section */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  ชำระเงินด้วยบัตรเครดิต/เดบิต
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center p-8">
                  <div className="text-lg font-medium mb-4">
                    ยอดที่ต้องชำระ: ฿{paymentData.amount.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground mb-6">
                    หมายเลขคำสั่งซื้อ: {paymentData.orderId}
                  </div>
                  
                  {/* K-Payment Gateway จะแสดง Pay Now button ที่นี่ */}
                  <div className="bg-gray-50 rounded-lg p-8 border-2 border-dashed border-gray-300">
                    <div className="text-gray-500 text-sm">
                      ปุ่มชำระเงินจะแสดงที่นี่
                      <br />
                      (K-Payment Gateway Button)
                    </div>
                  </div>
                  
                  <div className="mt-6 text-sm text-muted-foreground">
                    รองรับบัตร Visa, MasterCard, JCB
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Security Info */}
            <Card>
              <CardContent className="pt-6">
                <div className="text-sm space-y-2">
                  <div className="font-medium">ความปลอดภัยในการชำระเงิน</div>
                  <ul className="text-muted-foreground space-y-1">
                    <li>• การเชื่อมต่อปลอดภัยด้วย SSL</li>
                    <li>• ข้อมูลบัตรได้รับการเข้ารหัส</li>
                    <li>• ผ่านมาตรฐาน PCI DSS</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>สรุปคำสั่งซื้อ</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {paymentData.items.map((item, index) => (
                  <div key={index} className="flex gap-3">
                    <img 
                      src={getProductImage(item.name)} 
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-muted-foreground">
                        จำนวน: {item.quantity}
                      </div>
                    </div>
                    <div className="font-medium">
                      ฿{(item.price * item.quantity).toLocaleString()}
                    </div>
                  </div>
                ))}
                
                <Separator className="my-4" />
                
                {/* Subtotal */}
                <div className="flex justify-between text-sm">
                  <span>ราคาสินค้า</span>
                  <span>฿{(paymentData.subtotal || paymentData.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)).toLocaleString()}</span>
                </div>
                
                {/* Shipping Fee */}
                {(paymentData.shippingFee || 0) > 0 && (
                  <div className="flex justify-between text-sm">
                    <span>ค่าจัดส่ง</span>
                    <span>฿{paymentData.shippingFee!.toLocaleString()}</span>
                  </div>
                )}
                
                {/* Shipping discount */}
                {(paymentData.shippingDiscount || 0) > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>ส่วนลดค่าจัดส่ง</span>
                    <span>-฿{paymentData.shippingDiscount!.toLocaleString()}</span>
                  </div>
                )}
                
                {/* Coupon discounts */}
                {paymentData.appliedVouchers && paymentData.appliedVouchers.length > 0 && (
                  <>
                    {paymentData.appliedVouchers.map((voucher, index) => (
                      <div key={index} className="flex justify-between text-sm text-green-600">
                        <span>ส่วนลดจากโค้ด ({voucher.code})</span>
                        <span>-฿{voucher.discount.toLocaleString()}</span>
                      </div>
                    ))}
                  </>
                )}
                
                {/* Fallback voucher discount if appliedVouchers is not available */}
                {(!paymentData.appliedVouchers || paymentData.appliedVouchers.length === 0) && (paymentData.voucherDiscount || 0) > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>ส่วนลดจากโค้ด</span>
                    <span>-฿{paymentData.voucherDiscount!.toLocaleString()}</span>
                  </div>
                )}
                
                <Separator className="my-4" />
                
                <div className="flex justify-between font-medium text-lg">
                  <span>ยอดรวมทั้งหมด</span>
                  <span>฿{paymentData.amount.toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="text-sm space-y-2">
                  <div className="font-medium">หมายเหตุ</div>
                  <ul className="text-muted-foreground space-y-1">
                    <li>• กรุณาตรวจสอบข้อมูลก่อนชำระเงิน</li>
                    <li>• ระบบจะส่งใบเสร็จทางอีเมล</li>
                    <li>• หากมีปัญหาโปรดติดต่อฝ่ายลูกค้าสัมพันธ์</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PaymentCard;