declare interface Institution {
  id: string;
  name: string;
  description: string;
  contact_email: string;
  plan: "Premium" | "Basic" | "Standard" | string;
  plan_details: Plan;
  plan_status: "Suspended" | "Active" | string;
  status: "Active" | "Inactive" | string;
  location: string;
  address: string;
  phone: string;
  last_billed_date: string;
  next_payment_date: string;
  created_at: string;
  updated_at: string;
}

declare type Institution_dashboard_response = {
  stats: {
    total_patients: number;
    active_professionals: number;
    pending_alerts: number;
    connected_devices: number;
  };
  charts: {
    patients_attended: { month: string; count: number }[];
    overall_info: {
      conversations: number;
      families: number;
    };
    usage_overview: {
      first_time: string;
      return: string;
    };
  };
  recent_activities: Activity[];
};

declare type Institution_User = {
  id: string;
  email: string;
  full_name: string;
  role: string;
  role_display: string;
  institution_id: string | null;
  phone: string;
  is_active: boolean;
  created_at: string;
  last_login: string | null;
};
