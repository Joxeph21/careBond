declare type Camera = {
  id: string;
  name: string;
  location: string;
  patient: string;
  patient_name: string;
  institution: string;
  brand: string;
  protocol: string;
  host: string;
  rtsp_port: number;
  onvif_port: number;
  enabled: boolean;
  fall_detection_enabled: boolean;
  privacy_mode: boolean;
  status: string;
  status_display: string;
  last_seen: string | null;
  created_at: string;
};
declare type DeviceReading = {
  id: string;
  device: string;
  value: string;
  unit: string;
  reading_type: string;
  recorded_at: string;
};

declare type Device = {
  id: string;
  patient: string;
  device_name: string;
  device_type: string;
  status: "online" | "offline" | string;
  battery_level: number;
  is_active: boolean;
  last_sync: string | null;
  created_at: string;
  updated_at: string;
  readings: DeviceReading[];
};
