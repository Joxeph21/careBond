declare interface IUser {
  id: string;
  email: string;
  full_name: string;
  role: "super_admin" | "admin" | "user" | string;
  role_display: string;
  institution_id: string | null;
  phone: string | null;
  is_active: boolean;
  created_at: string;
  last_login: string | null;
}

declare type STATUS_TYPE = "active" | "inactive" | "closed" | "suspended" | "reopened";