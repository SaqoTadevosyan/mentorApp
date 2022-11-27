import * as yup from "yup";

export const profileSchema = yup
  .object()
  .shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    city: yup.string().required(),
    profilePicture: yup.string().optional(),
    department: yup.string().required(),
    jobTitle: yup.string().required(),
  })
  .required();
