
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { TipButton } from "@/components/TipButton";
import { 
  getTipAmounts, 
  getTipMessageSuggestions, 
  generateTipId, 
  processTipPayment,
  formatTipAmount 
} from "@/utils/tipUtils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

interface TipOrganizerProps {
  organizer: {
    id: string;
    name: string;
    avatar: string;
  };
  currentUser: {
    id: string;
    name: string;
    avatar: string;
  };
}

const formSchema = z.object({
  amount: z.number().min(1, "Amount must be at least $1"),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function TipOrganizer({ organizer, currentUser }: TipOrganizerProps) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const predefinedAmounts = getTipAmounts();
  const messageSuggestions = getTipMessageSuggestions();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: predefinedAmounts[0],
      message: "",
    },
  });

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      form.reset();
    }
  };

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    
    try {
      const tip = {
        id: generateTipId(),
        amount: values.amount,
        message: values.message,
        from: currentUser,
        to: organizer,
        timestamp: new Date(),
      };

      const success = await processTipPayment(tip);
      
      if (success) {
        toast({
          title: "Tip sent!",
          description: `You successfully sent ${formatTipAmount(values.amount)} to ${organizer.name}.`,
        });
        setOpen(false);
      } else {
        throw new Error("Payment processing failed");
      }
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "There was an error processing your tip. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectAmount = (amount: number) => {
    form.setValue("amount", amount);
  };

  const selectMessageSuggestion = (message: string) => {
    form.setValue("message", message);
  };

  return (
    <>
      <TipButton 
        onClick={() => setOpen(true)} 
        recipientName={organizer.name}
        size="default"
      />
      
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Tip {organizer.name}</DialogTitle>
            <DialogDescription>
              Show your appreciation to the trip organizer with a tip.
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <div className="grid grid-cols-3 gap-2 mb-2">
                      {predefinedAmounts.map((amount) => (
                        <Button
                          key={amount}
                          type="button"
                          variant={field.value === amount ? "default" : "outline"}
                          className="w-full"
                          onClick={() => selectAmount(amount)}
                        >
                          ${amount}
                        </Button>
                      ))}
                    </div>
                    <FormControl>
                      <div className="relative">
                        <span className="absolute left-3 top-2.5">$</span>
                        <Input
                          type="number"
                          min="1"
                          step="0.01"
                          className="pl-7"
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
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message (optional)</FormLabel>
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {messageSuggestions.map((message, index) => (
                        <Button
                          key={index}
                          type="button"
                          variant="outline"
                          size="sm"
                          className="text-xs"
                          onClick={() => selectMessageSuggestion(message)}
                        >
                          {message}
                        </Button>
                      ))}
                    </div>
                    <FormControl>
                      <Textarea
                        placeholder="Add a personal message..."
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Processing..." : `Send ${formatTipAmount(form.getValues("amount"))} Tip`}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
