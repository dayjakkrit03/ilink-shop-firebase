import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

export const ProductFilters = () => {
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [categoryOpen, setCategoryOpen] = useState(true);
  const [brandOpen, setBrandOpen] = useState(true);
  const [priceOpen, setPriceOpen] = useState(true);

  const categories = [
    "Routers",
    "Motherboards", 
    "Network Interface Cards",
    "Graphics & Sound Cards",
    "Cooling Fans & Components",
    "Power Supply Units",
    "PC Case",
    "Internal HDD/SDD"
  ];

  const brands = [
    { name: "TP Link", count: 234 },
    { name: "TP-Link", count: 189 },
    { name: "D-Link", count: 156 },
    { name: "ASUS", count: 134 },
    { name: "Mercusys", count: 98 },
    { name: "Tenda", count: 87 },
    { name: "Netfox by TP-LINK", count: 65 }
  ];

  return (
    <div className="space-y-4">
      {/* Category Filter */}
      <Card>
        <Collapsible open={categoryOpen} onOpenChange={setCategoryOpen}>
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Category</CardTitle>
                {categoryOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </div>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="pt-0">
              <div className="space-y-3">
                {categories.map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox id={`category-${category}`} />
                    <label
                      htmlFor={`category-${category}`}
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      {category}
                    </label>
                  </div>
                ))}
                <Button variant="link" className="h-auto p-0 text-primary">
                  VIEW MORE
                </Button>
              </div>
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>

      {/* Brand Filter */}
      <Card>
        <Collapsible open={brandOpen} onOpenChange={setBrandOpen}>
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Brand</CardTitle>
                {brandOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </div>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="pt-0">
              <div className="space-y-3">
                {brands.map((brand) => (
                  <div key={brand.name} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox id={`brand-${brand.name}`} />
                      <label
                        htmlFor={`brand-${brand.name}`}
                        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        {brand.name}
                      </label>
                    </div>
                    <span className="text-xs text-muted-foreground">({brand.count})</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>

      {/* Price Range Filter */}
      <Card>
        <Collapsible open={priceOpen} onOpenChange={setPriceOpen}>
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Price Range</CardTitle>
                {priceOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </div>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="pt-0">
              <div className="space-y-4">
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={50000}
                  min={0}
                  step={100}
                  className="w-full"
                />
                <div className="flex items-center justify-between text-sm">
                  <span>฿{priceRange[0].toLocaleString()}</span>
                  <span>฿{priceRange[1].toLocaleString()}</span>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  Apply Price Filter
                </Button>
              </div>
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>

      {/* Rating Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Customer Rating</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center space-x-2">
                <Checkbox id={`rating-${rating}`} />
                <label
                  htmlFor={`rating-${rating}`}
                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex items-center gap-1"
                >
                  <div className="flex text-yellow-400">
                    {"★".repeat(rating)}
                    {"☆".repeat(5 - rating)}
                  </div>
                  <span>& up</span>
                </label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Service & Promotion */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Service & Promotion</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox id="free-shipping" />
              <label htmlFor="free-shipping" className="text-sm">
                Free Shipping
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="voucher-available" />
              <label htmlFor="voucher-available" className="text-sm">
                Voucher Available
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="lazmall" />
              <label htmlFor="lazmall" className="text-sm">
                LazMall
              </label>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};