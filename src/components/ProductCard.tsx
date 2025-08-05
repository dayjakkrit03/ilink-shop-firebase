import { Heart, Star, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  reviews: number;
  image: string;
  isLiked?: boolean;
  isFreeShipping?: boolean;
  showRating?: boolean;
  isInterlinkMall?: boolean;
  isClearanceSale?: boolean;
}

export const ProductCard = ({
  name,
  price,
  originalPrice,
  discount,
  rating,
  reviews,
  image,
  isLiked = false,
  isFreeShipping = false,
  showRating = true,
  isInterlinkMall = false,
  isClearanceSale = false,
}: ProductCardProps) => {
  return (
    <div className="bg-card rounded-xl shadow-soft hover:shadow-card-hover transition-all duration-300 overflow-hidden group cursor-pointer hover:-translate-y-1 animate-fade-in">
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-muted/30">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-spring"
        />
        {discount && (
          <Badge className="absolute top-3 left-3 bg-sale text-sale-foreground px-3 py-1 text-xs font-bold shadow-glow animate-bounce-gentle">
            -{discount}%
          </Badge>
        )}
        <Button
          size="sm"
          variant="ghost"
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all duration-300 ${
            isLiked 
              ? "text-sale bg-white/20 hover:bg-white/30 scale-110" 
              : "text-white/80 bg-black/20 hover:bg-white/20 hover:text-sale"
          }`}
        >
          <Heart className={`h-4 w-4 transition-transform ${isLiked ? "fill-current scale-110" : "hover:scale-110"}`} />
        </Button>
        {isInterlinkMall && (
          <Badge className="absolute top-12 left-3 bg-primary text-primary-foreground px-3 py-1 text-xs font-bold shadow-glow">
            InterlinkMall
          </Badge>
        )}
        {isClearanceSale && (
          <Badge className="absolute top-12 left-3 bg-warning text-warning-foreground px-3 py-1 text-xs font-bold shadow-glow">
            Clearance Sale
          </Badge>
        )}
        {isFreeShipping && (
          <div className="absolute bottom-3 left-3 bg-success text-success-foreground text-xs px-3 py-1 rounded-full shadow-soft font-medium">
            ส่งฟรี
          </div>
        )}
        {/* Quick view overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Button variant="secondary" size="sm" className="opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
            ดูรายละเอียด
          </Button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-5">
        <h3 className="font-medium text-sm line-clamp-2 mb-2 group-hover:text-primary transition-colors leading-tight min-h-[2.5rem]">
          {name}
        </h3>

        {/* Rating */}
        {showRating && (
          <div className="flex items-center gap-1 mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 transition-colors ${
                    i < Math.floor(rating)
                      ? "text-warning fill-current"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground ml-1">({reviews})</span>
          </div>
        )}

        {/* Price */}
        <div className="mb-4">
          <div className="flex items-center gap-2">
            <div className={`text-lg font-bold ${originalPrice ? 'text-sale' : 'text-primary'}`}>
              ฿{price.toLocaleString()}
            </div>
            {originalPrice && (
              <div className="text-sm text-muted-foreground line-through">
                ฿{originalPrice.toLocaleString()}
              </div>
            )}
          </div>
        </div>

        {/* Add to Cart Button */}
        <Button className="w-full group-hover:shadow-glow transition-all duration-300" size="sm" variant="cart">
          <ShoppingCart className="h-4 w-4 mr-2 group-hover:animate-bounce-gentle" />
          ใส่ตะกร้า
        </Button>
      </div>
    </div>
  );
};