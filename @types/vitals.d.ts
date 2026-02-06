declare type Vitals = {
  id: string;
  patient: string;
  recorded_by: string;
  recorded_by_name: string;
  heart_rate: number;
  systolic_bp: number;
  diastolic_bp: number;
  temperature: string;
  oxygen_saturation: string;
  respiratory_rate: number;
  recorded_at: string;
};

declare type VitalRequest = Pick<
  "patient" | "heart_rate" | "systolic_bp" | "diastolic_bp" | "temperature" | "oxygen_saturation" | "respiratory_rate"
>;