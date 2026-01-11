declare type TransactionStatus = "Received" | "Pending";

declare type PaymentMethod = "PayPal" | "Cheque" | "Card" | "Bank Transfer";

declare type PLANS = "Standard" | "Premium" | "Enterprise";

declare interface Transaction {
  id: string;
  index: string;
  payeePayer: string;
  transactionId: string;
  plan: PLANS;
  transactionDate: string;
  clearDate: string;
  amount: number;
  status: TransactionStatus;
  paymentMethod: PaymentMethod;
}
