import React from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form } from 'formik';

import { useTooltipContext } from 'context';
import { signUpValidationSchema } from 'validationSchemas';
import { firebaseCreateUser, firebaseCreateUserWithGoogle } from 'services/firebase-service';
import CustomInput from 'components/customInput';
import inputsConfig from './inputs-config';

import './sign-up-modal-content.css';

const SignUpModalContent: React.FC = () => {
  const { showTooltip } = useTooltipContext();

  return (
    <>
      <Formik
        initialValues={{ email: '', password: '', repeatPassword: '' }}
        validationSchema={signUpValidationSchema}
        onSubmit={(values, { setSubmitting }) =>
          firebaseCreateUser(values, showTooltip, setSubmitting)
        }
      >
        {({ isSubmitting, errors, touched }) => (
          <Form className="sign-up-form">
            {inputsConfig.map((item) => (
              <div className="sign-up-form__field-wrapper" key={item.fieldName}>
                <CustomInput
                  label={item.label}
                  labelClass="sign-up-form__label"
                  isRequired={item.isRequired}
                  fieldClass="sign-up-form__field"
                  type={item.type}
                  fieldName={item.fieldName}
                  placeholder={item.placeholder}
                  isError={item.fieldName in errors}
                  isTouched={item.fieldName in touched}
                />
              </div>
            ))}

            <button className="sign-up-form__submit-btn" type="submit" disabled={isSubmitting}>
              Sign up
            </button>
          </Form>
        )}
      </Formik>

      <div className="modal--sign-up__sign-up-with-google">
        <span className="sign-up-with-google__text">Also you can</span>
        <button
          className="sign-up-with-google__btn"
          onClick={() => firebaseCreateUserWithGoogle(showTooltip)}
        >
          Sign up with
        </button>
      </div>

      <span className="modal--sign-up__go-to-sign-in">
        Already have an account?{' '}
        <Link className="modal--sign-up__sign-in-link" to="/sign-in">
          Sign in
        </Link>
      </span>
    </>
  );
};

export default SignUpModalContent;
