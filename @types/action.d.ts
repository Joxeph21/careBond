declare type SecurityEventLog = {
  id: string;
  ip_address: string;
  country: string;
  asn: number;
  as_organization: string;
  method: string;
  path: string;
  user_agent: string;
  timestamp: string;
  host: string;
};

declare type CloudStatsResponse = {
  total: number;
  previous: number;
  current: number;
  graph: { label: string; value: string; previous_value: string }[];
};

declare type Admin_Config = {
  id: number;
  system_language: string;
  allow_user_signup: boolean;
  default_app_language: string;
  currency: string;
  allow_system_notifications: boolean;
  security_notifications_frequency: "Daily" | "Weekly" | "Monthly" | string;
  allow_profile_pictures: boolean;
  allow_profile_edit: boolean;
  send_notifications_to_users: boolean;
  enable_log_backup: boolean;
  allow_admins_view_logs: boolean;
  maintenance_frequency: string;
  maintenance_time: string;
  require_2fa: boolean;
  max_login_attempts: number;
  updated_at: string;
};

declare type InstitutionConfig = {
  system_language: string;
  allow_user_signup: boolean;
  default_app_language: string;
  currency: string;
  allow_system_notifications: boolean;
  security_notifications_frequency: "Weekly" | "Daily" | "Monthly" | string;
  default_agents_language: string;
  allow_profile_pictures: boolean;
  allow_profile_edit: boolean;
  send_notifications_to_users: boolean;
  system_update_frequency: "Monthly" | "Weekly" | "Daily" | string;
  date_time_format: string;
  updated_at: string;
};
