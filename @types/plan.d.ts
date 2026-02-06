declare type Plan = {
  id: string;
  name: string;
  description: string;
  monthly_rate: string | number;
  yearly_rate: string | number;
  features: string[];
  promo_codes: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

declare type EditPlan = {
  name: string;
  description: string;
  monthly_rate: number | null;
  yearly_rate: number | null;
  features: string[];
  promo_codes?: string[];
};
