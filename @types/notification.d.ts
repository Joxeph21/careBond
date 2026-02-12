declare type UserNotification = {
  id: string;
  user: string;
  institution_id: string;
  title: string;
  message: string;
  level: NotificationLevel;
  category: NotificationCategory;
  is_read: boolean;
  extra_data: {
    type: string;
    sender_id?: string;
    sender_name?: string;
    [key: string]: unknown;
  };
  created_at: string;
};

declare type NotificationLevel =
  | "critical"
  | "important"
  | "warning"
  | "normal";
declare type NotificationCategory = "reports" | "alerts" | "messages" | "other";
