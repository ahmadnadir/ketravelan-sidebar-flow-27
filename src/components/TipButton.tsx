
import React from "react";
import { DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface TipButtonProps {
  onClick: () => void;
  className?: string;
  size?: "sm" | "default";
  recipientName?: string;
}

export function TipButton({ onClick, className, size = "sm", recipientName }: TipButtonProps) {
  const buttonText = recipientName ? `Tip ${recipientName}` : "Tip";
  
  return (
    <Button
      variant="ghost"
      size={size}
      onClick={onClick}
      className={cn(
        "text-muted-foreground hover:text-primary hover:bg-primary/10",
        className
      )}
      aria-label={buttonText}
    >
      <DollarSign className="h-3.5 w-3.5 mr-1" />
      <span className="text-xs">{buttonText}</span>
    </Button>
  );
}
