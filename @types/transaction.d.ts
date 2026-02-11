declare type TransactionStatus =
  | "Received"
  | "Pending"
  | "Cancelled"
  | "Failed";

declare type PaymentMethodType = "PayPal" | "Cheque" | "Card" | "Bank Transfer";

declare type PLANS = "Standard" | "Premium" | "Enterprise";

declare interface Transaction {
  id: string;
  institution: string;
  institution_details: Institution;
  transaction_id: string;
  plan: string;
  plan_details: Plan;
  amount: string;
  transaction_date: string;
  clear_date: string;
  payment_method: PaymentMethodType;
  status: TransactionStatus;
  created_at: string;
}
