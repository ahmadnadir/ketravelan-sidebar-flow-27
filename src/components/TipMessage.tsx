
import React from "react";
import { DollarSign } from "lucide-react";
import { format } from "date-fns";
import { formatTipAmount } from "@/utils/tipUtils";

interface TipMessageProps {
  from: string;
  to: string;
  amount: number;
  timestamp: Date;
}

export function TipMessage({ from, to, amount, timestamp }: TipMessageProps) {
  return (
    <div className="flex items-center justify-center my-3">
      <div className="bg-muted/50 rounded-full px-3 py-1.5 text-xs flex items-center gap-1.5 max-w-[85%] text-muted-foreground">
        <span className="bg-primary/10 p-1 rounded-full">
          <DollarSign className="h-3 w-3 text-primary" />
        </span>
        <span><strong>{from}</strong> tipped <strong>{to}</strong> {formatTipAmount(amount)}</span>
        <span className="text-muted-foreground/70">· {format(timestamp, "h:mm a")}</span>
      </div>
    </div>
  );
}
