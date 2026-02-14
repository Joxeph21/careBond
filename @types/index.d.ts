declare type BaseBackendResponse<Z = unknown, T = unknown> = {
  message: string;
  data?: Z;
  status_code: number;
} & T;

declare type OptionsType<T = unknown, Z = unknown> = {
  label: string;
  value: T | string;
  metadata?: Z;
};

declare type onCloseModal = {
  onCloseModal?: () => void;
};

declare type Pagination = {
  count: number;
  next: number | null;
  previous: number | null;
};

declare interface Paginator {
  query?: string;
  page?: number;
}

declare type Log = {
  id: string;
  user: string;
  user_name: string;
  action: string;
  details: string;
  timestamp: string;
};
