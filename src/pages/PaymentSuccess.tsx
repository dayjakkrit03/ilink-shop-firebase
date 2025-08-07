import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, Mail, Package } from "lucide-react";

interface PaymentData {
  amount: number;
  orderId: string;
  items: Array<{
    id: string;
    name: string;
    quantity: number;
    price: number;
    image: string;
  }>;
}

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);

  useEffect(() => {
    const data = location.state?.paymentData;
    if (data) {
      setPaymentData(data);
    } else {
      // If no payment data, redirect to home
      navigate("/");
    }
  }, [location, navigate]);

  const formatDate = (daysFromNow: number) => {
    const date = new Date();
    date.setDate(date.getDate() + daysFromNow);
    return date.toLocaleDateString('th-TH', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const generateOrderNumber = () => {
    return `10346137049566${Math.floor(Math.random() * 1000)}`;
  };

  if (!paymentData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>กำลังโหลด...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Success Header */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-6 text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <h1 className="text-2xl font-bold text-green-600 mb-2">
            ขอบคุณสำหรับการสั่งซื้อ!
          </h1>
          <div className="text-3xl font-bold text-orange-500 mb-4">
            ฿{paymentData.amount.toLocaleString()}
          </div>
          <p className="text-gray-600 mb-2">หมายเลขคำสั่งซื้อของคุณคือ</p>
          <p className="text-lg font-semibold text-gray-800">
            {generateOrderNumber()}
          </p>
        </div>

        {/* Delivery Information */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="text-center mb-4">
            <p className="text-gray-600 mb-2">
              ชำระเงินเรียบร้อยแล้ว
            </p>
            <div className="text-2xl font-bold text-orange-500">
              ฿{paymentData.amount.toLocaleString()}
            </div>
          </div>

          <h3 className="font-semibold text-lg mb-4">วันที่จัดส่งของคุณ</h3>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Package className="h-8 w-8 text-orange-500" />
              </div>
              <div className="flex-1">
                <p className="font-medium">สินค้าทั้งหมด</p>
                <p className="text-sm text-gray-600">{paymentData.items.length} รายการ</p>
              </div>
            </div>
            <div className="text-right flex-shrink-0 pl-20 md:pl-4">
              <p className="text-sm text-gray-600">คาดว่าจะส่งภายใน</p>
              <p className="font-semibold">{formatDate(2)} - {formatDate(5)}</p>
            </div>
          </div>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600 mb-2">
              สำหรับรายละเอียดเพิ่มเติม ติดตามสถานะการจัดส่งได้ที่ 
            </p>
            <Button variant="outline" className="text-blue-600 hover:text-blue-700">
              ดูคำสั่งซื้อ
            </Button>
          </div>
        </div>

        {/* Email Confirmation */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-center space-x-3">
            <Mail className="h-5 w-5 text-blue-500" />
            <p className="text-sm text-blue-700">
              เราได้ส่งอีเมลยืนยันไปยัง customer@example.com พร้อมรายละเอียดคำสั่งซื้อแล้ว
            </p>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h3 className="font-semibold text-lg mb-4">สรุปคำสั่งซื้อ</h3>
          
          <div className="space-y-4">
            {paymentData.items.map((item, index) => (
              <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-600">จำนวน: {item.quantity}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">฿{(item.price * item.quantity).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t mt-4 pt-4">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-lg">รวมทั้งสิ้น</span>
              <span className="font-bold text-xl text-orange-500">
                ฿{paymentData.amount.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button 
            className="w-full bg-orange-500 hover:bg-orange-600 text-white"
            size="lg"
            onClick={() => navigate("/")}
          >
            ช็อปต่อ
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full"
            size="lg"
            onClick={() => navigate("/cart")}
          >
            ดูตะกร้าสินค้า
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;