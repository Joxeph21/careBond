declare type BaseBackendResponse<Z=unknown, T = unknown> = {
  message: string;
  data?: Z;
} & T;

declare type Plan = {
  title: string;
  description: string;
  priceInYearly: number;
  priceInMonth: number;
  features: string[];
};