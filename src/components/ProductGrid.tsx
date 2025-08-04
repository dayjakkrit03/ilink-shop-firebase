import { ProductCard } from "./ProductCard";
import { Button } from "@/components/ui/button";

// Mock product data
const products = [
  {
    id: 1,
    name: "iPhone 15 Pro Max 256GB สี Natural Titanium ของแท้ รับประกันศูนย์ไทย",
    price: 45900,
    originalPrice: 52900,
    discount: 13,
    rating: 4.8,
    reviews: 2341,
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop",
    isFreeShipping: true,
  },
  {
    id: 2,
    name: "เสื้อโปโลชาย แบรนด์ดัง คุณภาพพรีเมียม สีกรม",
    price: 299,
    originalPrice: 599,
    discount: 50,
    rating: 4.5,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
    isFreeShipping: true,
  },
  {
    id: 3,
    name: "กระเป๋าเป้แฟชั่น กันน้ำ มีช่องแล็ปท็อป สีดำ",
    price: 890,
    originalPrice: 1290,
    discount: 31,
    rating: 4.6,
    reviews: 523,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
    isFreeShipping: true,
  },
  {
    id: 4,
    name: "หูฟังบลูทูธ ตัดเสียงรบกวน กันน้ำ IPX7",
    price: 1590,
    originalPrice: 2990,
    discount: 47,
    rating: 4.7,
    reviews: 834,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    isFreeShipping: true,
  },
  {
    id: 5,
    name: "รองเท้าผ้าใบ แฟชั่นเกาหลี สไตล์วินเทจ สีขาว",
    price: 599,
    originalPrice: 999,
    discount: 40,
    rating: 4.4,
    reviews: 267,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop",
    isFreeShipping: true,
  },
  {
    id: 6,
    name: "ครีมกันแดด SPF50+ PA++++ 50ml สำหรับผิวหน้า",
    price: 259,
    originalPrice: 359,
    discount: 28,
    rating: 4.9,
    reviews: 1200,
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop",
    isFreeShipping: false,
  },
  {
    id: 7,
    name: "เมาส์ไร้สาย Gaming แบตอึด คลิกเงียบ RGB",
    price: 799,
    originalPrice: 1299,
    discount: 38,
    rating: 4.6,
    reviews: 445,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop",
    isFreeShipping: true,
  },
  {
    id: 8,
    name: "กาแฟคั่วเม็ด อาราบิก้า 100% บรรจุซิป 250g",
    price: 179,
    originalPrice: 249,
    discount: 28,
    rating: 4.8,
    reviews: 567,
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=400&fit=crop",
    isFreeShipping: false,
  },
];

export const ProductGrid = () => {
  return (
    <section className="py-12 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">สินค้าแนะนำ</h2>
            <p className="text-muted-foreground">อุปกรณ์เครือข่ายคุณภาพสูงที่คัดสรรมาแล้ว</p>
          </div>
          <Button variant="outline" className="hover:bg-primary hover:text-primary-foreground transition-all duration-300">
            ดูทั้งหมด →
          </Button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {products.map((product, index) => (
            <div
              key={product.id}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ProductCard {...product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};