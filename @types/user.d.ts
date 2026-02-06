declare interface IUser {
  id: string;
  email: string;
  full_name: string;
  role: "super_admin" | "institution_admin" | "user" | USER_ROLE;
  role_display: string;
  institution_id: string | null;
  phone: string | null;
  is_active: boolean;
  created_at: string;
  last_login: string | null;
  description?: string;
  institution_name?: string;
  address?: string | null;
  phone?: string | null;
  display_id?: string;
  assigned_professionals?: Professional[];
  assigned_family_members?: FamilyMember[];
  assigned_patients?: Patient[];
  associated_users_count?: number;
  connected_devices_count?: number;
}

declare type STATUS_TYPE =
  | "active"
  | "inactive"
  | "closed"
  | "suspended"
  | "reopened";

declare type USER_ROLE = "proffessional" | "patient" | "family";

declare type User = {
  avatar?: string;
  id: string;
  display_id: string;
  email: string;
  full_name: string;
  role: USER_ROLE | "super_admin";
  role_display: string;
  institution_id: string | null;
  institution_name: string;
  phone: string;
  address: string;
  dob: string;
  gender: string;
  description: string;
  is_active: boolean;
  associated_users_count: number;
  connected_devices_count: number;
  created_at: string | null;
  last_login: string | null;
  assigned_professionals: Professional[];
  assigned_family_members: FamilyMember[];
  assigned_patients: Patient[];
};

declare type Professional = {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  role: string;
  role_display: string;
  is_active: boolean;
  can_view_stream: boolean;
};

declare type FamilyMember = Professional & {
  relationship: string;
};

declare type Patient = Professional;

declare type Family = Pick<User, "full_name" | "id" | "email" | "role">;
