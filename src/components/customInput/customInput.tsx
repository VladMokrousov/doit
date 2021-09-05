import React from 'react';
import { Field, ErrorMessage } from 'formik';

import { ICustomInput } from '../../interfaces';
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
}) => (
  <>
    <label className={`label ${labelClass ? labelClass : ''}`} htmlFor={fieldName}>
      {label}
      {isRequired && <sup className="label-required">*</sup>}:
    </label>
    <div className="field-with-error-wrapper">
      <Field
        className={`field ${fieldClass ? fieldClass : ''} ${
          isError && isTouched ? `field--error` : ''
        }`}
        id={fieldName}
        type={type}
        name={fieldName}
        placeholder={placeholder}
      />

      <ErrorMessage name={fieldName} component="span" className="error-message" />
    </div>
  </>
);

export default CustomInput;
