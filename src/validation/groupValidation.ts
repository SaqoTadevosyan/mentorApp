import * as yup from "yup";

export const groupSchema = yup
  .object()
  .shape({
    groupName: yup.string().trim().required(),
    employees: yup.array().min(1).required(),
  })
  .required();
