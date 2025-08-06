import { useState, useEffect } from "react";
import { ArrowLeft, MapPin, Truck, CreditCard, Wallet, Plus, Home, Building, Edit, Check, QrCode } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

// Mock data for checkout items (in real app, this would come from state/props)
const checkoutItems = [
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
  const [addresses, setAddresses] = useState(initialAddresses);
  const [selectedAddress, setSelectedAddress] = useState(initialAddresses[0]);
  const [isAddressSheetOpen, setIsAddressSheetOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<any>(null);
  
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
  const shippingDiscount = 0; // Could be calculated based on voucher
  const total = subtotal + shippingFee - shippingDiscount;

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

            {/* Package and Delivery */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Package 1 of 1</CardTitle>
                <p className="text-sm text-muted-foreground">Shipped by การแพตเซอเรวิ</p>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Delivery Options */}
                <div>
                  <h4 className="font-medium mb-3">Choose your delivery option</h4>
                  <RadioGroup value={deliveryOption} onValueChange={setDeliveryOption}>
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="standard" id="standard" />
                        <Label htmlFor="standard" className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="font-medium">฿7.00 Standard</div>
                              <div className="text-sm text-muted-foreground">
                                Guaranteed by 9 Aug. Get ฿25 Cashback if your package arrives late.
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm text-muted-foreground line-through">฿65.00</div>
                              <div className="font-medium">ฟรี</div>
                            </div>
                          </div>
                        </Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                {/* Product Item */}
                <div className="border rounded-lg p-4 bg-muted/30">
                  <div className="flex gap-3">
                    <img 
                      src="https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=80&h=80&fit=crop"
                      alt="Product"
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-sm">กาแฟอำราป้มำ ชำยขำยพ่วม เรน้น 125ml ขิงชิ</h3>
                      <div className="flex justify-between items-center mt-2">
                        <div className="text-orange-600 font-bold">฿99.00</div>
                        <div className="text-sm text-muted-foreground">Qty: 1</div>
                      </div>
                    </div>
                  </div>
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
                <Button variant="ghost" size="sm" className="text-primary self-start p-0 h-auto">
                  View all methods »
                </Button>
              </CardHeader>
              <CardContent className="space-y-3">
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  {/* Credit/Debit Card */}
                  <div className="flex items-center space-x-2 p-4 border rounded-lg hover:border-primary/50 transition-colors">
                    <RadioGroupItem value="card" id="card" />
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <CreditCard className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <Label htmlFor="card" className="cursor-pointer">
                        <div className="font-semibold text-gray-900">Credit/Debit Card</div>
                        <div className="text-sm text-gray-500">Credit/Debit Card</div>
                      </Label>
                      <div className="flex items-center gap-2 mt-2">
                        <img src={mastercardLogo} alt="Mastercard" className="h-6 w-auto" />
                        <img src={jcbLogo} alt="JCB" className="h-6 w-auto" />
                        <img src={visaLogo} alt="Visa" className="h-6 w-auto" />
                      </div>
                    </div>
                    <Check className="h-5 w-5 text-green-500" />
                  </div>
                  
                  {/* QR PromptPay */}
                  <div className="flex items-center space-x-2 p-4 border rounded-lg hover:border-primary/50 transition-colors">
                    <RadioGroupItem value="qr" id="qr" />
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <QrCode className="h-6 w-6 text-blue-600" />
                    </div>
                    <Label htmlFor="qr" className="flex-1 cursor-pointer">
                      <div className="font-semibold text-gray-900">QR PromptPay</div>
                      <div className="text-sm text-gray-500">Scan QR code to pay</div>
                    </Label>
                    <Check className="h-5 w-5 text-green-500" />
                  </div>
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
                    onChange={(e) => setVoucherCode(e.target.value)}
                    className="flex-1"
                  />
                  <Button variant="outline" className="bg-teal-500 text-white border-teal-500 hover:bg-teal-600">
                    APPLY
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Invoice and Contact Info */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Invoice and Contact Info</CardTitle>
                <Button variant="ghost" size="sm" className="text-primary self-start p-0 h-auto">
                  Edit
                </Button>
              </CardHeader>
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
                
                <div className="flex justify-between text-sm">
                  <span>Shipping discount and voucher</span>
                  <span className="text-green-600">-฿{(65 + shippingDiscount).toLocaleString()}</span>
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