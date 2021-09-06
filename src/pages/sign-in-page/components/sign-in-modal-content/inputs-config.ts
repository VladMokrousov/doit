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
    placeholder: 'Enter your password',
  },
  {
    label: 'Remember me',
    isRequired: false,
    type: 'checkbox',
    fieldName: 'rememberMe',
  },
];

export default inputsConfig;
