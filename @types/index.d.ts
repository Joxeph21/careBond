declare type BaseBackendResponse<Z = unknown, T = unknown> = {
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

declare type OptionsType<T = unknown, Z = unknown> = {
  label: string;
  value: T | string;
  metadata?: Z;
};


declare type onCloseModal = {
  onCloseModal?: () => void
}