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

declare type USER_ROLE = "proffessional" | "patient" | "family";


declare type User = {
  avatar: string;
  name: string;
  id: string;
  role: USER_ROLE,
  associated_user: number,
  all_devices: number,
  createdAt: string,
  email: string
}

declare type Family = Pick<User, "name" | "id" | "email", "role['family']">