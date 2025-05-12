import React, { useState } from "react";
import { User, Send, PaperclipIcon, DollarSign, Calendar, FileText, ChevronDown } from "lucide-react";
import { useForm } from "react-hook-form";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

// Dummy data for the chat
const chatData = {
  tripTitle: "Sacred Temples of Bali Tour",
  participants: [
    {
      id: 1,
      name: "Emily Wong",
      avatar: "https://i.pravatar.cc/150?img=1",
      role: "agent",
    },
    {
      id: 2,
      name: "John Smith",
      avatar: "https://i.pravatar.cc/150?img=3",
      role: "traveler",
      paymentStatus: {
        paid: 899.40,
        total: 1499,
        lastPayment: "2025-04-18",
        nextPayment: {
          amount: 599.60,
          dueDate: "2025-05-15"
        },
        paymentSchedule: [
          { description: "Deposit (20%)", amount: 299.80, dueDate: "2025-04-18", status: "paid" },
          { description: "Second payment (40%)", amount: 599.60, dueDate: "2025-04-18", status: "paid" },
          { description: "Final payment (40%)", amount: 599.60, dueDate: "2025-05-15", status: "upcoming" }
        ]
      }
    },
    {
      id: 3,
      name: "Sarah Johnson",
      avatar: "https://i.pravatar.cc/150?img=5",
      role: "traveler",
      paymentStatus: {
        paid: 299.80,
        total: 1499,
        lastPayment: "2025-04-10",
        nextPayment: {
          amount: 599.60,
          dueDate: "2025-05-01"
        },
        paymentSchedule: [
          { description: "Deposit (20%)", amount: 299.80, dueDate: "2025-04-10", status: "paid" },
          { description: "Second payment (40%)", amount: 599.60, dueDate: "2025-05-01", status: "upcoming" },
          { description: "Final payment (40%)", amount: 599.60, dueDate: "2025-06-01", status: "upcoming" }
        ]
      }
    },
    {
      id: 4,
      name: "Michael Chen",
      avatar: "https://i.pravatar.cc/150?img=8",
      role: "traveler",
      paymentStatus: {
        paid: 1499,
        total: 1499,
        lastPayment: "2025-04-05",
        nextPayment: null,
        paymentSchedule: [
          { description: "Full payment", amount: 1499, dueDate: "2025-04-05", status: "paid" }
        ]
      }
    }
  ],
  messages: [
    {
      id: 1,
      senderId: 1,
      text: "Hello everyone! Welcome to our Sacred Temples of Bali Tour chat. I'll be your guide for this amazing journey. Feel free to ask any questions about the trip!",
      timestamp: "2025-04-02T09:00:00",
      readBy: [2, 3, 4]
    },
    {
      id: 2,
      senderId: 2,
      text: "Hi Emily! I'm excited about the trip. Can you tell me more about the weather in Bali during June?",
      timestamp: "2025-04-02T09:15:00",
      readBy: [1, 3, 4]
    },
    {
      id: 3,
      senderId: 1,
      text: "Great question, John! June is during the dry season in Bali, so you can expect sunny days with temperatures around 27-30°C (80-86°F). Evenings can be slightly cooler, so I'd recommend bringing a light jacket or shawl for temple visits in the evening.",
      timestamp: "2025-04-02T09:20:00",
      readBy: [2, 3, 4]
    },
    {
      id: 4,
      senderId: 3,
      text: "Thanks for the info! What about currency? Should we exchange money before arriving or can we easily find ATMs?",
      timestamp: "2025-04-02T10:05:00",
      readBy: [1, 2, 4]
    },
    {
      id: 5,
      senderId: 1,
      text: "The local currency is Indonesian Rupiah (IDR). I'd recommend exchanging a small amount before arrival for immediate expenses, but ATMs are widely available in tourist areas and major cities. Most hotels and restaurants in tourist areas also accept credit cards.",
      timestamp: "2025-04-02T10:15:00",
      readBy: [2, 3, 4]
    },
    {
      id: 6,
      senderId: 4,
      text: "Hi everyone! I've already paid in full for the trip. Looking forward to meeting you all in Bali!",
      timestamp: "2025-04-05T14:30:00",
      readBy: [1, 2, 3]
    },
    {
      id: 7,
      senderId: 1,
      text: "Great to hear, Michael! Indeed, I can confirm your payment has been received. For others, please remember the payment schedule and let me know if you have any questions about the upcoming payments.",
      timestamp: "2025-04-05T14:45:00",
      readBy: [2, 3, 4]
    },
    {
      id: 8,
      senderId: 1,
      text: "I've just uploaded the detailed packing list to our documents section. Please check it out and let me know if you have any questions!",
      timestamp: "2025-04-10T11:00:00",
      readBy: [2, 3, 4],
      attachment: {
        name: "Bali_Packing_List.pdf",
        type: "pdf",
        size: "1.2 MB"
      }
    },
    {
      id: 9,
      senderId: 2,
      text: "Thanks! Just made my second payment. Quick question - do we need special clothing for the temple visits?",
      timestamp: "2025-04-18T16:20:00",
      readBy: [1, 3]
    },
    {
      id: 10,
      senderId: 1,
      text: "Yes, for temple visits, both men and women should cover their shoulders and wear sarongs or long pants that cover the knees. Most temples provide sarongs for rent or loan, but it's good to bring your own light scarf or sarong just in case.",
      timestamp: "2025-04-18T16:35:00",
      readBy: [2, 3]
    }
  ],
  documents: [
    {
      name: "Detailed_Itinerary.pdf",
      uploadDate: "2025-04-01",
      size: "2.3 MB",
      type: "pdf"
    },
    {
      name: "Bali_Packing_List.pdf",
      uploadDate: "2025-04-10",
      size: "1.2 MB",
      type: "pdf"
    },
    {
      name: "Cultural_Guidelines.docx",
      uploadDate: "2025-04-15",
      size: "680 KB",
      type: "docx"
    }
  ]
};

interface ChatFormData {
  message: string;
}

export default function GuidedChatPage() {
  const [expandedPayment, setExpandedPayment] = useState<number | null>(null);
  const { register, handleSubmit, reset } = useForm<ChatFormData>();
  
  const currentUser = chatData.participants[0]; // Assuming agent is the current user
  const travelers = chatData.participants.filter(p => p.role === "traveler");
  
  const onSendMessage = (data: ChatFormData) => {
    if (data.message.trim()) {
      console.log("Message sent:", data.message);
      reset();
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <h1 className="text-3xl font-bold mb-6">Guided Chat & Payment Tracker</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {/* Chat section */}
          <Card className="h-[calc(100vh-170px)] flex flex-col">
            <CardHeader className="pb-2">
              <CardTitle>{chatData.tripTitle}</CardTitle>
              <CardDescription>Chat with participants</CardDescription>
            </CardHeader>

            <Separator />
            
            {/* Chat messages area */}
            <CardContent className="flex-1 overflow-hidden p-0">
              <ScrollArea className="h-[calc(100vh-290px)] p-4">
                <div className="space-y-4">
                  {chatData.messages.map((message) => {
                    const sender = chatData.participants.find(p => p.id === message.senderId);
                    const isOwnMessage = message.senderId === currentUser.id;
                    
                    return (
                      <div key={message.id} className={cn(
                        "flex gap-3",
                        isOwnMessage ? "justify-end pl-10" : "pr-10"
                      )}>
                        {!isOwnMessage && (
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={sender?.avatar} />
                            <AvatarFallback>
                              {sender?.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                        )}
                        
                        <div className={cn(
                          "rounded-lg p-3 max-w-[80%]",
                          isOwnMessage
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        )}>
                          <div className="flex justify-between items-baseline gap-2 mb-1">
                            <span className={cn(
                              "text-xs font-medium",
                              isOwnMessage ? "text-primary-foreground/80" : "text-muted-foreground"
                            )}>
                              {sender?.name}
                            </span>
                            <span className={cn(
                              "text-xs",
                              isOwnMessage ? "text-primary-foreground/60" : "text-muted-foreground/60"
                            )}>
                              {format(new Date(message.timestamp), "h:mm a")}
                            </span>
                          </div>
                          
                          <p className="text-sm whitespace-pre-line break-words">
                            {message.text}
                          </p>
                          
                          {message.attachment && (
                            <div className={cn(
                              "mt-2 flex items-center gap-2 p-2 rounded",
                              isOwnMessage ? "bg-primary-foreground/10" : "bg-background"
                            )}>
                              <FileText className="h-4 w-4" />
                              <span className="text-xs">{message.attachment.name}</span>
                              <span className="text-xs opacity-70">({message.attachment.size})</span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>
            </CardContent>
            
            <Separator />
            
            {/* Message input */}
            <CardContent className="p-4">
              <form onSubmit={handleSubmit(onSendMessage)} className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="shrink-0"
                >
                  <PaperclipIcon className="h-4 w-4" />
                </Button>
                <Input
                  placeholder="Type your message..."
                  className="flex-1"
                  {...register("message", { required: true })}
                />
                <Button type="submit" className="shrink-0">
                  <Send className="h-4 w-4 mr-2" />
                  Send
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          {/* Payment tracker */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Payment Tracker</CardTitle>
              <CardDescription>Monitor participant payments</CardDescription>
            </CardHeader>
            
            <Separator />
            
            <CardContent className="p-0">
              <div className="divide-y">
                {travelers.map((traveler) => {
                  const paymentStatus = traveler.paymentStatus!;
                  const percentPaid = Math.round((paymentStatus.paid / paymentStatus.total) * 100);
                  const isExpanded = expandedPayment === traveler.id;
                  
                  return (
                    <Collapsible
                      key={traveler.id}
                      open={isExpanded}
                      onOpenChange={() => setExpandedPayment(isExpanded ? null : traveler.id)}
                    >
                      <div className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={traveler.avatar} />
                              <AvatarFallback>
                                {traveler.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium leading-none">{traveler.name}</div>
                              <div className="text-xs text-muted-foreground mt-1">
                                {paymentStatus.nextPayment
                                  ? `Next payment: ${format(new Date(paymentStatus.nextPayment.dueDate), "MMM d, yyyy")}`
                                  : "Fully paid"}
                              </div>
                            </div>
                          </div>
                          
                          <CollapsibleTrigger asChild>
                            <Button variant="ghost" size="sm" className="gap-1 h-7">
                              {percentPaid === 100 ? "Paid" : `${percentPaid}%`}
                              <ChevronDown className="h-4 w-4 transition-transform duration-200" 
                                style={{ transform: isExpanded ? 'rotate(-180deg)' : 'rotate(0)' }}
                              />
                            </Button>
                          </CollapsibleTrigger>
                        </div>
                        
                        <div className="mt-3">
                          <div className="flex justify-between text-xs mb-1.5">
                            <span className="text-muted-foreground">
                              ${paymentStatus.paid.toFixed(2)} paid
                            </span>
                            <span>${paymentStatus.total.toFixed(2)}</span>
                          </div>
                          <Progress value={percentPaid} className="h-2" />
                        </div>
                        
                        <CollapsibleContent>
                          <div className="mt-4 pt-3 border-t">
                            <h4 className="text-sm font-medium mb-3">Payment Schedule</h4>
                            
                            {paymentStatus.paymentSchedule.map((payment, index) => (
                              <div 
                                key={index} 
                                className="flex items-center justify-between py-2 text-sm"
                              >
                                <div className="flex items-center gap-2">
                                  {payment.status === "paid" ? (
                                    <Badge className="bg-green-500 hover:bg-green-500/90">Paid</Badge>
                                  ) : (
                                    <Badge className="bg-amber-500 hover:bg-amber-500/90">Upcoming</Badge>
                                  )}
                                  <span>{payment.description}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                  <span className="text-muted-foreground">
                                    {format(new Date(payment.dueDate), "MMM d, yyyy")}
                                  </span>
                                  <span className="font-medium">${payment.amount.toFixed(2)}</span>
                                </div>
                              </div>
                            ))}
                            
                            <div className="mt-4 flex justify-end gap-2">
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button size="sm" variant="outline">
                                      <FileText className="h-3.5 w-3.5 mr-1" />
                                      Invoice
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>View or send invoice</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                              
                              <Button size="sm" variant="outline">
                                <Calendar className="h-3.5 w-3.5 mr-1" />
                                Payment History
                              </Button>
                            </div>
                          </div>
                        </CollapsibleContent>
                      </div>
                    </Collapsible>
                  );
                })}
              </div>
            </CardContent>
          </Card>
          
          {/* Trip Documents */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Trip Documents</CardTitle>
              <CardDescription>Shared files and resources</CardDescription>
            </CardHeader>
            
            <Separator />
            
            <CardContent className="p-4">
              <div className="space-y-2">
                {chatData.documents.map((doc, index) => (
                  <div 
                    key={index} 
                    className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded-md">
                        <FileText className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <div className="text-sm font-medium">{doc.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {format(new Date(doc.uploadDate), "MMM d, yyyy")} • {doc.size}
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      Download
                    </Button>
                  </div>
                ))}
              </div>
              
              <div className="mt-4">
                <Button variant="outline" className="w-full">
                  <PaperclipIcon className="h-4 w-4 mr-2" />
                  Upload Document
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Payment Summary */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Payment Summary</CardTitle>
            </CardHeader>
            
            <Separator />
            
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total participants</span>
                  <span className="font-medium">{travelers.length}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total collected</span>
                  <span className="font-medium">
                    ${travelers.reduce((sum, t) => sum + t.paymentStatus!.paid, 0).toFixed(2)}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total outstanding</span>
                  <span className="font-medium text-amber-600">
                    ${travelers.reduce((sum, t) => {
                      const { paid, total } = t.paymentStatus!;
                      return sum + (total - paid);
                    }, 0).toFixed(2)}
                  </span>
                </div>
                
                <Separator />
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total trip value</span>
                  <span className="font-medium text-lg">
                    ${travelers.reduce((sum, t) => sum + t.paymentStatus!.total, 0).toFixed(2)}
                  </span>
                </div>
              </div>
              
              <Button className="w-full mt-4" variant="outline">
                <DollarSign className="h-4 w-4 mr-2" />
                Generate Payment Report
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
