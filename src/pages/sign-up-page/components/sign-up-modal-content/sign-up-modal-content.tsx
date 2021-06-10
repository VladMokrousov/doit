import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTooltipContext } from '../../../../context';
import firebase from 'firebase/app';

import './sign-up-modal-content.css';

interface ISignUpModalContentState {
  email: string;
  password: string;
  repeatPassword: string;
}

const SignUpModalContent: React.FC = () => {
  const { showTooltip } = useTooltipContext();

  const [state, setState] = useState<ISignUpModalContentState>({
    email: '',
    password: '',
    repeatPassword: '',
  });

  const onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const id: string = evt.target.id;
    const value: string = evt.target.value;
    setState((prevState) => {
      return {
        ...prevState,
        [id]: value,
      };
    });
  };

  const onSubmit = (evt: React.FormEvent<HTMLFormElement>): void => {
    evt.preventDefault();

    const { email, password, repeatPassword } = state;
    if (password == repeatPassword) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => localStorage.setItem('rememberMe', 'true'))
        .catch((err) => showTooltip(`Your account didn't be created: ${err.message}`));
    } else {
      showTooltip("You password and repeated password don't match");
    }
  };

  const googleSignUp = (): void => {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase
      .auth()
      .signInWithPopup(provider)
      .then(() => localStorage.setItem('rememberMe', 'true'))
      .catch((error) => {
        showTooltip(error.message);
      });
  };

  return (
    <>
      <form className="sign-up-form" onSubmit={onSubmit}>
        <div className="sign-up-form__field-wrapper">
          <label className="sign-up-form__label" htmlFor="email">
            Email<sup className="sign-up-form__label-required">*</sup>:
          </label>
          <input
            className="sign-up-form__field"
            id="email"
            type="email"
            name="email"
            placeholder="Enter your email"
            onChange={onChange}
            value={state.email}
            required
          />
        </div>

        <div className="sign-up-form__field-wrapper">
          <label className="sign-up-form__label" htmlFor="password">
            Password<sup className="sign-up-form__label-required">*</sup>:
          </label>
          <input
            className="sign-up-form__field"
            id="password"
            type="password"
            name="password"
            placeholder="Create a password"
            onChange={onChange}
            value={state.password}
            required
          />
        </div>

        <div className="sign-up-form__field-wrapper">
          <label className="sign-up-form__label" htmlFor="repeatPassword">
            Repeat password<sup className="sign-up-form__label-required">*</sup>:
          </label>
          <input
            className="sign-up-form__field"
            id="repeatPassword"
            type="password"
            name="repeat-password"
            placeholder="Repeat a password"
            onChange={onChange}
            value={state.repeatPassword}
            required
          />
        </div>

        <button className="sign-up-form__submit">Sign up</button>
      </form>
      <div className="modal--sign-up__sign-up-with-google">
        <span className="sign-up-with-google__text">Also you can</span>
        <button className="sign-up-with-google__btn" onClick={googleSignUp}>
          Sign up with
        </button>
      </div>

      <span className="modal--sign-up__go-to-sign-in">
        Already have an account?{' '}
        <Link className="modal--sign-up__sign-in-link" to="/sign-in">
          Sign in
        </Link>
      </span>
    </>
  );
};

export default SignUpModalContent;
