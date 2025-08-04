import { Cable, Router, Server, Wifi, MonitorSpeaker, Network, Cpu, Shield } from "lucide-react";

const categories = [
  { icon: Cable, name: "สายเคเบิ้ล", color: "bg-primary" },
  { icon: Router, name: "Router/Switch", color: "bg-secondary" },
  { icon: Server, name: "Server/Storage", color: "bg-accent" },
  { icon: Wifi, name: "Wireless", color: "bg-primary/80" },
  { icon: MonitorSpeaker, name: "Audio/Video", color: "bg-secondary/80" },
  { icon: Network, name: "Network Tools", color: "bg-muted" },
  { icon: Cpu, name: "Components", color: "bg-primary/60" },
  { icon: Shield, name: "Security", color: "bg-destructive" },
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