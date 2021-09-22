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

// @todo Вынести эти значения в constants.ts
export const MINUTES_COUNT_IN_HOUR = 60;

// Корректная длина даты для value календаря в форме todo-шек
export const CORRECT_DATE_LENGTH = 10;

// Максимальная длина заголовка, при которой todo-шка смотрится норм
export const MAX_TITLE_LENGTH = 40;

export const todoFormValidationSchema = Yup.object({
  description: Yup.string()
    .max(MAX_TITLE_LENGTH, `Must be ${MAX_TITLE_LENGTH} characters or less`)
    .required('Required'),
  priority: Yup.string().oneOf([`Low`, `Medium`, `High`], `Unexpected value`).required('Required'),
  status: Yup.string()
    .oneOf([`New`, `In progress`, `Done`], `Unexpected value`)
    .required('Required'),
  endDatePlan: Yup.string().max(CORRECT_DATE_LENGTH, 'Incorrect date').required('Required'),
});
