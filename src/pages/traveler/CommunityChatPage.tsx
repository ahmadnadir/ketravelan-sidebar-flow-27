import React, { useState } from "react";
import { Send, User, Plus, DollarSign, MessageSquare, Wallet } from "lucide-react";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";

// Types
type Message = {
  id: string;
  sender: {
    id: string;
    name: string;
    avatar: string;
  };
  content: string;
  timestamp: Date;
  isCurrentUser: boolean;
};

type Expense = {
  id: string;
  title: string;
  amount: number;
  paidBy: {
    id: string;
    name: string;
    avatar: string;
  };
  date: Date;
  splitBetween: string[];
};

type Balance = {
  userId: string;
  name: string;
  avatar: string;
  amount: number;
};

// Mock data
const tripTitle = "Exploring Bali's Hidden Gems";
const currentUser = { id: "user-current", name: "You" };

const messages: Message[] = [
  {
    id: "msg1",
    sender: { id: "user-1", name: "Sarah Chen", avatar: "https://i.pravatar.cc/150?u=sarah" },
    content: "Hi everyone! So excited for our Bali trip! I've updated our itinerary with some new spots.",
    timestamp: new Date(2025, 4, 10, 9, 0),
    isCurrentUser: false,
  },
  {
    id: "msg2",
    sender: { id: "user-2", name: "Miguel Torres", avatar: "https://i.pravatar.cc/150?u=miguel" },
    content: "Can't wait! Has everyone booked their flights yet?",
    timestamp: new Date(2025, 4, 10, 9, 5),
    isCurrentUser: false,
  },
  {
    id: "msg3",
    sender: { id: "user-3", name: "Aisha Patel", avatar: "https://i.pravatar.cc/150?u=aisha" },
    content: "I just did! Arriving on the 14th at 2pm.",
    timestamp: new Date(2025, 4, 10, 9, 15),
    isCurrentUser: false,
  },
  {
    id: "msg4",
    sender: { id: "user-current", name: "You", avatar: "https://i.pravatar.cc/150?u=current" },
    content: "I'm still comparing prices. Any recommendations for which airline to use?",
    timestamp: new Date(2025, 4, 10, 9, 20),
    isCurrentUser: true,
  },
  {
    id: "msg5",
    sender: { id: "user-1", name: "Sarah Chen", avatar: "https://i.pravatar.cc/150?u=sarah" },
    content: "I got a good deal with Singapore Airlines. Also, I've added our first dinner to the expenses. Can everyone check if the split looks right?",
    timestamp: new Date(2025, 4, 10, 9, 25),
    isCurrentUser: false,
  }
];

const expenses: Expense[] = [
  {
    id: "exp1",
    title: "Welcome Dinner Reservation",
    amount: 400,
    paidBy: { id: "user-1", name: "Sarah Chen", avatar: "https://i.pravatar.cc/150?u=sarah" },
    date: new Date(2025, 5, 15),
    splitBetween: ["user-1", "user-2", "user-3", "user-4", "user-5", "user-current"]
  },
  {
    id: "exp2",
    title: "Transport from Airport",
    amount: 120,
    paidBy: { id: "user-2", name: "Miguel Torres", avatar: "https://i.pravatar.cc/150?u=miguel" },
    date: new Date(2025, 5, 15),
    splitBetween: ["user-1", "user-2", "user-3", "user-current"]
  },
  {
    id: "exp3",
    title: "Snorkeling Equipment Rental",
    amount: 250,
    paidBy: { id: "user-3", name: "Aisha Patel", avatar: "https://i.pravatar.cc/150?u=aisha" },
    date: new Date(2025, 5, 17),
    splitBetween: ["user-1", "user-2", "user-3", "user-4", "user-current"]
  }
];

const balances: Balance[] = [
  { userId: "user-current", name: "You", avatar: "https://i.pravatar.cc/150?u=current", amount: -80 },
  { userId: "user-1", name: "Sarah Chen", avatar: "https://i.pravatar.cc/150?u=sarah", amount: 150 },
  { userId: "user-2", name: "Miguel Torres", avatar: "https://i.pravatar.cc/150?u=miguel", amount: 30 },
  { userId: "user-3", name: "Aisha Patel", avatar: "https://i.pravatar.cc/150?u=aisha", amount: 200 },
  { userId: "user-4", name: "David Kim", avatar: "https://i.pravatar.cc/150?u=david", amount: -150 },
  { userId: "user-5", name: "Olivia Johnson", avatar: "https://i.pravatar.cc/150?u=olivia", amount: -150 }
];

// Form schema for adding an expense
const expenseSchema = z.object({
  title: z.string().min(3, { message: "Title is required" }),
  amount: z.number().min(1, { message: "Amount must be greater than 0" }),
  splitBetween: z.array(z.string()).min(1, { message: "Select at least one person" }),
  date: z.date()
});

export default function CommunityChatPage() {
  const [newMessage, setNewMessage] = useState("");
  const [isExpenseDialogOpen, setIsExpenseDialogOpen] = useState(false);
  const [activeView, setActiveView] = useState("chat"); // "chat", "expenses", or "balances"
  const isMobile = useIsMobile();

  const expenseForm = useForm<z.infer<typeof expenseSchema>>({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      title: "",
      amount: 0,
      splitBetween: ["user-current"],
      date: new Date()
    }
  });
  
  const sendMessage = () => {
    if (newMessage.trim() === "") return;
    
    // In a real app, this would send the message to a backend
    console.log("Sending message:", newMessage);
    
    // Clear the input
    setNewMessage("");
    
    toast({
      title: "Message sent",
      description: "Your message has been sent to the group.",
    });
  };
  
  const handleAddExpense = (data: z.infer<typeof expenseSchema>) => {
    console.log("New expense:", data);
    setIsExpenseDialogOpen(false);
    
    toast({
      title: "Expense Added",
      description: "Your expense has been added and split with the group.",
    });
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(part => part[0]).join('');
  };

  const members = [
    { id: "user-1", name: "Sarah Chen", avatar: "https://i.pravatar.cc/150?u=sarah" },
    { id: "user-2", name: "Miguel Torres", avatar: "https://i.pravatar.cc/150?u=miguel" },
    { id: "user-3", name: "Aisha Patel", avatar: "https://i.pravatar.cc/150?u=aisha" },
    { id: "user-4", name: "David Kim", avatar: "https://i.pravatar.cc/150?u=david" },
    { id: "user-5", name: "Olivia Johnson", avatar: "https://i.pravatar.cc/150?u=olivia" },
    { id: "user-current", name: "You", avatar: "https://i.pravatar.cc/150?u=current" }
  ];

  // Component for expense form that can be used in both dialog and sheet
  const ExpenseForm = ({ onSubmit, onOpenChange }) => (
    <Form {...expenseForm}>
      <form onSubmit={expenseForm.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={expenseForm.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Expense Title</FormLabel>
              <FormControl>
                <Input placeholder="Dinner at Beach Restaurant" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={expenseForm.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount ($)</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  min="0" 
                  step="0.01" 
                  placeholder="0.00" 
                  onChange={e => field.onChange(parseFloat(e.target.value))}
                  value={field.value}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="space-y-2">
          <FormLabel>Split Between</FormLabel>
          <div className="grid grid-cols-2 gap-2">
            {members.map((member) => (
              <div key={member.id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id={`member-${member.id}`}
                  className="form-checkbox h-4 w-4"
                  defaultChecked={member.id === currentUser.id}
                  onChange={(e) => {
                    const currentValues = expenseForm.getValues("splitBetween");
                    if (e.target.checked) {
                      if (!currentValues.includes(member.id)) {
                        expenseForm.setValue("splitBetween", [...currentValues, member.id]);
                      }
                    } else {
                      expenseForm.setValue(
                        "splitBetween",
                        currentValues.filter((id) => id !== member.id)
                      );
                    }
                  }}
                />
                <label htmlFor={`member-${member.id}`} className="text-sm">
                  {member.name}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button type="submit">Add Expense</Button>
        </div>
      </form>
    </Form>
  );

  return (
    <div className="container mx-auto px-0 sm:px-4">
      <Card className="h-[calc(100vh-8rem)]">
        <CardHeader className="px-2 sm:px-4 py-3 border-b">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <CardTitle className="text-lg">{tripTitle}</CardTitle>
              <CardDescription>6 participants</CardDescription>
            </div>
            <ToggleGroup 
              type="single" 
              value={activeView} 
              onValueChange={(value) => value && setActiveView(value)}
              className="self-center sm:self-auto"
            >
              <ToggleGroupItem value="chat" aria-label="Chat view">
                <MessageSquare className="h-5 w-5" />
                <span className="sr-only md:not-sr-only md:ml-2">Chat</span>
              </ToggleGroupItem>
              <ToggleGroupItem value="expenses" aria-label="Expenses view">
                <DollarSign className="h-5 w-5" />
                <span className="sr-only md:not-sr-only md:ml-2">Expenses</span>
              </ToggleGroupItem>
              <ToggleGroupItem value="balances" aria-label="Balances view">
                <Wallet className="h-5 w-5" />
                <span className="sr-only md:not-sr-only md:ml-2">Balances</span>
              </ToggleGroupItem>
            </ToggleGroup>
            
            {activeView === "expenses" && (
              isMobile ? (
                <Sheet>
                  <SheetTrigger asChild>
                    <Button size="sm" variant="outline" className="w-full sm:w-auto mt-2 sm:mt-0">
                      <Plus className="h-4 w-4 mr-1" /> Add Expense
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="bottom" className="h-[85vh] rounded-t-xl">
                    <SheetHeader>
                      <SheetTitle>Add New Expense</SheetTitle>
                      <SheetDescription>Enter the expense details to split with the group.</SheetDescription>
                    </SheetHeader>
                    <div className="mt-4">
                      <ExpenseForm 
                        onSubmit={(data) => {
                          handleAddExpense(data);
                          document.querySelector('[data-radix-collection-item]')?.click();
                        }} 
                        onOpenChange={() => {}}
                      />
                    </div>
                  </SheetContent>
                </Sheet>
              ) : (
                <Dialog open={isExpenseDialogOpen} onOpenChange={setIsExpenseDialogOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm" variant="outline">
                      <Plus className="h-4 w-4 mr-1" /> Add Expense
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Expense</DialogTitle>
                      <DialogDescription>Enter the expense details to split with the group.</DialogDescription>
                    </DialogHeader>
                    <ExpenseForm onSubmit={handleAddExpense} onOpenChange={setIsExpenseDialogOpen} />
                  </DialogContent>
                </Dialog>
              )
            )}
          </div>
        </CardHeader>
        
        <CardContent className="p-0 overflow-hidden">
          {/* Chat View */}
          {activeView === "chat" && (
            <>
              {/* Messages */}
              <div className="flex flex-col h-[calc(100vh-16rem)] p-2 sm:p-4 overflow-y-auto">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex mb-4 ${
                      message.isCurrentUser ? "justify-end" : "justify-start"
                    }`}
                  >
                    {!message.isCurrentUser && (
                      <Avatar className="h-8 w-8 mr-2 mt-1">
                        <AvatarImage src={message.sender.avatar} alt={message.sender.name} />
                        <AvatarFallback>{getInitials(message.sender.name)}</AvatarFallback>
                      </Avatar>
                    )}
                    <div 
                      className={`max-w-[85%] sm:max-w-[70%] rounded-lg px-3 sm:px-4 py-2 ${
                        message.isCurrentUser 
                          ? "bg-primary text-primary-foreground" 
                          : "bg-muted"
                      }`}
                    >
                      {!message.isCurrentUser && (
                        <div className="font-medium text-xs mb-1">{message.sender.name}</div>
                      )}
                      <p className="text-sm sm:text-base">{message.content}</p>
                      <div 
                        className={`text-xs mt-1 ${
                          message.isCurrentUser ? "text-primary-foreground/70" : "text-muted-foreground"
                        }`}
                      >
                        {format(message.timestamp, "h:mm a")}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Message Input */}
              <div className="p-2 sm:p-4 border-t">
                <div className="flex w-full items-center space-x-2">
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        sendMessage();
                      }
                    }}
                  />
                  <Button size={isMobile ? "sm" : "icon"} onClick={sendMessage} type="submit">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          )}
          
          {/* Expenses View */}
          {activeView === "expenses" && (
            <div className="px-2 sm:px-4 py-2 space-y-4 overflow-y-auto max-h-[calc(100vh-16rem)]">
              {expenses.map((expense) => (
                <div key={expense.id} className="flex justify-between items-center py-2 border-b">
                  <div className="flex items-center">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage src={expense.paidBy.avatar} alt={expense.paidBy.name} />
                      <AvatarFallback>{getInitials(expense.paidBy.name)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-sm sm:text-base">{expense.title}</div>
                      <div className="text-xs text-muted-foreground">
                        Paid by {expense.paidBy.name} • {format(expense.date, "MMM d")}
                      </div>
                    </div>
                  </div>
                  <div className="font-semibold text-sm sm:text-base">
                    ${expense.amount.toFixed(2)}
                    <div className="text-xs text-muted-foreground text-right">
                      ${(expense.amount / expense.splitBetween.length).toFixed(2)} per person
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Balances View */}
          {activeView === "balances" && (
            <div className="px-2 sm:px-4 py-2 space-y-4 overflow-y-auto max-h-[calc(100vh-16rem)]">
              {balances.map((balance) => (
                <div key={balance.userId} className="flex justify-between items-center py-2 border-b">
                  <div className="flex items-center">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage src={balance.avatar} alt={balance.name} />
                      <AvatarFallback>{getInitials(balance.name)}</AvatarFallback>
                    </Avatar>
                    <div className="font-medium text-sm sm:text-base">{balance.name}</div>
                  </div>
                  <div 
                    className={`font-semibold text-sm sm:text-base ${
                      balance.amount > 0 
                        ? "text-green-600" 
                        : balance.amount < 0 
                          ? "text-red-600" 
                          : ""
                    }`}
                  >
                    {balance.amount > 0 ? "+" : ""}${Math.abs(balance.amount).toFixed(2)}
                  </div>
                </div>
              ))}
              
              <div className="mt-4 bg-muted p-3 rounded-lg">
                <div className="text-sm font-medium mb-1">Summary</div>
                <div className="text-xs text-muted-foreground mb-2">
                  Positive values mean you're owed money, negative values mean you owe money.
                </div>
                <div className="flex justify-between">
                  <span>Your total balance:</span>
                  <span className={`font-semibold ${
                    balances.find(b => b.userId === currentUser.id)?.amount! > 0 
                      ? "text-green-600" 
                      : "text-red-600"
                  }`}>
                    ${balances.find(b => b.userId === currentUser.id)?.amount.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
