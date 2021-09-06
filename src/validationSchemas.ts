import * as Yup from 'yup';

export const signUpValidationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().min(6, 'Must be 6 characters or more').required('Required'),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref('password')], `Passwords don't match`)
    .required('Required'),
});

export const signInValidationSchema = signUpValidationSchema.omit(['repeatPassword']).shape({
  rememberMe: Yup.boolean(),
});

export const resetPasswordValidationSchema = signUpValidationSchema.pick(['email']);
