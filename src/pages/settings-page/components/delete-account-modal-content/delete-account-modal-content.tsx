import React, { useState } from 'react';
import { Form, Formik } from 'formik';

import { useTooltipContext } from 'context';
import CustomInput from 'components/customInput';
import { deleteAccountFormStepOneValidationSchema } from 'validationSchemas';
import {
  firebaseConfirmUserCredentials,
  firebaseDeleteUserAccount,
} from 'services/firebase-service';

import './delete-account-modal-content.css';

interface ChangeAccountDeleteModalProps {
  onToggleModal: () => void;
  user: any;
}

export interface IPartOfFormikBag {
  setSubmitting: (isSubmitting: boolean) => void;
}

const ChangeAccountDeleteModalContent: React.FC<ChangeAccountDeleteModalProps> = ({
  onToggleModal,
  user,
}) => {
  const { showTooltip } = useTooltipContext();
  const [isFirstModal, setIsFirstModal] = useState(true);

  const onConfirmCredentials = (values: any, { setSubmitting }: IPartOfFormikBag): void =>
    firebaseConfirmUserCredentials(user, setIsFirstModal, showTooltip, values, setSubmitting);

  const onDeleteAccount = (values: any, { setSubmitting }: IPartOfFormikBag): void =>
    firebaseDeleteUserAccount(user, showTooltip, setSubmitting);

  return (
    <Formik
      initialValues={
        isFirstModal
          ? {
              email: user.email,
              password: '',
            }
          : {}
      }
      enableReinitialize={true}
      validationSchema={isFirstModal ? deleteAccountFormStepOneValidationSchema : undefined}
      onSubmit={isFirstModal ? onConfirmCredentials : onDeleteAccount}
    >
      {({ isSubmitting, errors, touched }) => (
        <Form className="delete-account-form">
          {isFirstModal ? (
            <>
              <div className="delete-account-form__field-wrapper">
                <CustomInput
                  label={'Email'}
                  labelClass="delete-account-form__label"
                  isRequired={true}
                  fieldClass="delete-account-form__field delete-account-form__email-field"
                  type={'email'}
                  fieldName={'email'}
                  placeholder={'Enter your email'}
                  isError={'email' in errors}
                  isTouched={'email' in touched}
                />
              </div>

              <div className="delete-account-form__field-wrapper">
                <CustomInput
                  label={'Password'}
                  labelClass="delete-account-form__label"
                  isRequired={true}
                  fieldClass="delete-account-form__field change-password-form__password-field"
                  type={'password'}
                  fieldName={'password'}
                  placeholder={'Enter your password'}
                  isError={'password' in errors}
                  isTouched={'password' in touched}
                />
              </div>

              <button
                className="delete-account-form__btn delete-account-form__submit-btn"
                type="submit"
                disabled={isSubmitting}
              >
                Continue
              </button>
            </>
          ) : (
            <>
              <span className="delete-account-form__warning-text">
                Do you want <b>to delete</b> your account <b>forever</b>? This action is
                irreversibly...
              </span>
              <div className="delete-account-form__btn-wrapper">
                <button
                  className="delete-account-form__btn delete-account-form__agree-btn"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Yes
                </button>
                <button
                  className="delete-account-form__btn delete-account-form__disagree-btn"
                  type="button"
                  onClick={() => onToggleModal()}
                >
                  No
                </button>
              </div>
            </>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default ChangeAccountDeleteModalContent;
