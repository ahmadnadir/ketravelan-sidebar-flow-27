
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

// Get custom tip message suggestions
export const getTipMessageSuggestions = (): string[] => {
  return [
    "Thanks for organizing this amazing trip!",
    "Great job with the arrangements!",
    "Really appreciate your guidance!",
    "For the excellent service!"
  ];
};

// Check if user is the trip organizer
export const isOrganizer = (userId: string, organizerId: string): boolean => {
  return userId === organizerId;
};

// Process tip payment (mock implementation)
export const processTipPayment = async (tip: Tip): Promise<boolean> => {
  // This would connect to a payment processor in a real implementation
  console.log("Processing tip payment:", tip);
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Return success (in a real app, this would return based on payment success)
  return true;
};
