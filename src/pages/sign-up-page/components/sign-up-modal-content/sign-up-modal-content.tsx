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
        <label htmlFor="email">Email (*): </label>
        <input
          className="sign-up-form__email-field"
          id="email"
          type="email"
          name="email"
          placeholder="Enter your email"
          onChange={onChange}
          value={state.email}
          required
        />

        <label htmlFor="password">Password (*): </label>
        <input
          className="sign-up-form__password-field"
          id="password"
          type="password"
          name="password"
          placeholder="Create a password"
          onChange={onChange}
          value={state.password}
          required
        />

        <label htmlFor="repeatPassword">Repeat password (*): </label>
        <input
          className="sign-up-form__repeat-password-field"
          id="repeatPassword"
          type="password"
          name="repeat-password"
          placeholder="Repeat a password"
          onChange={onChange}
          value={state.repeatPassword}
          required
        />

        <button className="sign-up-form__submit">Sign up</button>
      </form>
      <div className="modal--sign-up__sign-up-with-google">
        <span className="sign-up-with-google__text">
          You can pass an alternative registration with Google.{' '}
        </span>
        <button className="sign-up-with-google__btn" onClick={googleSignUp}>
          Let's do it!
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
