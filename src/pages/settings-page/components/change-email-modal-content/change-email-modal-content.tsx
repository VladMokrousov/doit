import React, { useState } from 'react';
import { Form, Formik } from 'formik';

import CustomInput from 'components/customInput';
import { useTooltipContext } from 'context';
import {
  firebaseConfirmUserCredentials,
  firebaseSetNewUsersEmail,
} from 'services/firebase-service';
import {
  changeEmailFormStepOneValidationSchema,
  changeEmailFormStepTwoValidationSchema,
} from 'validationSchemas';

import './change-email-modal-content.css';

interface ChangeEmailModalProps {
  onToggleModal: () => void;
  user: any;
  actionCodeSettings: any;
}

export interface IPartOfFormikBag {
  setSubmitting: (isSubmitting: boolean) => void;
}

const ChangeEmailModalContent: React.FC<ChangeEmailModalProps> = ({
  onToggleModal,
  user,
  actionCodeSettings,
}) => {
  const { showTooltip } = useTooltipContext();

  const [isFirstModal, setIsFirstModal] = useState(true);

  const onConfirmCredentials = (values: any, { setSubmitting }: IPartOfFormikBag): void =>
    firebaseConfirmUserCredentials(
      user,
      setIsFirstModal,
      showTooltip,
      { email: values.oldEmail, password: values.password },
      setSubmitting
    );

  const onSetNewEmail = (values: any, { setSubmitting }: IPartOfFormikBag): void =>
    firebaseSetNewUsersEmail(
      user,
      actionCodeSettings,
      showTooltip,
      onToggleModal,
      values,
      setSubmitting
    );

  // @todo Есть некий баг, связнанный с тем, что изначально newEmail = undefined из-за этого также нельзя прописать нормальные типы в onSubmit-функциях
  // Судя по всему, самое правильное - разделить модалки на два компонента и тут, и в change the password, и в delete the account
  return (
    <Formik
      initialValues={
        isFirstModal
          ? {
              oldEmail: user.email,
              password: '',
            }
          : {
              newEmail: '',
            }
      }
      enableReinitialize={true}
      validationSchema={
        isFirstModal
          ? changeEmailFormStepOneValidationSchema
          : changeEmailFormStepTwoValidationSchema
      }
      onSubmit={isFirstModal ? onConfirmCredentials : onSetNewEmail}
    >
      {({ isSubmitting, errors, touched }) => (
        <Form className="change-email-form">
          {isFirstModal ? (
            <>
              <div className="change-email-form__field-wrapper">
                <CustomInput
                  label={'Old email'}
                  labelClass="change-email-form__label"
                  isRequired={true}
                  fieldClass="change-email-form__field"
                  type={'email'}
                  fieldName={'oldEmail'}
                  placeholder={'Enter your old email'}
                  isError={'oldEmail' in errors}
                  isTouched={'oldEmail' in touched}
                />
              </div>

              <div className="change-email-form__field-wrapper">
                <CustomInput
                  label={'Password'}
                  labelClass="change-email-form__label"
                  isRequired={true}
                  fieldClass="change-email-form__field"
                  type={'password'}
                  fieldName={'password'}
                  placeholder={'Enter your password'}
                  isError={'password' in errors}
                  isTouched={'password' in touched}
                />
              </div>
            </>
          ) : (
            <div className="change-email-form__field-wrapper">
              <CustomInput
                label={'New email'}
                labelClass="change-email-form__label"
                isRequired={true}
                fieldClass="change-email-form__field"
                type={'email'}
                fieldName={'newEmail'}
                placeholder={'Enter your new email'}
                isError={'newEmail' in errors}
                isTouched={'newEmail' in touched}
              />
            </div>
          )}

          <button className="change-email-form__submit-btn" type="submit" disabled={isSubmitting}>
            {isFirstModal ? 'Continue' : 'Save'}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ChangeEmailModalContent;
