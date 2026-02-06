import * as Yup from "yup";

export const FAMILY_SCHEMA = Yup.object({
  first_name: Yup.string().required("First name is required").default(""),
  last_name: Yup.string().required("Last name is required").default(""),
  email: Yup.string()
    .email("Invalid email")
    .required("Email is required")
    .default(""),
  phone: Yup.string().required("Phone number is required").default(""),
  address_line_1: Yup.string()
    .required("Address line 1 is required")
    .default(""),
  address_line_2: Yup.string().optional().default(""),
});

export type FamilyFormData = Yup.InferType<typeof FAMILY_SCHEMA>;
