import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase/app';
import { useAppContext, useTooltipContext } from '../../../context/';
import { TooltipTypes } from '../../../types';
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
        showTooltip(TooltipTypes.Info, 'The email to reset your password was send');
      })
      .catch((err) => {
        showTooltip(TooltipTypes.Error, err.message);
      });
  };

  return (
    <>
      <form className="reset-password-form" onSubmit={onSubmit}>
        <div className="reset-password-form__field-wrapper">
          <label className="reset-password-form__label" htmlFor="email">
            Email<sup className="reset-password-form__label-required">*</sup>:
          </label>
          <input
            className="reset-password-form__field"
            id="email"
            type="email"
            name="email"
            placeholder="Enter your email"
            onChange={onChange}
            value={email}
            required
          />
        </div>
        <button className="reset-password-form__submit-btn">Reset password</button>
      </form>

      <Link className="modal--reset-password__sign-in-link" to="/sign-in">
        I remember :)
      </Link>
    </>
  );
};

export default ResetPasswordModalContent;
