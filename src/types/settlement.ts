export type Settlement = {
  id: string;
  fromUserId: string;
  toUserId: string;
  amount: number;
  description: string;
  date: Date;
  status: 'pending' | 'confirmed' | 'completed';
  relatedExpenses?: string[]; // Expense IDs this settlement relates to
};

export type SettlementRequest = {
  fromUserId: string;
  toUserId: string;
  amount: number;
  description?: string;
};

export type UserBalance = {
  userId: string;
  name: string;
  avatar: string;
  amount: number;
  totalTipsReceived?: number;
  settlements: Settlement[];
  netBalance: number; // Balance after settlements
};