declare type BillingHistoryResponse = {
  id: string;
  institution: string;
  institution_details: Institution;
  transaction_id: string;
  plan: string;
  plan_details: Plan;
  amount: string;
  transaction_date: string;
  clear_date: string;
  payment_method: string;
  status: string;
  created_at: string;
};

declare type BillingOverviewResponse = {
  plan: Plan;
  status: "incomplete" | "complete" | string;
  days_remaining: number;
  active_until: string;
  grace_period_ends: string;
  monthly_rate: string;
};

declare type PaymentMethod = {
  id: string;
  brand: string;
  last4: string;
  exp_month: number;
  exp_year: number;
  is_active: boolean;
  created_at: string;
};
