import { Cable, Wifi, Database, Codesandbox, Phone, Sun, Shield, Network, MonitorSpeaker, Server, Camera, HardDrive } from "lucide-react";

const categories = [
  { icon: Cable, name: "LAN (UTP) System", color: "bg-primary" },
  { icon: Wifi, name: "FIBER OPTIC System", color: "bg-secondary" },
  { icon: Database, name: "FTTR/FTTx OVAL / FLAT CABLE", color: "bg-accent" },
  { icon: Server, name: "DATA CENTER System", color: "bg-primary/80" },
  { icon: Codesandbox, name: "COAXIAL (RG) System", color: "bg-secondary/80" },
  { icon: Phone, name: "Telephone CABLE", color: "bg-muted" },
  { icon: Sun, name: "SOLAR CABLE", color: "bg-primary/60" },
  { icon: Shield, name: "SECURITY AND CONTROL System", color: "bg-destructive" },
  { icon: Network, name: "NETWORKING System", color: "bg-primary/40" },
  { icon: MonitorSpeaker, name: "GERMANY RACK", color: "bg-secondary/60" },
  { icon: Camera, name: "CCTV OUTDOOR CABINET", color: "bg-accent/80" },
  { icon: HardDrive, name: "LINK RACK", color: "bg-muted/80" },
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