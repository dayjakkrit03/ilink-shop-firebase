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
}: ProductCardProps) => {
  return (
    <div className="bg-card rounded-lg shadow-card hover:shadow-card-hover transition-all duration-200 overflow-hidden group cursor-pointer">
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {discount && (
          <Badge className="absolute top-2 left-2 bg-sale text-sale-foreground">
            -{discount}%
          </Badge>
        )}
        <Button
          size="sm"
          variant="ghost"
          className={`absolute top-2 right-2 p-2 ${
            isLiked ? "text-sale" : "text-white"
          } hover:bg-white/20`}
        >
          <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
        </Button>
        {isFreeShipping && (
          <div className="absolute bottom-2 left-2 bg-success text-success-foreground text-xs px-2 py-1 rounded">
            ส่งฟรี
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="font-medium text-sm line-clamp-2 mb-2 group-hover:text-primary transition-colors">
          {name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${
                  i < Math.floor(rating)
                    ? "text-accent fill-current"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">({reviews})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg font-bold text-sale">
            ฿{price.toLocaleString()}
          </span>
          {originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              ฿{originalPrice.toLocaleString()}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <Button className="w-full" size="sm" variant="cart">
          <ShoppingCart className="h-4 w-4 mr-2" />
          ใส่ตะกร้า
        </Button>
      </div>
    </div>
  );
};