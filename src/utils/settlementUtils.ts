import { Settlement, SettlementRequest, UserBalance } from "@/types/settlement";

// Generate a unique ID for settlements
export const generateSettlementId = (): string => {
  return `settlement-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
};

// Calculate net balance after settlements
export const calculateNetBalance = (
  originalBalance: number,
  settlements: Settlement[],
  userId: string
): number => {
  const settlementAdjustment = settlements.reduce((total, settlement) => {
    if (settlement.status === 'completed') {
      if (settlement.fromUserId === userId) {
        // User paid someone, reduces their debt or increases what they're owed
        return total + settlement.amount;
      } else if (settlement.toUserId === userId) {
        // User received payment, reduces what they're owed or increases their debt
        return total - settlement.amount;
      }
    }
    return total;
  }, 0);

  return originalBalance - settlementAdjustment;
};

// Process a settlement between two users
export const processSettlement = async (
  settlementRequest: SettlementRequest
): Promise<Settlement> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));

  const settlement: Settlement = {
    id: generateSettlementId(),
    ...settlementRequest,
    date: new Date(),
    status: 'completed', // In real app, might start as 'pending'
    description: settlementRequest.description || `Payment from ${settlementRequest.fromUserId} to ${settlementRequest.toUserId}`
  };

  return settlement;
};

// Get settlements for a specific user
export const getUserSettlements = (
  settlements: Settlement[],
  userId: string
): Settlement[] => {
  return settlements.filter(
    settlement => settlement.fromUserId === userId || settlement.toUserId === userId
  );
};

// Check if users have any pending settlements
export const hasPendingSettlements = (
  settlements: Settlement[],
  fromUserId: string,
  toUserId: string
): boolean => {
  return settlements.some(
    settlement =>
      settlement.status === 'pending' &&
      ((settlement.fromUserId === fromUserId && settlement.toUserId === toUserId) ||
       (settlement.fromUserId === toUserId && settlement.toUserId === fromUserId))
  );
};

// Format settlement amount for display
export const formatSettlementAmount = (amount: number): string => {
  return `$${Math.abs(amount).toFixed(2)}`;
};

// Get settlement description
export const getSettlementDescription = (
  settlement: Settlement,
  currentUserId: string
): string => {
  const isFromCurrentUser = settlement.fromUserId === currentUserId;
  const isToCurrentUser = settlement.toUserId === currentUserId;

  if (isFromCurrentUser) {
    return `You paid ${formatSettlementAmount(settlement.amount)}`;
  } else if (isToCurrentUser) {
    return `You received ${formatSettlementAmount(settlement.amount)}`;
  }
  
  return settlement.description;
};

// Validate settlement request
export const validateSettlement = (
  request: SettlementRequest,
  userBalance: number
): { isValid: boolean; message?: string } => {
  if (request.amount <= 0) {
    return {
      isValid: false,
      message: "Settlement amount must be greater than 0"
    };
  }

  if (request.fromUserId === request.toUserId) {
    return {
      isValid: false,
      message: "Cannot settle with yourself"
    };
  }

  // Check if settlement amount exceeds what's owed
  if (userBalance >= 0 && request.amount > userBalance) {
    return {
      isValid: false,
      message: `Cannot settle more than what's owed: ${formatSettlementAmount(userBalance)}`
    };
  }

  return { isValid: true };
};