import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase/app';
import { useAppContext, useTooltipContext } from '../../../context/';
import './reset-password-modal-content.css';

const ResetPasswordModalContent: React.FC = () => {
  const { actionCodeSettings } = useAppContext();
  const { showTooltip } = useTooltipContext();

  const [email, setEmail] = useState('');

  const onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    // @todo Должна быть валидация
    setEmail(evt.target.value);
  };

  const onSubmit = (evt: React.FormEvent<HTMLFormElement>): void => {
    evt.preventDefault();
    firebase
      .auth()
      .sendPasswordResetEmail(email, actionCodeSettings)
      .then(() => {
        // @todo Всплывает тултип с просьбой проверить почту
      })
      .catch((err) => {
        showTooltip(err.message);
      });
  };

  return (
    <>
      <form className="reset-password-form" onSubmit={onSubmit}>
        <label htmlFor="email">Email (*): </label>
        <input
          className="reset-password-form__email-field"
          id="email"
          type="email"
          name="email"
          placeholder="Enter you email"
          onChange={onChange}
          value={email}
          required
        />

        <button className="reset-password-form__submit-btn">Reset password</button>
      </form>

      <Link className="modal--reset-password__sign-in-link" to="/sign-in">
        I remember :)
      </Link>
    </>
  );
};

export default ResetPasswordModalContent;
