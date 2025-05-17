
import React from "react";
import { DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface TipButtonProps {
  onClick: () => void;
  className?: string;
  size?: "sm" | "default";
}

export function TipButton({ onClick, className, size = "sm" }: TipButtonProps) {
  return (
    <Button
      variant="ghost"
      size={size}
      onClick={onClick}
      className={cn(
        "text-muted-foreground hover:text-primary hover:bg-primary/10",
        className
      )}
      aria-label="Send tip"
    >
      <DollarSign className="h-3.5 w-3.5" />
      <span className="text-xs">Tip</span>
    </Button>
  );
}
