import React from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form } from 'formik';

import { useTooltipContext } from 'context';
import { signInValidationSchema } from 'validationSchemas';
import { firebaseSignIn, firebaseGoogleSignIn } from 'services/firebase-service';
import inputsConfig from './inputs-config';
import CustomInput from 'components/customInput';
import { clsx } from 'helpers';

import './sign-in-modal-content.css';

const SignInModalContent: React.FC = () => {
  const { showTooltip } = useTooltipContext();

  return (
    <>
      <Formik
        initialValues={{
          email: '',
          password: '',
          rememberMe: Boolean(localStorage.getItem('rememberMe')),
        }}
        validationSchema={signInValidationSchema}
        onSubmit={(values, { setSubmitting }) => firebaseSignIn(values, showTooltip, setSubmitting)}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form className="sign-in-form">
            {inputsConfig.map((item) => (
              <div
                className={clsx([
                  `sign-in-form__field-wrapper`,
                  item.fieldName === `rememberMe` && `sign-in-form__field-wrapper--checkbox`,
                ])}
                key={item.fieldName}
              >
                <CustomInput
                  label={item.label}
                  labelClass="sign-in-form__label"
                  isRequired={item.isRequired}
                  fieldClass={clsx([
                    `sign-up-form__field`,
                    item.fieldName === `rememberMe` && `sign-in-form__field--checkbox`,
                  ])}
                  type={item.type}
                  fieldName={item.fieldName}
                  placeholder={item.placeholder}
                  isError={item.fieldName in errors}
                  isTouched={item.fieldName in touched}
                />
              </div>
            ))}

            <button className="sign-in-form__submit-btn" type="submit" disabled={isSubmitting}>
              Sign in
            </button>
          </Form>
        )}
      </Formik>

      <button
        className="modal--sign-in__google-btn"
        onClick={() => firebaseGoogleSignIn(showTooltip)}
      >
        Sign in with
      </button>

      <span className="modal--sign-in__go-to-reset">
        Forgot password?{' '}
        <Link className="modal--sign-in__link" to="/reset-password">
          Reset
        </Link>
      </span>
      <span className="modal--sign-in__go-to-sign-up">
        Back to{' '}
        <Link className="modal--sign-in__link" to="/sign-up">
          Sign up
        </Link>
      </span>
    </>
  );
};

export default SignInModalContent;
