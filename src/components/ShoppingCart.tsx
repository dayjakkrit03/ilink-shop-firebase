import { useState } from "react";
import { ShoppingCart as CartIcon, Plus, Minus, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

// Mock cart data
const cartItems = [
  {
    id: 1,
    name: "Switch 24 Port Gigabit",
    price: 2899,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=100&h=100&fit=crop"
  },
  {
    id: 2,
    name: "สายแลน Cat6 UTP Cable 305m",
    price: 1599,
    quantity: 2,
    image: "https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=100&h=100&fit=crop"
  },
  {
    id: 3,
    name: "WiFi Router AC1200",
    price: 1899,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=100&h=100&fit=crop"
  }
];

interface ShoppingCartProps {
  isOpen?: boolean;
  isVisible?: boolean;
  onClose?: () => void;
}

export const ShoppingCart = ({ isOpen: externalIsOpen, isVisible, onClose }: ShoppingCartProps = {}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = isVisible !== undefined ? isVisible : (externalIsOpen !== undefined ? externalIsOpen : internalIsOpen);
  const handleClose = onClose || (() => setInternalIsOpen(false));
  const handleOpen = () => externalIsOpen === undefined && setInternalIsOpen(true);
  const [items, setItems] = useState(cartItems);
  const [selectedItems, setSelectedItems] = useState<number[]>(cartItems.map(item => item.id)); // Select all by default

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const selectedTotalItems = items
    .filter(item => selectedItems.includes(item.id))
    .reduce((sum, item) => sum + item.quantity, 0);
  const selectedTotalPrice = items
    .filter(item => selectedItems.includes(item.id))
    .reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const toggleItemSelection = (itemId: number) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const toggleAllItems = () => {
    const allSelected = selectedItems.length === items.length;
    setSelectedItems(allSelected ? [] : items.map(item => item.id));
  };

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      setItems(items.filter(item => item.id !== id));
    } else {
      setItems(items.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={(open) => open ? handleOpen() : handleClose()}>
      <SheetContent side="right" className="w-96 sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <CartIcon className="h-5 w-5" />
            ตะกร้าสินค้า ({totalItems} รายการ)
          </SheetTitle>
        </SheetHeader>
        
        <div className="flex flex-col h-full">
          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto py-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                <CartIcon className="h-12 w-12 mb-4" />
                <p>ตะกร้าสินค้าว่าง</p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Select All Checkbox */}
                <div className="flex items-center gap-2 pb-2 border-b">
                  <Checkbox
                    checked={selectedItems.length === items.length}
                    onCheckedChange={toggleAllItems}
                  />
                  <span className="text-sm font-medium">เลือกทั้งหมด</span>
                </div>
                
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 p-3 border rounded-lg">
                    <Checkbox
                      checked={selectedItems.includes(item.id)}
                      onCheckedChange={() => toggleItemSelection(item.id)}
                    />
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{item.name}</h4>
                      <p className="text-primary font-semibold">฿{item.price}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 text-destructive"
                        onClick={() => updateQuantity(item.id, 0)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Cart Summary */}
          {items.length > 0 && (
            <div className="border-t pt-4 space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">รวม ({selectedItems.length} รายการ):</span>
                <span className="font-bold text-lg text-primary">฿{selectedTotalPrice.toLocaleString()}</span>
              </div>
              
              <div className="space-y-2">
                <Button 
                  className="w-full" 
                  size="lg"
                  disabled={selectedItems.length === 0}
                >
                  ชำระเงิน ({selectedTotalItems} รายการ)
                </Button>
                <Button variant="outline" className="w-full">
                  ดูตะกร้าสินค้า
                </Button>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};