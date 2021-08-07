import React, { useState } from 'react';
import firebase from 'firebase/app';

import { useTooltipContext } from '../../../../context';
import RequiredMark from '../../../../components/required-mark';
import { TooltipTypes } from '../../../../types';
import './change-email-modal-content.css';

interface ChangeEmailModalProps {
  onToggleModal: (evt: any) => void;
  user: any;
  actionCodeSettings: any;
}
interface IConfirmCredentials {
  oldEmail: string;
  password: string;
}

const ChangeEmailModalContent: React.FC<ChangeEmailModalProps> = ({
  onToggleModal,
  user,
  actionCodeSettings,
}) => {
  const { showTooltip } = useTooltipContext();

  const [credentials, setCredentials] = useState<IConfirmCredentials>({
    oldEmail: user.email,
    password: '',
  });
  const [email, setEmail] = useState('');
  const [isFirstModal, setIsFirstModal] = useState(true);

  const onCredentialsChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const id: string = evt.target.id;
    const value: string = evt.target.value;

    setCredentials((prevState) => {
      return {
        ...prevState,
        [id]: value,
      };
    });
  };

  const onEmailChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(evt.target.value);
  };

  const onConfirmCredentials = (evt: React.FormEvent<HTMLFormElement>): void => {
    evt.preventDefault();
    const { oldEmail, password } = credentials;

    const credential = firebase.auth.EmailAuthProvider.credential(oldEmail, password);

    user
      .reauthenticateWithCredential(credential)
      .then(() => {
        setIsFirstModal(false);
      })
      .catch((error: any) => {
        showTooltip(TooltipTypes.Error, `Reauth didn't pass: ${error.message}`);
      });
  };
  const onSetNewEmail = (evt: React.FormEvent<HTMLFormElement>): void => {
    evt.preventDefault();

    user
      .verifyBeforeUpdateEmail(email, actionCodeSettings)
      .then(() => {
        showTooltip(
          TooltipTypes.Info,
          'Check your new email and confirm it to finish the change the email'
        );
        onToggleModal(evt);
      })
      .catch(function (err: any) {
        showTooltip(TooltipTypes.Error, `Your email didn't update: ${err.message}`);
      });
  };

  return (
    <form
      className="change-email-form"
      onSubmit={isFirstModal ? onConfirmCredentials : onSetNewEmail}
    >
      {isFirstModal ? (
        <>
          <div className="change-email-form__field-wrapper">
            <label className="change-email-form__label" htmlFor="oldEmail">
              Old email
              <RequiredMark />:
            </label>
            <input
              className="change-email-form__field"
              id="oldEmail"
              type="email"
              placeholder="Enter you old email"
              onChange={onCredentialsChange}
              value={credentials.oldEmail}
              required
            />
          </div>
          <div className="change-email-form__field-wrapper">
            <label className="change-email-form__label" htmlFor="password">
              Password
              <RequiredMark />:
            </label>
            <input
              className="change-email-form__field"
              id="password"
              type="password"
              placeholder="Enter you password"
              onChange={onCredentialsChange}
              value={credentials.password}
              required
            />
          </div>
        </>
      ) : (
        <div className="change-email-form__field-wrapper">
          <label className="change-email-form__label" htmlFor="newEmail">
            New email
            <RequiredMark />:
          </label>
          <input
            className="change-email-form__field"
            id="newEmail"
            type="email"
            placeholder="Enter the new email"
            onChange={onEmailChange}
            value={email}
            required
          />
        </div>
      )}

      <button className="change-email-form__submit-btn">
        {isFirstModal ? 'Continue' : 'Save'}
      </button>
    </form>
  );
};

export default ChangeEmailModalContent;
