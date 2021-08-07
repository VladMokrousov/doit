import React, { useState } from 'react';
import firebase from 'firebase/app';

import { useTooltipContext } from '../../../../context';
import RequiredMark from '../../../../components/required-mark';
import { TooltipTypes } from '../../../../types';
import './delete-account-modal-content.css';

interface ChangeAccountDeleteModalProps {
  onToggleModal: (evt: any) => void;
  user: any;
}
interface IConfirmCredentials {
  email: string;
  password: string;
}

const ChangeAccountDeleteModalContent: React.FC<ChangeAccountDeleteModalProps> = ({
  onToggleModal,
  user,
}) => {
  const { showTooltip } = useTooltipContext();
  const [credentials, setCredentials] = useState<IConfirmCredentials>({
    email: user.email,
    password: '',
  });
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

  const onConfirmCredentials = (evt: React.FormEvent<HTMLFormElement>): void => {
    evt.preventDefault();
    const { email, password } = credentials;

    const credential = firebase.auth.EmailAuthProvider.credential(email, password);

    user
      .reauthenticateWithCredential(credential)
      .then(() => {
        setIsFirstModal(false);
      })
      .catch((error: any) => {
        showTooltip(TooltipTypes.Error, `Reauth didn't pass: ${error.message}`);
      });
  };

  const onDeleteAccount = (evt: React.FormEvent<HTMLFormElement>): void => {
    evt.preventDefault();
    user.delete().catch((err: any) => {
      showTooltip(TooltipTypes.Error, `Your account didn't be deleted: ${err.message}`);
    });
  };

  const onCancelDeleteAccount = (evt: React.MouseEvent<HTMLButtonElement>): void => {
    onToggleModal(evt);
  };

  return (
    <form
      className="delete-account-form"
      onSubmit={isFirstModal ? onConfirmCredentials : onDeleteAccount}
    >
      {isFirstModal ? (
        <>
          <div className="delete-account-form__field-wrapper">
            <label className="delete-account-form__label" htmlFor="email">
              Email
              <RequiredMark />:
            </label>
            <input
              className="delete-account-form__field delete-account-form__email-field"
              id="email"
              type="email"
              placeholder="Enter you email"
              onChange={onCredentialsChange}
              value={credentials.email}
              required
            />
          </div>
          <div className="delete-account-form__field-wrapper">
            <label className="delete-account-form__label" htmlFor="password">
              Password
              <RequiredMark />:
            </label>
            <input
              className="delete-account-form__field delete-account-form__password-field"
              id="password"
              type="password"
              placeholder="Enter you password"
              onChange={onCredentialsChange}
              value={credentials.password}
              required
            />
          </div>
          <button className="delete-account-form__btn delete-account-form__submit-btn">
            Continue
          </button>
        </>
      ) : (
        <>
          <span className="delete-account-form__warning-text">
            Do you want <b>to delete</b> your account <b>forever</b>? This action is irreversibly...
          </span>
          <div className="delete-account-form__btn-wrapper">
            <button
              className="delete-account-form__btn delete-account-form__agree-btn"
              type="submit"
            >
              Yes
            </button>
            <button
              className="delete-account-form__btn delete-account-form__disagree-btn"
              type="button"
              onClick={onCancelDeleteAccount}
            >
              No
            </button>
          </div>
        </>
      )}
    </form>
  );
};

export default ChangeAccountDeleteModalContent;
