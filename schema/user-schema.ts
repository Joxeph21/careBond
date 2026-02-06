import * as Yup from "yup";

export const USER_SCHEMA = Yup.object({
  first_name: Yup.string().required("First name is required"),
  last_name: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  role: Yup.string().required("Role is required"),
  dob: Yup.string().required("Date of birth is required"),
  phone: Yup.string().notRequired(),
  address: Yup.string().notRequired(),
  gender: Yup.string().notRequired(),
  description: Yup.string().notRequired().max(300, "Description is too long"),
});

export type UserFormData = Yup.InferType<typeof USER_SCHEMA>;
