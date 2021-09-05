import { ICustomInput } from '../../../../interfaces';

const inputsConfig: Omit<ICustomInput, 'isError' | 'isTouched'>[] = [
  {
    label: 'Email',
    isRequired: true,
    type: 'email',
    fieldName: 'email',
    placeholder: 'Enter your email',
  },
  {
    label: 'Password',
    isRequired: true,
    type: 'password',
    fieldName: 'password',
    placeholder: 'Create a password',
  },
  {
    label: 'Repeat password',
    isRequired: true,
    type: 'password',
    fieldName: 'repeatPassword',
    placeholder: 'Repeat your password',
  },
];

export default inputsConfig;
