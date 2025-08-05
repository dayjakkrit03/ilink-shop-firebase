import { useState } from "react";
import { MessageCircle, Send, Image, Gift } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

// Mock chat messages
const chatMessages = [
  {
    id: 1,
    type: "text",
    content: "สวัสดีครับ! ยินดีต้อนรับสู่ร้านอุปกรณ์เครือข่าย",
    sender: "shop",
    timestamp: "09:30",
    senderName: "ร้านค้า"
  },
  {
    id: 2,
    type: "coupon",
    content: "คูปองส่วนลด 10% สำหรับลูกค้าใหม่",
    discount: "10%",
    code: "NEW10",
    sender: "shop",
    timestamp: "09:35",
    senderName: "ร้านค้า"
  },
  {
    id: 3,
    type: "image",
    content: "สินค้าแนะนำประจำสัปดาห์",
    imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=300&h=200&fit=crop",
    sender: "shop",
    timestamp: "10:15",
    senderName: "ร้านค้า"
  },
  {
    id: 4,
    type: "text",
    content: "ขอบคุณครับ! สนใจสินค้าไหนสามารถสอบถามได้เลยนะครับ",
    sender: "user",
    timestamp: "10:20",
    senderName: "คุณ"
  }
];

export const MessageChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(chatMessages);
  const [newMessage, setNewMessage] = useState("");
  const [unreadCount] = useState(2);

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: messages.length + 1,
        type: "text" as const,
        content: newMessage,
        sender: "user" as const,
        timestamp: new Date().toLocaleTimeString('th-TH', { 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
        senderName: "คุณ"
      };
      setMessages([...messages, message]);
      setNewMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          className="fixed right-4 bottom-4 z-50 w-14 h-14 rounded-full shadow-lg bg-primary hover:bg-primary/90 border-2 border-background"
          size="icon"
        >
          <MessageCircle className="h-6 w-6" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-red-500">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      
      <SheetContent side="right" className="w-96 sm:max-w-md p-0 flex flex-col">
        <SheetHeader className="p-4 border-b">
          <SheetTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            ข้อความจากร้านค้า
          </SheetTitle>
        </SheetHeader>
        
        <div className="flex flex-col h-full">
          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] ${message.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'} rounded-lg p-3`}>
                    <div className="text-xs opacity-70 mb-1">{message.senderName}</div>
                    
                    {message.type === 'text' && (
                      <p className="text-sm">{message.content}</p>
                    )}
                    
                    {message.type === 'coupon' && (
                      <div className="bg-gradient-to-r from-orange-400 to-red-500 text-white p-3 rounded-md">
                        <div className="flex items-center gap-2 mb-2">
                          <Gift className="h-4 w-4" />
                          <span className="font-bold">คูปองพิเศษ!</span>
                        </div>
                        <p className="text-sm mb-2">{message.content}</p>
                        <div className="bg-white/20 rounded px-2 py-1 text-center">
                          <span className="font-mono text-lg">{message.code}</span>
                        </div>
                        <p className="text-xs mt-1 opacity-90">คัดลอกรหัสเพื่อใช้ส่วนลด</p>
                      </div>
                    )}
                    
                    {message.type === 'image' && (
                      <div>
                        <p className="text-sm mb-2">{message.content}</p>
                        <img 
                          src={message.imageUrl} 
                          alt="รูปภาพจากร้านค้า"
                          className="w-full rounded-md"
                        />
                      </div>
                    )}
                    
                    <div className="text-xs opacity-60 mt-2">{message.timestamp}</div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          
          {/* Message Input */}
          <div className="border-t p-4">
            <div className="flex items-center gap-2">
              <Input
                placeholder="พิมพ์ข้อความ..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
              />
              <Button 
                size="icon" 
                onClick={sendMessage}
                disabled={!newMessage.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};