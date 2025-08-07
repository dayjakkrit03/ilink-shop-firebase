import { useState, useEffect } from "react";
import { ArrowLeft, MapPin, Truck, CreditCard, Wallet, Plus, Home, Building, Edit, Check, QrCode, Trash2, Smartphone, Building2, ArrowLeftRight } from "lucide-react";
import mastercardLogo from "@/assets/mastercard-logo.svg";
import jcbLogo from "@/assets/jcb-logo.svg";
import visaLogo from "@/assets/visa-logo.svg";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Textarea } from "@/components/ui/textarea";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

// Mock data for checkout items (in real app, this would come from state/props)
const initialCheckoutItems = [
  {
    id: 1,
    name: "Switch 24 Port Gigabit",
    price: 2899,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=100&h=100&fit=crop",
    store: "TechMall Official Store"
  },
  {
    id: 2,
    name: "สายแลน Cat6 UTP Cable 305m",
    price: 1599,
    originalPrice: 1799,
    quantity: 2,
    image: "https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=100&h=100&fit=crop",
    store: "NetworkPro Store",
    discount: "Save ฿200"
  },
  {
    id: 3,
    name: "WiFi Router AC1200",
    price: 1899,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=100&h=100&fit=crop",
    store: "ConnectTech Store"
  }
];

// Mock addresses data
const initialAddresses = [
  {
    id: 1,
    type: "HOME",
    name: "สิรดา ธำรำ",
    phone: "0863527663",
    address: "สบปิดิ์ ร้ำปี ร่ำวชำกระก๊วยิดส เคลส์ 50/37 ซอย 8 ซิ์ง อ.สิ่ง ลิ. สะหมำเชม/ Saphan Song, 10310, วำงห่องส่ำม/ Wang Thonglang, กรุงเทพมหำนคร/ Bangkok",
    isDefault: true
  }
];

export default function Checkout() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const location = useLocation();
  const [deliveryOption, setDeliveryOption] = useState("standard");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [voucherCode, setVoucherCode] = useState("");
  const [appliedVouchers, setAppliedVouchers] = useState<{ code: string; discount: number }[]>([]);
  const [voucherError, setVoucherError] = useState("");
  const [addresses, setAddresses] = useState(initialAddresses);
  const [selectedAddress, setSelectedAddress] = useState(initialAddresses[0]);
  const [isAddressSheetOpen, setIsAddressSheetOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<any>(null);
  const [checkoutItems, setCheckoutItems] = useState(initialCheckoutItems);
  const [isPaymentMethodsOpen, setIsPaymentMethodsOpen] = useState(false);
  const [selectedExtraMethods, setSelectedExtraMethods] = useState<string[]>([]);
  const [additionalPaymentMethods, setAdditionalPaymentMethods] = useState<string[]>([]);
  const [isInvoiceSheetOpen, setIsInvoiceSheetOpen] = useState(false);
  
  // Invoice form states
  const [invoiceInfo, setInvoiceInfo] = useState({
    email: "jakrit.dev19@gmail.com",
    billingAddress: "สิรดา ธำรำ 0863527663\nสบปิดิ์ ร้ำปี ร่ำวชำกระก๊วยิดส เคลส์ 50/37 ซอย 8 ซิ์ง อ.สิ่ง ลิ. สะหมำเชม/ Saphan Song, 10310, วำงห่องส่ำม/ Wang Thonglang, กรุงเทพมหำนคร/ Bangkok",
    taxId: "",
    headOfficeBranch: ""
  });
  
  // Form states for new address
  const [newAddress, setNewAddress] = useState({
    type: "HOME",
    name: "",
    phone: "",
    address: "",
    province: "",
    district: "",
    subdistrict: "",
    zipcode: ""
  });

  // Calculate totals
  const subtotal = checkoutItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shippingFee = deliveryOption === "standard" ? 0 : 65;
  const voucherDiscount = appliedVouchers.reduce((sum, voucher) => sum + voucher.discount, 0);
  const total = subtotal + shippingFee - voucherDiscount;

  // Handle applying voucher
  const handleApplyVoucher = () => {
    if (voucherCode.trim()) {
      // Clear previous error
      setVoucherError("");
      
      // Mock voucher validation - in real app, this would validate with backend
      const mockVouchers = {
        "SAVE100": { code: "SAVE100", discount: 100 },
        "DISCOUNT50": { code: "DISCOUNT50", discount: 50 },
        "FREESHIP": { code: "FREESHIP", discount: 65 },
        "VC0001": { code: "VC0001", discount: 100 },
        "VC0002": { code: "VC0002", discount: 200 }
      };
      
      const voucher = mockVouchers[voucherCode.toUpperCase() as keyof typeof mockVouchers];
      if (voucher) {
        // Check if voucher is already applied
        const isAlreadyApplied = appliedVouchers.some(v => v.code === voucher.code);
        if (isAlreadyApplied) {
          setVoucherError("โค้ดนี้ถูกใช้แล้ว");
        } else {
          setAppliedVouchers(prev => [...prev, voucher]);
          setVoucherCode("");
        }
      } else {
        setVoucherError("โค้ดส่วนลดไม่ถูกต้อง");
      }
    }
  };

  // Handle removing voucher
  const handleRemoveVoucher = (codeToRemove: string) => {
    setAppliedVouchers(prev => prev.filter(voucher => voucher.code !== codeToRemove));
  };

  // Handle adding new address
  const handleAddAddress = () => {
    const newAddr = {
      id: addresses.length + 1,
      type: newAddress.type,
      name: newAddress.name,
      phone: newAddress.phone,
      address: `${newAddress.address}, ${newAddress.subdistrict}, ${newAddress.zipcode}, ${newAddress.district}, ${newAddress.province}`,
      isDefault: false
    };
    
    setAddresses([...addresses, newAddr]);
    setNewAddress({
      type: "HOME",
      name: "",
      phone: "",
      address: "",
      province: "",
      district: "",
      subdistrict: "",
      zipcode: ""
    });
    setIsAddDialogOpen(false);
  };

  const handleSelectAddress = (address: any) => {
    setSelectedAddress(address);
    setIsAddressSheetOpen(false);
  };

  // Handle setting default address
  const handleSetDefault = (addressId: number) => {
    setAddresses(addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === addressId
    })));
    const newDefault = addresses.find(addr => addr.id === addressId);
    if (newDefault) {
      setSelectedAddress(newDefault);
    }
  };

  // Handle editing address
  const handleEditAddress = (address: any) => {
    setEditingAddress(address);
    setNewAddress({
      type: address.type,
      name: address.name,
      phone: address.phone,
      address: address.address.split(',')[0], // Extract just the street address part
      province: "กรุงเทพมหานคร",
      district: "Wang Thonglang", 
      subdistrict: "Saphan Song",
      zipcode: "10310"
    });
    setIsEditDialogOpen(true);
  };

  // Handle saving edited address
  const handleSaveEditedAddress = () => {
    if (editingAddress) {
      const updatedAddress = {
        ...editingAddress,
        type: newAddress.type,
        name: newAddress.name,
        phone: newAddress.phone,
        address: `${newAddress.address}, ${newAddress.subdistrict}, ${newAddress.zipcode}, ${newAddress.district}, ${newAddress.province}`
      };
      
      setAddresses(addresses.map(addr => 
        addr.id === editingAddress.id ? updatedAddress : addr
      ));
      
      if (selectedAddress.id === editingAddress.id) {
        setSelectedAddress(updatedAddress);
      }
      
      setNewAddress({
        type: "HOME",
        name: "",
        phone: "",
        address: "",
        province: "",
        district: "",
        subdistrict: "",
        zipcode: ""
      });
      setEditingAddress(null);
      setIsEditDialogOpen(false);
    }
  };

  // Handle remove item from checkout
  const handleRemoveItem = (itemId: number) => {
    setCheckoutItems(items => items.filter(item => item.id !== itemId));
  };

  // Handle confirm payment methods
  const handleConfirmPaymentMethods = () => {
    const methodsToAdd = [];
    
    if (paymentMethod === 'linepay' && !additionalPaymentMethods.includes('linepay')) {
      methodsToAdd.push('linepay');
    }
    if (paymentMethod === 'internetbanking' && !additionalPaymentMethods.includes('internetbanking')) {
      methodsToAdd.push('internetbanking');
    }
    if (paymentMethod === 'banktransfer' && !additionalPaymentMethods.includes('banktransfer')) {
      methodsToAdd.push('banktransfer');
    }
    if (paymentMethod === 'cash' && !additionalPaymentMethods.includes('cod')) {
      methodsToAdd.push('cod');
    }
    
    setAdditionalPaymentMethods(prev => [...prev, ...methodsToAdd]);
    setIsPaymentMethodsOpen(false);
  };

  // Handle remove additional payment method
  const handleRemovePaymentMethod = (methodToRemove: string) => {
    setAdditionalPaymentMethods(prev => prev.filter(method => method !== methodToRemove));
    // If the removed method was selected, reset to card
    if (paymentMethod === methodToRemove) {
      setPaymentMethod('card');
    }
  };

  // Handle save invoice info
  const handleSaveInvoiceInfo = () => {
    setIsInvoiceSheetOpen(false);
  };

  // Get payment method display info
  const getPaymentMethodInfo = (method: string) => {
    const methodsMap = {
      linepay: {
        icon: <Smartphone className="h-6 w-6 text-green-600" />,
        bgColor: "bg-green-100",
        name: "LINE Pay",
        description: "Link your card or add sufficient funds before shopping"
      },
      internetbanking: {
        icon: <Building2 className="h-6 w-6 text-blue-600" />,
        bgColor: "bg-blue-100",
        name: "Internet banking",
        description: "Login with bank account to pay"
      },
      banktransfer: {
        icon: <ArrowLeftRight className="h-6 w-6 text-purple-600" />,
        bgColor: "bg-purple-100",
        name: "Bank Transfer",
        description: "Transfer money directly to merchant's bank account"
      },
      cod: {
        icon: <Truck className="h-6 w-6 text-orange-600" />,
        bgColor: "bg-orange-100",
        name: "Cash on Delivery",
        description: "Pay when your order is delivered"
      }
    };
    return methodsMap[method as keyof typeof methodsMap];
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link to="/cart">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">ชำระเงิน</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Checkout Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Address */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <MapPin className="h-5 w-5" />
                  ที่อยู่จัดส่ง
                  <Sheet open={isAddressSheetOpen} onOpenChange={setIsAddressSheetOpen}>
                    <SheetTrigger asChild>
                      <Button variant="ghost" size="sm" className="ml-auto text-primary">
                        แก้ไข
                      </Button>
                    </SheetTrigger>
                    <SheetContent className="w-[400px] sm:w-[540px]">
                      <SheetHeader>
                        <SheetTitle>ที่อยู่จัดส่ง</SheetTitle>
                      </SheetHeader>
                      
                      <div className="mt-6 space-y-4">
                        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                          <DialogTrigger asChild>
                            <Button variant="outline" className="w-full justify-start gap-2">
                              <Plus className="h-4 w-4" />
                              Add new address
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[500px]">
                            <DialogHeader>
                              <DialogTitle>Add new shipping Address</DialogTitle>
                            </DialogHeader>
                            
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label htmlFor="name">Full name</Label>
                                  <Input
                                    id="name"
                                    placeholder="Please enter your full name"
                                    value={newAddress.name}
                                    onChange={(e) => setNewAddress({...newAddress, name: e.target.value})}
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="phone">Phone Number</Label>
                                  <Input
                                    id="phone"
                                    placeholder="Please enter your phone number"
                                    value={newAddress.phone}
                                    onChange={(e) => setNewAddress({...newAddress, phone: e.target.value})}
                                  />
                                </div>
                              </div>
                              
                              <div>
                                <Label htmlFor="address">Address</Label>
                                <Textarea
                                  id="address"
                                  placeholder="House number, Floor, Building name, Street name"
                                  value={newAddress.address}
                                  onChange={(e) => setNewAddress({...newAddress, address: e.target.value})}
                                  className="min-h-[80px]"
                                />
                              </div>
                              
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label htmlFor="province">Province</Label>
                                  <Input
                                    id="province"
                                    placeholder="Please select your province"
                                    value={newAddress.province}
                                    onChange={(e) => setNewAddress({...newAddress, province: e.target.value})}
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="district">District</Label>
                                  <Input
                                    id="district"
                                    placeholder="Please select your district"
                                    value={newAddress.district}
                                    onChange={(e) => setNewAddress({...newAddress, district: e.target.value})}
                                  />
                                </div>
                              </div>
                              
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label htmlFor="subdistrict">Sub District</Label>
                                  <Input
                                    id="subdistrict"
                                    placeholder="Please select your sub district"
                                    value={newAddress.subdistrict}
                                    onChange={(e) => setNewAddress({...newAddress, subdistrict: e.target.value})}
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="zipcode">Postcode</Label>
                                  <Input
                                    id="zipcode"
                                    placeholder="00000"
                                    value={newAddress.zipcode}
                                    onChange={(e) => setNewAddress({...newAddress, zipcode: e.target.value})}
                                  />
                                </div>
                              </div>
                              
                              <div>
                                <Label>Select a label for effective delivery</Label>
                                <div className="flex gap-2 mt-2">
                                  <Button
                                    variant={newAddress.type === "HOME" ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setNewAddress({...newAddress, type: "HOME"})}
                                  >
                                    <Home className="h-4 w-4 mr-1" />
                                    HOME
                                  </Button>
                                  <Button
                                    variant={newAddress.type === "OFFICE" ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setNewAddress({...newAddress, type: "OFFICE"})}
                                  >
                                    <Building className="h-4 w-4 mr-1" />
                                    OFFICE
                                  </Button>
                                </div>
                              </div>
                              
                              <div className="flex justify-end gap-2 pt-4">
                                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                                  Cancel
                                </Button>
                                <Button 
                                  className="bg-teal-500 hover:bg-teal-600"
                                  onClick={handleAddAddress}
                                  disabled={!newAddress.name || !newAddress.phone || !newAddress.address}
                                >
                                  SAVE
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        
                        {/* Address List */}
                        <div className="space-y-4">
                          {addresses.map((address) => (
                            <div
                              key={address.id}
                              className={`border rounded-xl p-5 transition-all duration-200 hover:shadow-md ${
                                selectedAddress.id === address.id 
                                  ? 'border-teal-500 bg-teal-50 shadow-sm' 
                                  : 'border-gray-200 hover:border-gray-300'
                              }`}
                            >
                              {/* Header Row */}
                              <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                                <div className="flex flex-wrap items-center gap-2 min-w-0 flex-1">
                                  <span className={`text-xs px-3 py-1 rounded-full text-white font-medium ${
                                    address.type === 'HOME' ? 'bg-orange-500' : 'bg-blue-500'
                                  }`}>
                                    {address.type}
                                  </span>
                                  <span className="font-semibold text-gray-900 truncate">{address.name}</span>
                                  <span className="text-gray-600 text-sm">{address.phone}</span>
                                  {address.isDefault && (
                                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                                      DEFAULT
                                    </span>
                                  )}
                                </div>
                                
                                {/* Action Buttons */}
                                <div className="flex items-center gap-1 flex-shrink-0">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleEditAddress(address);
                                    }}
                                    className="h-9 w-9 p-0 hover:bg-blue-100 hover:text-blue-600"
                                    title="Edit address"
                                  >
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleSetDefault(address.id);
                                    }}
                                    className={`h-9 w-9 p-0 ${
                                      address.isDefault 
                                        ? 'text-green-600 hover:bg-green-100' 
                                        : 'text-gray-400 hover:bg-gray-100 hover:text-green-600'
                                    }`}
                                    title={address.isDefault ? "Default address" : "Set as default"}
                                  >
                                    <Check className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                              
                              {/* Address Text */}
                              <div 
                                className="text-sm text-gray-600 leading-relaxed cursor-pointer hover:text-gray-800 transition-colors"
                                onClick={() => handleSelectAddress(address)}
                              >
                                <p className="break-words">
                                  {address.address}
                                </p>
                              </div>
                              
                              {/* Select Button for Mobile */}
                              <div className="mt-4 sm:hidden">
                                <Button
                                  variant={selectedAddress.id === address.id ? "default" : "outline"}
                                  size="sm"
                                  className="w-full"
                                  onClick={() => handleSelectAddress(address)}
                                >
                                  {selectedAddress.id === address.id ? 'Selected' : 'Select This Address'}
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        {/* Edit Address Dialog */}
                        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                          <DialogContent className="sm:max-w-[500px]">
                            <DialogHeader>
                              <DialogTitle>Edit shipping Address</DialogTitle>
                            </DialogHeader>
                            
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label htmlFor="edit-name">Full name</Label>
                                  <Input
                                    id="edit-name"
                                    placeholder="Please enter your full name"
                                    value={newAddress.name}
                                    onChange={(e) => setNewAddress({...newAddress, name: e.target.value})}
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="edit-phone">Phone Number</Label>
                                  <Input
                                    id="edit-phone"
                                    placeholder="Please enter your phone number"
                                    value={newAddress.phone}
                                    onChange={(e) => setNewAddress({...newAddress, phone: e.target.value})}
                                  />
                                </div>
                              </div>
                              
                              <div>
                                <Label htmlFor="edit-address">Address</Label>
                                <Textarea
                                  id="edit-address"
                                  placeholder="House number, Floor, Building name, Street name"
                                  value={newAddress.address}
                                  onChange={(e) => setNewAddress({...newAddress, address: e.target.value})}
                                  className="min-h-[80px]"
                                />
                              </div>
                              
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label htmlFor="edit-province">Province</Label>
                                  <Input
                                    id="edit-province"
                                    placeholder="Please select your province"
                                    value={newAddress.province}
                                    onChange={(e) => setNewAddress({...newAddress, province: e.target.value})}
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="edit-district">District</Label>
                                  <Input
                                    id="edit-district"
                                    placeholder="Please select your district"
                                    value={newAddress.district}
                                    onChange={(e) => setNewAddress({...newAddress, district: e.target.value})}
                                  />
                                </div>
                              </div>
                              
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label htmlFor="edit-subdistrict">Sub District</Label>
                                  <Input
                                    id="edit-subdistrict"
                                    placeholder="Please select your sub district"
                                    value={newAddress.subdistrict}
                                    onChange={(e) => setNewAddress({...newAddress, subdistrict: e.target.value})}
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="edit-zipcode">Postcode</Label>
                                  <Input
                                    id="edit-zipcode"
                                    placeholder="00000"
                                    value={newAddress.zipcode}
                                    onChange={(e) => setNewAddress({...newAddress, zipcode: e.target.value})}
                                  />
                                </div>
                              </div>
                              
                              <div>
                                <Label>Select a label for effective delivery</Label>
                                <div className="flex gap-2 mt-2">
                                  <Button
                                    variant={newAddress.type === "HOME" ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setNewAddress({...newAddress, type: "HOME"})}
                                  >
                                    <Home className="h-4 w-4 mr-1" />
                                    HOME
                                  </Button>
                                  <Button
                                    variant={newAddress.type === "OFFICE" ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setNewAddress({...newAddress, type: "OFFICE"})}
                                  >
                                    <Building className="h-4 w-4 mr-1" />
                                    OFFICE
                                  </Button>
                                </div>
                              </div>
                              
                              <div className="flex justify-end gap-2 pt-4">
                                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                                  Cancel
                                </Button>
                                <Button 
                                  className="bg-teal-500 hover:bg-teal-600"
                                  onClick={handleSaveEditedAddress}
                                  disabled={!newAddress.name || !newAddress.phone || !newAddress.address}
                                >
                                  SAVE
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </SheetContent>
                  </Sheet>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-orange-50 p-3 rounded border border-orange-200">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-white text-xs px-2 py-1 rounded ${
                      selectedAddress.type === 'HOME' ? 'bg-orange-500' : 'bg-blue-500'
                    }`}>
                      {selectedAddress.type}
                    </span>
                    <span className="font-medium">{selectedAddress.name}</span>
                    <span className="text-muted-foreground">{selectedAddress.phone}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {selectedAddress.address}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Package 1 */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Package 1 of 2</CardTitle>
                <p className="text-sm text-muted-foreground">Shipped by TechMall Official Store</p>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Delivery Options */}
                <div>
                  <h4 className="font-medium mb-3">Choose your delivery option</h4>
                  <RadioGroup value={deliveryOption} onValueChange={setDeliveryOption}>
                    <div className="border rounded-lg p-4 border-teal-500 bg-teal-50">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="standard" id="standard" className="text-teal-600" />
                        <Label htmlFor="standard" className="flex-1 cursor-pointer">
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="font-medium text-teal-800">฿19.52 <span className="text-gray-500 line-through text-sm">฿42.00</span></div>
                              <div className="text-sm text-gray-600">Standard</div>
                              <div className="text-sm text-gray-500">
                                Guaranteed by 9 Aug. Get ฿25 LinkRewards if your package arrives late.
                              </div>
                            </div>
                            <div className="w-5 h-5 rounded-full bg-teal-600 flex items-center justify-center">
                              <Check className="h-3 w-3 text-white" />
                            </div>
                          </div>
                        </Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                {/* Product Item */}
                <div className="border rounded-lg p-4 bg-gray-50">
                  <div className="flex gap-3">
                    <img 
                      src={checkoutItems[0]?.image}
                      alt={checkoutItems[0]?.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-sm">{checkoutItems[0]?.name}</h3>
                      <div className="flex justify-between items-center mt-2">
                        <div className="text-orange-600 font-bold">฿{checkoutItems[0]?.price.toLocaleString()}</div>
                        <div className="text-sm text-gray-600">Qty: {checkoutItems[0]?.quantity}</div>
                      </div>
                    </div>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-400 hover:text-red-500">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>ยืนยันการลบสินค้า</AlertDialogTitle>
                          <AlertDialogDescription>
                            คุณต้องการลบ "{checkoutItems[0]?.name}" ออกจากรายการสั่งซื้อหรือไม่?
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>ยกเลิก</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleRemoveItem(checkoutItems[0]?.id)}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            ลบ
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Package 2 */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Package 2 of 2</CardTitle>
                <p className="text-sm text-muted-foreground">Shipped by NetworkPro Store</p>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Delivery Options */}
                <div>
                  <h4 className="font-medium mb-3">Choose your delivery option</h4>
                  <RadioGroup value="express" onValueChange={() => {}}>
                    <div className="border rounded-lg p-4 border-teal-500 bg-teal-50">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="express" id="express" className="text-teal-600" />
                        <Label htmlFor="express" className="flex-1 cursor-pointer">
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="font-medium text-teal-800">฿13.48 <span className="text-gray-500 line-through text-sm">฿29.00</span></div>
                              <div className="text-sm text-gray-600">Standard</div>
                              <div className="text-sm text-gray-500">
                                Guaranteed by 9 Aug. Get ฿25 LinkRewards if your package arrives late.
                              </div>
                            </div>
                            <div className="w-5 h-5 rounded-full bg-teal-600 flex items-center justify-center">
                              <Check className="h-3 w-3 text-white" />
                            </div>
                          </div>
                        </Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                {/* Product Items */}
                <div className="space-y-3">
                  {checkoutItems.slice(1).map((item) => (
                    <div key={item.id} className="border rounded-lg p-4 bg-gray-50">
                      <div className="flex gap-3">
                        <img 
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium text-sm">{item.name}</h3>
                          <div className="flex justify-between items-center mt-2">
                            <div>
                              <div className="text-orange-600 font-bold">฿{item.price.toLocaleString()}</div>
                              {item.originalPrice && (
                                <div className="text-sm text-gray-500 line-through">฿{item.originalPrice.toLocaleString()}</div>
                              )}
                              {item.discount && (
                                <div className="text-sm text-orange-600">{item.discount}</div>
                              )}
                            </div>
                            <div className="text-sm text-gray-600">Qty: {item.quantity}</div>
                          </div>
                        </div>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-400 hover:text-red-500">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>ยืนยันการลบสินค้า</AlertDialogTitle>
                              <AlertDialogDescription>
                                คุณต้องการลบ "{item.name}" ออกจากรายการสั่งซื้อหรือไม่?
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>ยกเลิก</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleRemoveItem(item.id)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                ลบ
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Payment & Summary */}
          <div className="space-y-6">
            {/* Payment Method */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Select payment method</CardTitle>
                <Sheet open={isPaymentMethodsOpen} onOpenChange={setIsPaymentMethodsOpen}>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="sm" className="text-primary self-start p-0 h-auto">
                      View all methods »
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-[500px]">
                    <SheetHeader>
                      <SheetTitle>Select Payment Method</SheetTitle>
                    </SheetHeader>
                    
                    <div className="mt-4 space-y-3">
                      <h3 className="text-sm font-medium text-gray-700">Recommended method(s)</h3>
                      
                      {/* Credit/Debit Card */}
                      <div 
                        className={`flex items-center space-x-3 p-4 border-2 rounded-lg hover:border-primary/50 transition-colors cursor-pointer ${
                          paymentMethod === 'card' ? 'border-primary bg-primary/5' : 'border-gray-200'
                        }`}
                        onClick={() => setPaymentMethod('card')}
                      >
                        <div className="bg-blue-100 p-2 rounded-lg">
                          <CreditCard className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-gray-900">Credit/Debit Card</div>
                          <div className="text-sm text-gray-500">Credit/Debit Card</div>
                          <div className="flex items-center gap-1 mt-1">
                            <img src={mastercardLogo} alt="Mastercard" className="h-4 w-auto" />
                            <img src={jcbLogo} alt="JCB" className="h-4 w-auto" />
                            <img src={visaLogo} alt="Visa" className="h-4 w-auto" />
                          </div>
                        </div>
                        {paymentMethod === 'card' && <Check className="h-5 w-5 text-green-500" />}
                      </div>

                      <Separator />
                      
                      <h3 className="text-sm font-medium text-gray-700">Other Payment Methods</h3>
                      
                      {/* Cash on Delivery */}
                      <div 
                        className={`flex items-center space-x-3 p-4 border-2 rounded-lg hover:border-primary/50 transition-colors cursor-pointer ${
                          paymentMethod === 'cash' ? 'border-primary bg-primary/5' : 'border-gray-200'
                        }`}
                        onClick={() => setPaymentMethod('cash')}
                      >
                        <div className="bg-green-100 p-2 rounded-lg">
                          <Wallet className="h-6 w-6 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-gray-900">Cash on Delivery</div>
                          <div className="text-sm text-gray-500">Cash on Delivery</div>
                        </div>
                        {paymentMethod === 'cash' && <Check className="h-5 w-5 text-green-500" />}
                      </div>

                      {/* QR PromptPay */}
                      <div 
                        className={`flex items-center space-x-3 p-4 border-2 rounded-lg hover:border-primary/50 transition-colors cursor-pointer ${
                          paymentMethod === 'qr' ? 'border-primary bg-primary/5' : 'border-gray-200'
                        }`}
                        onClick={() => setPaymentMethod('qr')}
                      >
                        <div className="bg-blue-100 p-2 rounded-lg">
                          <QrCode className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-gray-900">QR PromptPay</div>
                          <div className="text-sm text-gray-500">Scan QR code to pay</div>
                        </div>
                        {paymentMethod === 'qr' && <Check className="h-5 w-5 text-green-500" />}
                      </div>

                      {/* LINE Pay */}
                      <div 
                        className={`flex items-center space-x-3 p-4 border-2 rounded-lg hover:border-primary/50 transition-colors cursor-pointer ${
                          paymentMethod === 'linepay' ? 'border-primary bg-primary/5' : 'border-gray-200'
                        }`}
                        onClick={() => setPaymentMethod('linepay')}
                      >
                        <div className="bg-green-100 p-2 rounded-lg">
                          <Smartphone className="h-6 w-6 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-gray-900">LINE Pay</div>
                          <div className="text-sm text-gray-500">Link your card or add sufficient funds before shopping</div>
                        </div>
                        {paymentMethod === 'linepay' && <Check className="h-5 w-5 text-green-500" />}
                      </div>

                      {/* Internet Banking */}
                      <div 
                        className={`flex items-center space-x-3 p-4 border-2 rounded-lg hover:border-primary/50 transition-colors cursor-pointer ${
                          paymentMethod === 'internetbanking' ? 'border-primary bg-primary/5' : 'border-gray-200'
                        }`}
                        onClick={() => setPaymentMethod('internetbanking')}
                      >
                        <div className="bg-blue-100 p-2 rounded-lg">
                          <Building2 className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-gray-900">Internet banking</div>
                          <div className="text-sm text-gray-500">Login with bank account to pay</div>
                        </div>
                        {paymentMethod === 'internetbanking' && <Check className="h-5 w-5 text-green-500" />}
                      </div>

                      {/* Bank Transfer */}
                      <div 
                        className={`flex items-center space-x-3 p-4 border-2 rounded-lg hover:border-primary/50 transition-colors cursor-pointer ${
                          paymentMethod === 'banktransfer' ? 'border-primary bg-primary/5' : 'border-gray-200'
                        }`}
                        onClick={() => setPaymentMethod('banktransfer')}
                      >
                        <div className="bg-purple-100 p-2 rounded-lg">
                          <ArrowLeftRight className="h-6 w-6 text-purple-600" />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-gray-900">Bank Transfer</div>
                          <div className="text-sm text-gray-500">Transfer money directly to merchant's bank account</div>
                        </div>
                        {paymentMethod === 'banktransfer' && <Check className="h-5 w-5 text-green-500" />}
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 mt-6">
                      <Button variant="outline" onClick={() => setIsPaymentMethodsOpen(false)}>
                        Cancel
                      </Button>
                      <Button 
                        className="bg-orange-500 hover:bg-orange-600 text-white"
                        onClick={handleConfirmPaymentMethods}
                      >
                        Confirm
                      </Button>
                    </div>
                  </SheetContent>
                </Sheet>
              </CardHeader>
              <CardContent className="space-y-3">
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  {/* Credit/Debit Card */}
                  <div className={`flex items-center space-x-2 p-4 border-2 rounded-lg hover:border-primary/50 transition-colors ${paymentMethod === 'card' ? 'border-primary bg-primary/5' : 'border-gray-200'}`}>
                    <RadioGroupItem value="card" id="card" />
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <CreditCard className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <Label htmlFor="card" className="cursor-pointer">
                        <div className="font-semibold text-gray-900">Credit/Debit Card</div>
                        <div className="text-sm text-gray-500">Credit/Debit Card</div>
                      </Label>
                      <div className="flex items-center gap-1 mt-2">
                        <img src={mastercardLogo} alt="Mastercard" className="h-4 w-auto" />
                        <img src={jcbLogo} alt="JCB" className="h-4 w-auto" />
                        <img src={visaLogo} alt="Visa" className="h-4 w-auto" />
                      </div>
                    </div>
                    {paymentMethod === 'card' && <Check className="h-5 w-5 text-green-500" />}
                  </div>
                  
                  {/* QR PromptPay */}
                  <div className={`flex items-center space-x-2 p-4 border-2 rounded-lg hover:border-primary/50 transition-colors ${paymentMethod === 'qr' ? 'border-primary bg-primary/5' : 'border-gray-200'}`}>
                    <RadioGroupItem value="qr" id="qr" />
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <QrCode className="h-6 w-6 text-blue-600" />
                    </div>
                    <Label htmlFor="qr" className="flex-1 cursor-pointer">
                      <div className="font-semibold text-gray-900">QR PromptPay</div>
                      <div className="text-sm text-gray-500">Scan QR code to pay</div>
                    </Label>
                    {paymentMethod === 'qr' && <Check className="h-5 w-5 text-green-500" />}
                  </div>

                  {/* Additional Payment Methods */}
                  {additionalPaymentMethods.map((method) => {
                    const methodInfo = getPaymentMethodInfo(method);
                    if (!methodInfo) return null;

                    return (
                      <div key={method} className={`flex items-center space-x-2 p-4 border-2 rounded-lg hover:border-primary/50 transition-colors ${paymentMethod === method ? 'border-primary bg-primary/5' : 'border-gray-200'}`}>
                        <RadioGroupItem value={method} id={method} />
                        <div className={`${methodInfo.bgColor} p-2 rounded-lg`}>
                          {methodInfo.icon}
                        </div>
                        <Label htmlFor={method} className="flex-1 cursor-pointer">
                          <div className="font-semibold text-gray-900">{methodInfo.name}</div>
                          <div className="text-sm text-gray-500">{methodInfo.description}</div>
                        </Label>
                        {paymentMethod === method && <Check className="h-5 w-5 text-green-500" />}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleRemovePaymentMethod(method);
                          }}
                          className="h-8 w-8 p-0 text-gray-400 hover:text-red-500"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    );
                  })}
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Voucher */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Voucher</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter Voucher Code"
                    value={voucherCode}
                    onChange={(e) => {
                      setVoucherCode(e.target.value);
                      setVoucherError(""); // Clear error when typing
                    }}
                    className="flex-1"
                  />
                  <Button 
                    variant="outline" 
                    className="bg-teal-500 text-white border-teal-500 hover:bg-teal-600"
                    onClick={handleApplyVoucher}
                  >
                    APPLY
                  </Button>
                </div>
                
                {/* Error Message */}
                {voucherError && (
                  <div className="mt-2 text-sm text-red-600">
                    {voucherError}
                  </div>
                )}
                
                {/* Applied Vouchers Display */}
                {appliedVouchers.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {appliedVouchers.map((voucher) => (
                      <div key={voucher.code} className="p-3 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-600" />
                            <span className="font-medium text-green-800">{voucher.code}</span>
                            <span className="text-sm text-green-600">ใช้แล้ว</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-green-600 font-medium">-฿{voucher.discount}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveVoucher(voucher.code)}
                              className="h-6 w-6 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Invoice and Contact Info */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between text-lg">
                  Invoice and Contact Info
                  <Sheet open={isInvoiceSheetOpen} onOpenChange={setIsInvoiceSheetOpen}>
                    <SheetTrigger asChild>
                      <Button variant="ghost" size="sm" className="text-primary">
                        Edit
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-[500px]">
                      <SheetHeader>
                        <SheetTitle>Invoice and Contact Info</SheetTitle>
                      </SheetHeader>
                      
                      <div className="mt-6 space-y-6">
                        {/* Email */}
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-sm font-medium">* Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={invoiceInfo.email}
                            onChange={(e) => setInvoiceInfo(prev => ({ ...prev, email: e.target.value }))}
                            placeholder="Enter your email for get delivery status updates"
                          />
                        </div>

                        {/* Billing Address */}
                        <div className="space-y-2">
                          <Label className="text-sm font-medium">* Billing Address</Label>
                          <Textarea
                            value={invoiceInfo.billingAddress}
                            onChange={(e) => setInvoiceInfo(prev => ({ ...prev, billingAddress: e.target.value }))}
                            rows={4}
                            className="resize-none"
                          />
                          <p className="text-xs text-gray-500">
                            Click to edit your billing information to be used for issuing tax invoice. *Please 
                            input your full name in the Required field.
                          </p>
                        </div>

                        {/* Company/Personal Tax ID */}
                        <div className="space-y-2">
                          <Label htmlFor="taxId" className="text-sm font-medium">Company/Personal Tax ID</Label>
                          <Input
                            id="taxId"
                            value={invoiceInfo.taxId}
                            onChange={(e) => setInvoiceInfo(prev => ({ ...prev, taxId: e.target.value }))}
                            placeholder="Please enter a valid Tax ID"
                            className="border-red-200"
                          />
                          <p className="text-xs text-red-500">
                            Please input your company/personal tax ID to get invoice
                          </p>
                        </div>

                        {/* Head office/Branch ID */}
                        <div className="space-y-2">
                          <Label htmlFor="headOfficeBranch" className="text-sm font-medium">Head office/Branch ID (for company)</Label>
                          <Input
                            id="headOfficeBranch"
                            value={invoiceInfo.headOfficeBranch}
                            onChange={(e) => setInvoiceInfo(prev => ({ ...prev, headOfficeBranch: e.target.value }))}
                            placeholder="Please input head office/branch to get invoice"
                          />
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3 mt-8">
                        <Button 
                          variant="outline" 
                          className="flex-1"
                          onClick={() => setIsInvoiceSheetOpen(false)}
                        >
                          CANCEL
                        </Button>
                        <Button 
                          className="flex-1 bg-teal-500 hover:bg-teal-600 text-white"
                          onClick={handleSaveInvoiceInfo}
                        >
                          SAVE
                        </Button>
                      </div>
                    </SheetContent>
                  </Sheet>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm">
                  <p className="font-medium">Email</p>
                  <p className="text-gray-600">{invoiceInfo.email}</p>
                </div>
                <div className="text-sm">
                  <p className="font-medium">Billing Address</p>
                  <p className="text-gray-600 whitespace-pre-line">{invoiceInfo.billingAddress}</p>
                </div>
                {invoiceInfo.taxId && (
                  <div className="text-sm">
                    <p className="font-medium">Tax ID</p>
                    <p className="text-gray-600">{invoiceInfo.taxId}</p>
                  </div>
                )}
                {invoiceInfo.headOfficeBranch && (
                  <div className="text-sm">
                    <p className="font-medium">Head office/Branch ID</p>
                    <p className="text-gray-600">{invoiceInfo.headOfficeBranch}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Order Detail */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">ORDER DETAIL</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Subtotal ({checkoutItems.length} items)</span>
                  <span>฿{subtotal.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span>Shipping Fee</span>
                  <span className={shippingFee === 0 ? "text-green-600" : ""}>
                    {shippingFee === 0 ? "฿65.00" : `฿${shippingFee}`}
                  </span>
                </div>
                
                {voucherDiscount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span>Voucher discount</span>
                    <span className="text-green-600">-฿{voucherDiscount.toLocaleString()}</span>
                  </div>
                )}
                
                <div className="flex justify-between text-sm">
                  <span>Shipping discount</span>
                  <span className="text-green-600">-฿65.00</span>
                </div>
                
                <Separator />
                
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-orange-600">฿{total.toLocaleString()}</span>
                </div>
                
                <Button className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white" size="lg">
                  PLACE ORDER NOW
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}