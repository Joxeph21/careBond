import * as yup from "yup";

export const CREATE_PLAN_SCHEMA = yup.object({
  name: yup.string().required("Plan name is required"),
  description: yup.string().required("Plan description is required"),
  features: yup
    .array()
    .of(yup.string().trim().required("Feature cannot be empty"))
    .min(1, "Add at least one feature")
    .required("Plan features is required"),

  monthly_rate: yup
    .number()
    .typeError("Invalid amount")
    .required("Monthly rate is required")
    .min(50, "Monthly rate must be at least $50"),
  promo_codes: yup
    .array()
    .of(yup.string().trim().notRequired())
    .notRequired(),
  yearly_rate: yup
    .number()
    .typeError("Invalid amount")
    .required("Yearly rate is required")
    .min(50, "Yearly rate must be at least $50"),
});
