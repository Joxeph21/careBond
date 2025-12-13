declare type BaseBackendResponse<Z=unknown, T = unknown> = {
  message: string;
  data?: Z;
} & T;