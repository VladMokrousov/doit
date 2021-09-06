import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form } from 'formik';

import { useAppContext, useTooltipContext } from '../../../context/';
import { resetPasswordValidationSchema } from '../../../validationSchemas';
import { firebaseSendPasswordResetEmail } from '../../../services/firebase-service';
import CustomInput from '../../../components/customInput';

import './reset-password-modal-content.css';

const ResetPasswordModalContent: React.FC = () => {
  const { actionCodeSettings } = useAppContext();
  const { showTooltip } = useTooltipContext();

  return (
    <>
      <Formik
        initialValues={{
          email: '',
        }}
        validationSchema={resetPasswordValidationSchema}
        onSubmit={(values, { setSubmitting }) =>
          firebaseSendPasswordResetEmail(values, actionCodeSettings, showTooltip, setSubmitting)
        }
      >
        {({ isSubmitting, errors, touched }) => (
          <Form className="reset-password-form">
            {useMemo(
              () => (
                <div className="reset-password-form__field-wrapper">
                  <CustomInput
                    label="Email"
                    labelClass="reset-password-form__label"
                    isRequired={true}
                    fieldClass="reset-password-form__field"
                    type="email"
                    fieldName="email"
                    placeholder="Enter your email"
                    isError={'email' in errors}
                    isTouched={'email' in touched}
                  />
                </div>
              ),
              [errors, touched]
            )}

            <button
              className="reset-password-form__submit-btn"
              type="submit"
              disabled={isSubmitting}
            >
              Reset password
            </button>
          </Form>
        )}
      </Formik>

      <Link className="modal--reset-password__sign-in-link" to="/sign-in">
        I've just remembered :)
      </Link>
    </>
  );
};

export default ResetPasswordModalContent;
