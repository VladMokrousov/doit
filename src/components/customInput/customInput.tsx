import React from 'react';
import { Field, ErrorMessage } from 'formik';

import { ICustomInput } from '../../interfaces';
import { clsx } from 'helpers';

import './customInput.css';

const CustomInput: React.FC<ICustomInput> = ({
  label,
  labelClass,
  isRequired,
  fieldClass,
  type,
  fieldName,
  placeholder,
  isError,
  isTouched,
  as,
  children,
}) => (
  <>
    <label className={clsx([`label`, labelClass])} htmlFor={fieldName}>
      {label}
      {isRequired && <sup className="label-required">*</sup>}:
    </label>
    <div className="field-with-error-wrapper">
      <Field
        className={clsx([`field`, fieldClass, isError && isTouched && `field--error`])}
        id={fieldName}
        type={type}
        name={fieldName}
        placeholder={placeholder}
        as={as}
      >
        {children}
      </Field>

      <ErrorMessage name={fieldName} component="span" className="error-message" />
    </div>
  </>
);

export default CustomInput;
