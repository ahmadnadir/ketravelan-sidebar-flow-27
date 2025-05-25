
// Types for dynamic payment system
export type PaymentSchedule = {
  id: string;
  description: string;
  amount: number;
  dueDate: string;
  status: 'pending' | 'paid' | 'overdue';
};

export type DynamicPayment = {
  tripId: string;
  totalAmount: number;
  minimumDeposit: number;
  initialPayment: number;
  remainingBalance: number;
  paymentTermMonths: number;
  agentName: string;
  agentBrandingInfo: {
    businessName: string;
    logo?: string;
    contactInfo: string;
  };
  schedule: PaymentSchedule[];
};

// Calculate dynamic payment schedule
export const calculatePaymentSchedule = (
  totalAmount: number,
  initialPayment: number,
  paymentTermMonths: number,
  minimumDeposit: number,
  agentInfo: { businessName: string; contactInfo: string }
): DynamicPayment => {
  // Validate initial payment
  if (initialPayment < minimumDeposit) {
    throw new Error(`Initial payment must be at least $${minimumDeposit}`);
  }
  
  if (initialPayment > totalAmount) {
    throw new Error(`Initial payment cannot exceed total amount of $${totalAmount}`);
  }

  const remainingBalance = totalAmount - initialPayment;
  const monthlyPayment = remainingBalance > 0 ? remainingBalance / paymentTermMonths : 0;
  
  const schedule: PaymentSchedule[] = [];
  
  // Add initial payment
  schedule.push({
    id: 'initial',
    description: 'Initial Payment (Deposit)',
    amount: initialPayment,
    dueDate: 'Upon booking',
    status: 'pending'
  });
  
  // Add monthly payments if there's remaining balance
  if (remainingBalance > 0) {
    for (let i = 1; i <= paymentTermMonths; i++) {
      const dueDate = new Date();
      dueDate.setMonth(dueDate.getMonth() + i);
      
      schedule.push({
        id: `payment-${i}`,
        description: `Payment ${i} of ${paymentTermMonths}`,
        amount: monthlyPayment,
        dueDate: dueDate.toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'short', 
          day: 'numeric' 
        }),
        status: 'pending'
      });
    }
  }

  return {
    tripId: '',
    totalAmount,
    minimumDeposit,
    initialPayment,
    remainingBalance,
    paymentTermMonths,
    agentName: agentInfo.businessName,
    agentBrandingInfo: {
      businessName: agentInfo.businessName,
      contactInfo: agentInfo.contactInfo
    },
    schedule
  };
};

// Format currency
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(amount);
};

// Generate payment receipt
export const generatePaymentReceipt = (
  payment: PaymentSchedule,
  agentInfo: { businessName: string; contactInfo: string },
  customerInfo: { name: string; email: string }
): string => {
  return `
PAYMENT RECEIPT
===============

${agentInfo.businessName}
${agentInfo.contactInfo}

Customer: ${customerInfo.name}
Email: ${customerInfo.email}
Date: ${new Date().toLocaleDateString()}

Payment Details:
${payment.description}
Amount: ${formatCurrency(payment.amount)}
Status: ${payment.status.toUpperCase()}

Thank you for your payment!
  `.trim();
};

// Validate payment amount
export const validatePaymentAmount = (
  amount: number,
  minimumDeposit: number,
  totalAmount: number
): { isValid: boolean; message?: string } => {
  if (amount < minimumDeposit) {
    return {
      isValid: false,
      message: `Minimum payment required: ${formatCurrency(minimumDeposit)}`
    };
  }
  
  if (amount > totalAmount) {
    return {
      isValid: false,
      message: `Payment cannot exceed total amount: ${formatCurrency(totalAmount)}`
    };
  }
  
  return { isValid: true };
};
