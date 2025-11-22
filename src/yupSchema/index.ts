import * as yup from "yup"

export const activationSchema = yup.object({
   email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  confirmPassword: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password")], "Passwords must match"),
}).required()



export const loginSchema = yup.object({
  email: yup
    .string()
    .required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
}).required()


export const resetPasswordSchema = yup.object({
  password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
  confirmPassword: yup.string().required('Confirm Password is required').oneOf([yup.ref('password')], 'Passwords must match'),
}).required()


export const addUserSchema = yup.object({
  first_name: yup.string().required('Անունը պարտադիր է'),
  last_name: yup.string().required('Ազգանունը պարտադիր է'),
  email: yup.string().required('Էլ. հասցեն պարտադիր է').email('Էլ. հասցեն վավեր չէ'),
}).required();