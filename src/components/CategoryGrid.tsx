import { Cable, Wifi, Database, Codesandbox, Phone, Sun, Shield, Network, MonitorSpeaker, Server, Camera, HardDrive } from "lucide-react";

const categories = [
  { icon: Cable, name: "LAN (UTP) System", color: "bg-primary" },
  { icon: Wifi, name: "FIBER OPTIC System", color: "bg-secondary" },
  { icon: Database, name: "FTTR/FTTx OVAL / FLAT CABLE", color: "bg-accent" },
  { icon: Server, name: "DATA CENTER System", color: "bg-primary/80" },
  { icon: Codesandbox, name: "COAXIAL (RG) System", color: "bg-secondary/80" },
  { icon: Phone, name: "Telephone CABLE", color: "bg-secondary" },
  { icon: Sun, name: "SOLAR CABLE", color: "bg-primary/60" },
  { icon: Shield, name: "SECURITY AND CONTROL System", color: "bg-destructive" },
  { icon: Network, name: "NETWORKING System", color: "bg-primary/40" },
  { icon: MonitorSpeaker, name: "GERMANY RACK", color: "bg-secondary/60" },
  { icon: Camera, name: "CCTV OUTDOOR CABINET", color: "bg-accent/80" },
  { icon: HardDrive, name: "LINK RACK", color: "bg-accent" },
];

export const CategoryGrid = () => {
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
            const Icon = category.icon;
            return (
              <div
                key={index}
                className="flex flex-col items-center p-6 rounded-xl bg-card hover:bg-gradient-card shadow-soft hover:shadow-card-hover transition-all duration-300 cursor-pointer group animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`${category.color} text-white p-4 rounded-2xl mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-soft`}>
                  <Icon className="h-6 w-6" />
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