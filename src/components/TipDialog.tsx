
import React, { useState } from "react";
import { DollarSign } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { useIsMobile } from "@/hooks/use-mobile";
import { formatTipAmount, getTipAmounts } from "@/utils/tipUtils";

interface TipDialogProps {
  isOpen: boolean;
  onClose: () => void;
  recipient: {
    id: string;
    name: string;
    avatar: string;
  };
  onSubmit: (amount: number, message: string) => void;
}

export function TipDialog({ isOpen, onClose, recipient, onSubmit }: TipDialogProps) {
  const [amount, setAmount] = useState<number>(5);
  const [message, setMessage] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [showThankYou, setShowThankYou] = useState<boolean>(false);
  const isMobile = useIsMobile();
  
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value > 0) {
      setAmount(value);
    } else {
      setAmount(0);
    }
  };
  
  const handleSubmit = () => {
    if (amount <= 0) return;
    
    setIsProcessing(true);
    
    // Simulate processing delay
    setTimeout(() => {
      onSubmit(amount, message);
      setIsProcessing(false);
      setShowThankYou(true);
      
      // Close after showing thank you
      setTimeout(() => {
        setShowThankYou(false);
        onClose();
        // Reset form
        setAmount(5);
        setMessage("");
      }, 1500);
    }, 1000);
  };
  
  const predefinedAmounts = getTipAmounts();
  
  const getInitials = (name: string) => {
    return name.split(' ').map(part => part[0]).join('');
  };
  
  const contentBody = (
    <>
      {!showThankYou ? (
        <div className="space-y-4 py-2">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={recipient.avatar} alt={recipient.name} />
              <AvatarFallback>{getInitials(recipient.name)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">Tip {recipient.name}</div>
              <div className="text-xs text-muted-foreground">Trip Organizer</div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="text-sm font-medium">Choose an amount</div>
            <div className="flex space-x-2 mb-2">
              {predefinedAmounts.map((presetAmount) => (
                <Button
                  key={presetAmount}
                  variant={amount === presetAmount ? "default" : "outline"}
                  size="sm"
                  onClick={() => setAmount(presetAmount)}
                  className="flex-1"
                >
                  ${presetAmount}
                </Button>
              ))}
              <Button
                variant={!predefinedAmounts.includes(amount) ? "default" : "outline"}
                size="sm"
                onClick={() => document.getElementById("custom-amount")?.focus()}
                className="flex-1"
              >
                Custom
              </Button>
            </div>
            
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-muted-foreground">$</span>
              <Input
                id="custom-amount"
                type="number"
                min="1"
                step="1"
                value={amount.toString()}
                onChange={handleAmountChange}
                className="pl-7"
                placeholder="Enter amount"
              />
            </div>
          </div>
          
          <div>
            <div className="text-sm font-medium mb-2">Add a message (optional)</div>
            <Textarea
              placeholder="Thanks for organizing this trip!"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="resize-none"
              rows={3}
            />
          </div>
          
          <Button 
            className="w-full" 
            onClick={handleSubmit} 
            disabled={amount <= 0 || isProcessing}
          >
            {isProcessing ? "Processing..." : `Send ${formatTipAmount(amount)} Tip`}
          </Button>
        </div>
      ) : (
        <div className="py-8 text-center space-y-3 animate-fade-in">
          <div className="rounded-full bg-primary/10 text-primary p-3 mx-auto w-fit">
            <DollarSign className="h-8 w-8" />
          </div>
          <h3 className="font-semibold text-lg">Thank you for your tip!</h3>
          <p className="text-muted-foreground">{recipient.name} will be notified of your {formatTipAmount(amount)} tip.</p>
        </div>
      )}
    </>
  );

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side="bottom" className="h-[85vh] rounded-t-xl">
          <SheetHeader>
            <SheetTitle>Send a Tip</SheetTitle>
            <SheetDescription>Show your appreciation with a tip</SheetDescription>
          </SheetHeader>
          <div className="mt-4">
            {contentBody}
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Send a Tip</DialogTitle>
          <DialogDescription>Show your appreciation with a tip</DialogDescription>
        </DialogHeader>
        {contentBody}
      </DialogContent>
    </Dialog>
  );
}
