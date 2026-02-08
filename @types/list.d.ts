declare type Activity = {
  id: string;
  user_id: string;
  user_name: string;
  user_email: string;
  role: string;
  institution_id: string;
  institution_name: string;
  action: string;
  details: Record<string, unknown>;
  ip_address: string;
  user_agent: string;
  timestamp: string;
};

declare type ALERT_TYPE = "warning" | "error" | "success";

declare type Alert = {
  title: string;
  createdAt: string;
  description: string;
  type: ALERT_TYPE;
};

declare type Devices = {
  id: string;
  device_name: string;
  device_status: "syncing" | "connected" | "failed";
};
