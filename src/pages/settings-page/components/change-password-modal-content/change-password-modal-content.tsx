import React, { useState, useEffect } from 'react';
import { useTooltipContext } from '../../../../context';
import firebase from 'firebase/app';
import './change-password-modal-content.css';

interface ChangePasswordModalProps {
  onToggleModal: (evt: any) => void;
  user: any;
}
interface IConfirmCredentials {
  email: string;
  oldPassword: string;
}

const ChangePasswordModalContent: React.FC<ChangePasswordModalProps> = ({
  onToggleModal,
  user,
}) => {
  const { showTooltip } = useTooltipContext();

  const [credentials, setCredentials] = useState<IConfirmCredentials>({
    email: user.email,
    oldPassword: '',
  });
  const [isFirstModal, setIsFirstModal] = useState(true);
  const [password, setPassword] = useState('');

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

  const onPasswordChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(evt.target.value);
  };

  const onConfirmCredentials = (evt: React.FormEvent<HTMLFormElement>): void => {
    evt.preventDefault();
    const { email, oldPassword } = credentials;

    const credential = firebase.auth.EmailAuthProvider.credential(email, oldPassword);

    user
      .reauthenticateWithCredential(credential)
      .then(() => {
        setIsFirstModal(false);
      })
      .catch((error: any) => {
        showTooltip(`Reauth didn't pass: ${error.message}`);
      });
  };

  const onSetNewPassword = (evt: React.FormEvent<HTMLFormElement>): void => {
    evt.preventDefault();
    // @todo Вылозит предупреждение от гугл, что в результате утечки даннных, пароль оказался раскрыт. Скорее всего связано с отсутствием шифрования с моей стороны
    user
      .updatePassword(password)
      .then(() => {
        showTooltip('Your password was successfully updated!');
        onToggleModal(evt);
      })
      .catch((err: any) => {
        showTooltip(`Your password didn't be update: ${err.message}`);
      });
  };

  return (
    <form
      className="change-password-form"
      onSubmit={isFirstModal ? onConfirmCredentials : onSetNewPassword}
    >
      {isFirstModal ? (
        <>
          <label htmlFor="email">Email (*): </label>
          <input
            className="change-password-form__email-field"
            id="email"
            type="email"
            placeholder="Enter you email"
            onChange={onCredentialsChange}
            value={credentials.email}
            required
          />

          <label htmlFor="oldPassword">Old password (*): </label>
          <input
            className="change-password-form__old-password-field"
            id="oldPassword"
            type="password"
            placeholder="Enter you old password"
            onChange={onCredentialsChange}
            value={credentials.oldPassword}
            required
          />
        </>
      ) : (
        <>
          <label htmlFor="newPassword">New password (*): </label>
          <input
            className="change-password-form__new-password-field"
            id="newPassword"
            type="password"
            placeholder="Enter new password"
            onChange={onPasswordChange}
            value={password}
            required
          />
          {/* @todo можно реализовать генерацию рандомного пароля
          <button className="change-password-form__generate-password" onClick={onGeneratePassword}>
            Generate password
          </button> */}
        </>
      )}

      <button className="change-password-form__submit-btn">
        {isFirstModal ? 'Continue' : 'Save'}
      </button>
    </form>
  );
};

export default ChangePasswordModalContent;
