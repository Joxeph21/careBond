import * as Yup from "yup";

export const get_user_schema = (isEdit?: boolean) =>
  Yup.object({
    first_name: Yup.string().required("First name is required"),
    last_name: Yup.string().required("Last name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    role: Yup.string().required("Role is required"),
    date_of_birth: Yup.string().required("Date of birth is required"),
    phone: Yup.string().notRequired(),
    address: Yup.string().notRequired(),
    gender: Yup.string().notRequired(),
    description: Yup.string().notRequired().max(300, "Description is too long"),
    password: isEdit
      ? Yup.string()
          .notRequired()
          .transform((value) => (value === "" ? undefined : value))
          .min(8, "Password cannot be less than 8 characters")
      : Yup.string()
          .required("Password is required")
          .min(8, "Password cannot be less than 8 characters"),
  });

export type UserFormData = Yup.InferType<ReturnType<typeof get_user_schema>>;
