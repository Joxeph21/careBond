import * as Yup from "yup";

export const INSTITUTION_SCHEMA = Yup.object({
  name: Yup.string().required("Company name is required"),
  description: Yup.string().required("Description is required"),
  contact_email: Yup.string()
    .email("Invalid email")
    .required("Email is required"),
  phone: Yup.string().required("Phone number is required"),
  location: Yup.string().required("Country is required"),
  address: Yup.string().required("Institution address is required"),
  plan: Yup.string().required("Plan is required"),
});

export type InstitutionFormData = Yup.InferType<typeof INSTITUTION_SCHEMA>;

export const EDIT_INSTITUTION_SCHEMA = Yup.object({
  name: Yup.string().required("Company name is required"),
  description: Yup.string().notRequired(),
  contact_email: Yup.string()
    .email("Invalid email")
    .required("Email is required"),
  phone: Yup.string().required("Phone number is required"),
  location: Yup.string().notRequired(),
  address: Yup.string().notRequired(),
});

export type EditInstitutionFormData = Yup.InferType<
  typeof EDIT_INSTITUTION_SCHEMA
>;
