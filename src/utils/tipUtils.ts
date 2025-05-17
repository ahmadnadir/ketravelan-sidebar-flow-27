
// Types for tips
export type Tip = {
  id: string;
  amount: number;
  message?: string;
  from: {
    id: string;
    name: string;
    avatar: string;
  };
  to: {
    id: string;
    name: string;
    avatar: string;
  };
  timestamp: Date;
};

// Generate a unique ID for tips
export const generateTipId = (): string => {
  return `tip-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
};

// Format tip amount
export const formatTipAmount = (amount: number): string => {
  return `$${amount.toFixed(2)}`;
};

// Get predefined tip amounts
export const getTipAmounts = (): number[] => {
  return [5, 10, 20];
};
