import { Smartphone, Shirt, Home, Zap, Heart, Gamepad2, Car, Gift } from "lucide-react";

const categories = [
  { icon: Smartphone, name: "มือถือ", color: "bg-blue-500" },
  { icon: Shirt, name: "แฟชั่น", color: "bg-pink-500" },
  { icon: Home, name: "บ้าน", color: "bg-green-500" },
  { icon: Zap, name: "อิเล็กทรอนิกส์", color: "bg-yellow-500" },
  { icon: Heart, name: "ความงาม", color: "bg-rose-500" },
  { icon: Gamepad2, name: "เกม", color: "bg-purple-500" },
  { icon: Car, name: "ยานยนต์", color: "bg-gray-500" },
  { icon: Gift, name: "ของขวัญ", color: "bg-orange-500" },
];

export const CategoryGrid = () => {
  return (
    <section className="py-8 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6 text-center">หมวดหมู่สินค้า</h2>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <div
                key={index}
                className="flex flex-col items-center p-4 rounded-lg hover:shadow-card-hover transition-all duration-200 cursor-pointer group"
              >
                <div className={`${category.color} text-white p-4 rounded-full mb-3 group-hover:scale-110 transition-transform duration-200`}>
                  <Icon className="h-6 w-6" />
                </div>
                <span className="text-sm font-medium text-center group-hover:text-primary transition-colors">
                  {category.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};