import React, { useState } from 'react';
import { Form, Formik } from 'formik';

import CustomInput from 'components/customInput';
import { useTooltipContext } from 'context';
import {
  firebaseConfirmUserCredentials,
  firebaseSetNewUsersPassword,
} from 'services/firebase-service';
import {
  changePasswordFormStepOneValidationSchema,
  changePasswordFormStepTwoValidationSchema,
} from 'validationSchemas';

import './change-password-modal-content.css';

interface ChangePasswordModalProps {
  onToggleModal: () => void;
  user: any;
}

export interface IPartOfFormikBag {
  setSubmitting: (isSubmitting: boolean) => void;
}

const ChangePasswordModalContent: React.FC<ChangePasswordModalProps> = ({
  onToggleModal,
  user,
}) => {
  const { showTooltip } = useTooltipContext();

  const [isFirstModal, setIsFirstModal] = useState(true);

  const onConfirmCredentials = (values: any, { setSubmitting }: IPartOfFormikBag): void =>
    firebaseConfirmUserCredentials(
      user,
      setIsFirstModal,
      showTooltip,
      { email: values.email, password: values.oldPassword },
      setSubmitting
    );

  const onSetNewPassword = (values: any, { setSubmitting }: IPartOfFormikBag): void =>
    firebaseSetNewUsersPassword(user, showTooltip, onToggleModal, values, setSubmitting);

  return (
    <Formik
      initialValues={
        isFirstModal
          ? {
              email: user.email,
              oldPassword: '',
            }
          : {
              newPassword: '',
            }
      }
      enableReinitialize={true}
      validationSchema={
        isFirstModal
          ? changePasswordFormStepOneValidationSchema
          : changePasswordFormStepTwoValidationSchema
      }
      onSubmit={isFirstModal ? onConfirmCredentials : onSetNewPassword}
    >
      {({ isSubmitting, errors, touched }) => (
        <Form className="change-password-form">
          {isFirstModal ? (
            <>
              <div className="change-password-form__field-wrapper">
                <CustomInput
                  label={'Email'}
                  labelClass="change-password-form__label"
                  isRequired={true}
                  fieldClass="change-password-form__field change-password-form__email-field"
                  type={'email'}
                  fieldName={'email'}
                  placeholder={'Enter your email'}
                  isError={'email' in errors}
                  isTouched={'email' in touched}
                />
              </div>

              <div className="change-password-form__field-wrapper">
                <CustomInput
                  label={'Old password'}
                  labelClass="change-password-form__label"
                  isRequired={true}
                  fieldClass="change-password-form__field change-password-form__old-password-field"
                  type={'password'}
                  fieldName={'oldPassword'}
                  placeholder={'Enter your old password'}
                  isError={'oldPassword' in errors}
                  isTouched={'oldPassword' in touched}
                />
              </div>
            </>
          ) : (
            <div className="change-password-form__field-wrapper">
              <CustomInput
                label={'New password'}
                labelClass="change-password-form__label"
                isRequired={true}
                fieldClass="change-password-form__field change-password-form__new-password-field"
                type={'password'}
                fieldName={'newPassword'}
                placeholder={'Enter your new password'}
                isError={'newPassword' in errors}
                isTouched={'newPassword' in touched}
              />
            </div>

            /* @todo можно реализовать генерацию рандомного пароля
          <button className="change-password-form__generate-password" onClick={onGeneratePassword}>
            Generate password
          </button> */
          )}

          <button
            className="change-password-form__submit-btn"
            type="submit"
            disabled={isSubmitting}
          >
            {isFirstModal ? 'Continue' : 'Save'}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ChangePasswordModalContent;
