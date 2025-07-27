import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, DollarSign } from "lucide-react";
import { formatSettlementAmount } from "@/utils/settlementUtils";

interface SettlementDialogProps {
  isOpen: boolean;
  onClose: () => void;
  recipient: {
    id: string;
    name: string;
    avatar: string;
  };
  currentUserBalance: number;
  onSubmit: (amount: number, description: string) => Promise<void>;
}

const settlementSchema = z.object({
  amount: z.number().min(0.01, { message: "Amount must be greater than 0" }),
  description: z.string().optional(),
});

type FormValues = z.infer<typeof settlementSchema>;

export function SettlementDialog({
  isOpen,
  onClose,
  recipient,
  currentUserBalance,
  onSubmit,
}: SettlementDialogProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const isMobile = useIsMobile();

  const form = useForm<FormValues>({
    resolver: zodResolver(settlementSchema),
    defaultValues: {
      amount: Math.abs(currentUserBalance),
      description: "",
    },
  });

  const handleSubmit = async (values: FormValues) => {
    setIsProcessing(true);
    try {
      await onSubmit(values.amount, values.description || "");
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        onClose();
        form.reset();
      }, 2000);
    } catch (error) {
      console.error("Settlement failed:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const contentBody = (
    <div className="space-y-4">
      {showSuccess ? (
        <div className="text-center py-6">
          <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Settlement Recorded!</h3>
          <p className="text-muted-foreground">
            Your payment to {recipient.name} has been recorded.
          </p>
        </div>
      ) : (
        <>
          {/* Recipient Info */}
          <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
            <Avatar className="h-12 w-12">
              <AvatarImage src={recipient.avatar} alt={recipient.name} />
              <AvatarFallback>{getInitials(recipient.name)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{recipient.name}</div>
              <div className="text-sm text-muted-foreground">
                {currentUserBalance < 0 
                  ? `You owe ${formatSettlementAmount(Math.abs(currentUserBalance))}`
                  : `Owes you ${formatSettlementAmount(currentUserBalance)}`
                }
              </div>
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Settlement Amount</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="0.00"
                          className="pl-10"
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., Cash payment for dinner expenses"
                        className="resize-none"
                        rows={3}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex space-x-2">
                <Button
                  type="submit"
                  disabled={isProcessing}
                  className="flex-1"
                >
                  {isProcessing ? "Recording..." : "Record Settlement"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  disabled={isProcessing}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Form>
        </>
      )}
    </div>
  );

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side="bottom" className="h-[90vh]">
          <SheetHeader>
            <SheetTitle>Settle Payment</SheetTitle>
            <SheetDescription>
              Record a payment to {recipient.name}
            </SheetDescription>
          </SheetHeader>
          <div className="mt-6">{contentBody}</div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Settle Payment</DialogTitle>
          <DialogDescription>
            Record a payment to {recipient.name}
          </DialogDescription>
        </DialogHeader>
        {contentBody}
      </DialogContent>
    </Dialog>
  );
}