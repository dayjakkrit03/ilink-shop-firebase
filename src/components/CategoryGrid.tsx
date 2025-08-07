import { useNavigate } from "react-router-dom";
import lanUtpImg from "@/assets/category-lan-utp.jpg";
import fiberOpticImg from "@/assets/category-fiber-optic.jpg";
import fttrFttxImg from "@/assets/category-fttr-fttx.jpg";
import dataCenterImg from "@/assets/category-data-center.jpg";
import coaxialImg from "@/assets/category-coaxial.jpg";
import telephoneImg from "@/assets/category-telephone.jpg";
import solarImg from "@/assets/category-solar.jpg";
import securityControlImg from "@/assets/category-security-control.jpg";
import networkingImg from "@/assets/category-networking.jpg";
import germanyRackImg from "@/assets/category-germany-rack.jpg";
import cctvCabinetImg from "@/assets/category-cctv-cabinet.jpg";
import linkRackImg from "@/assets/category-link-rack.jpg";

const categories = [
  { image: lanUtpImg, name: "LAN (UTP) System", color: "bg-primary" },
  { image: fiberOpticImg, name: "FIBER OPTIC System", color: "bg-secondary" },
  { image: fttrFttxImg, name: "FTTR/FTTx OVAL / FLAT CABLE", color: "bg-accent" },
  { image: dataCenterImg, name: "DATA CENTER System", color: "bg-primary" },
  { image: coaxialImg, name: "COAXIAL (RG) System", color: "bg-secondary" },
  { image: telephoneImg, name: "Telephone CABLE", color: "bg-secondary" },
  { image: solarImg, name: "SOLAR CABLE", color: "bg-primary" },
  { image: securityControlImg, name: "SECURITY AND CONTROL System", color: "bg-destructive" },
  { image: networkingImg, name: "NETWORKING System", color: "bg-primary" },
  { image: germanyRackImg, name: "GERMANY RACK", color: "bg-secondary" },
  { image: cctvCabinetImg, name: "CCTV OUTDOOR CABINET", color: "bg-accent" },
  { image: linkRackImg, name: "LINK RACK", color: "bg-accent" },
];

export const CategoryGrid = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryName: string) => {
    navigate(`/products?category=${encodeURIComponent(categoryName)}`);
  };
  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">หมวดหมู่สินค้า</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            เลือกซื้ออุปกรณ์เครือข่ายคุณภาพสูงจากหมวดหมู่ที่หลากหลาย
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6">
          {categories.map((category, index) => {
            return (
              <div
                key={index}
                onClick={() => handleCategoryClick(category.name)}
                className="flex flex-col items-center p-6 rounded-xl bg-card hover:bg-gradient-card shadow-soft hover:shadow-card-hover transition-all duration-300 cursor-pointer group animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-16 h-16 object-cover rounded-2xl shadow-soft"
                  />
                </div>
                <span className="text-sm font-medium text-center group-hover:text-primary transition-colors line-clamp-2 leading-tight">
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