import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import storeCbCotton from "@/assets/store-cb-cotton.jpg";
import storeCorrettoSuite from "@/assets/store-corretto-suite.jpg";
import storeThailandPool from "@/assets/store-thailand-pool.jpg";
import storeIn2it from "@/assets/store-in2it.jpg";
import storeToymart from "@/assets/store-toy-smart.jpg";
import storeQuiescent from "@/assets/store-quiescent.jpg";
import logoCbCotton from "@/assets/logo-cb-cotton.jpg";
import logoCorrettoSuite from "@/assets/logo-corretto-suite.jpg";
import logoThailandTech from "@/assets/logo-thailand-tech.jpg";
import logoIn2it from "@/assets/logo-in2it.jpg";
import logoSmartTech from "@/assets/logo-smart-tech.jpg";
import logoQuiescent from "@/assets/logo-quiescent.jpg";

const interlinkStores = [
  {
    id: 1,
    name: "CB Cotton IT Store",
    brand: "IT & Network Solutions",
    image: storeCbCotton,
    logo: logoCbCotton
  },
  {
    id: 2,
    name: "CORRETTO SUITE",
    brand: "Enterprise IT Equipment",
    image: storeCorrettoSuite,
    logo: logoCorrettoSuite
  },
  {
    id: 3,
    name: "Thailand Tech Plaza",
    brand: "Network & Server Solutions",
    image: storeThailandPool,
    logo: logoThailandTech
  },
  {
    id: 4,
    name: "IN2IT Computer",
    brand: "Colorful Tech Solutions",
    image: storeIn2it,
    logo: logoIn2it
  },
  {
    id: 5,
    name: "Smart Tech Shop",
    brand: "Smart IT Solutions",
    image: storeToymart,
    logo: logoSmartTech
  },
  {
    id: 6,
    name: "Quiescent Systems",
    brand: "Professional IT Hardware",
    image: storeQuiescent,
    logo: logoQuiescent
  },
];

export const InterlinkMall = () => {
  return (
    <section className="py-8 bg-background">
      <div className="container mx-auto px-4">
        {/* InterlinkMall Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">InterlinkMall</h2>
          <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
            Shop More
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>

        {/* Store Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {interlinkStores.map((store) => (
            <div 
              key={store.id} 
              className="bg-card rounded-lg overflow-hidden border border-border hover:shadow-md transition-shadow cursor-pointer group"
            >
              {/* Store Image */}
              <div className="relative aspect-[4/3] bg-muted">
                <img 
                  src={store.image} 
                  alt={store.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* Store Logo Overlay */}
                <div className="absolute bottom-2 left-2">
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-background border border-border">
                    <img 
                      src={store.logo} 
                      alt={`${store.name} logo`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
              
              {/* Store Info */}
              <div className="p-3">
                <h3 className="font-semibold text-sm text-foreground truncate">
                  {store.name}
                </h3>
                <p className="text-xs text-muted-foreground truncate">
                  {store.brand}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};