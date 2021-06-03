import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
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
  const [credentials, setCredentials] = useState<IConfirmCredentials>({
    oldEmail: user.email,
    password: '',
  });
  const [email, setEmail] = useState(user.email);
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
        console.log('Не удалось сделать reauth', error);
      });
  };
  const onSetNewEmail = (evt: React.FormEvent<HTMLFormElement>): void => {
    evt.preventDefault();

    user
      .verifyBeforeUpdateEmail(email, actionCodeSettings)
      .then(() => {
        // @todo Здесь я должен показывать ползователю тултип, что он должен подтвердить свой емейл, чтобы закончить его изменение
        console.log('Confirm your new email to finish change the email');
        onToggleModal(evt);
      })
      .catch(function (err: any) {
        console.log('Не удалось обновить email.', err.message);
      });
  };

  return (
    <form
      className="change-email-form"
      onSubmit={isFirstModal ? onConfirmCredentials : onSetNewEmail}
    >
      {isFirstModal ? (
        <>
          <label htmlFor="oldEmail">Old email (*): </label>
          <input
            className="change-email-form__old-email-field"
            id="oldEmail"
            type="email"
            placeholder="Enter you old email"
            onChange={onCredentialsChange}
            value={credentials.oldEmail}
            required
          />

          <label htmlFor="password">Password (*): </label>
          <input
            className="change-email-form__password-field"
            id="password"
            type="password"
            placeholder="Enter you password"
            onChange={onCredentialsChange}
            value={credentials.password}
            required
          />
        </>
      ) : (
        <>
          <label htmlFor="newEmail">New email (*): </label>
          <input
            className="change-email-form__new-email-field"
            id="newEmail"
            type="email"
            placeholder="Enter new email"
            onChange={onEmailChange}
            value={email}
            required
          />
        </>
      )}

      <button className="change-email-form__submit">{isFirstModal ? 'Continue' : 'Save'}</button>
    </form>
  );
};

export default ChangeEmailModalContent;
