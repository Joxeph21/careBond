import * as Yup from "yup";

export const INSTITUTION_ADMIN_SCHEMA = Yup.object({
  full_name: Yup.string().required("Full name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string().required("Phone number is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password cannot be less than 8 characters"),
  institution_id: Yup.string().required("Please select an institution"),
});

export type InstitutionAdminFormData = Yup.InferType<
  typeof INSTITUTION_ADMIN_SCHEMA
>;
