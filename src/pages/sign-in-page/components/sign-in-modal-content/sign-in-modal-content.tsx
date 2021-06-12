import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase/app';
import { useTooltipContext } from '../../../../context';
import './sign-in-modal-content.css';

interface ISignInModalContentState {
  email: string;
  password: string;
}

const SignInModalContent: React.FC = () => {
  const { showTooltip } = useTooltipContext();

  const [state, setState] = useState<ISignInModalContentState>({
    email: '',
    password: '',
  });
  const [isRememberMeChecked, setIsRememberMeChecked] = useState(
    localStorage.getItem('rememberMe')
  );

  const onChange = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    const id: string = evt.target.id;
    const value: string = evt.target.value;
    setState((prevState) => {
      return {
        ...prevState,
        [id]: value,
      };
    });
  };

  const onRememberMeToggle = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    if (isRememberMeChecked) {
      localStorage.removeItem('rememberMe');
      setIsRememberMeChecked(null);
    } else {
      localStorage.setItem('rememberMe', 'true');
      setIsRememberMeChecked('true');
    }
  };

  const onSubmit = (evt: React.FormEvent<HTMLFormElement>): void => {
    evt.preventDefault();
    const { email, password } = state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((err) => showTooltip(err.message));
  };
  const googleSignIn = (): void => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .catch((error) => {
        showTooltip(error.message);
      });
  };

  return (
    <>
      <form className="sign-in-form" onSubmit={onSubmit}>
        <div className="sign-in-form__field-wrapper">
          <label className="sign-in-form__label" htmlFor="email">
            Email<sup className="sign-in-form__label-required">*</sup>:
          </label>
          <input
            className="sign-in-form__field"
            id="email"
            type="email"
            name="email"
            placeholder="Enter your email"
            onChange={onChange}
            value={state.email}
            required
          />
        </div>

        <div className="sign-in-form__field-wrapper">
          <label className="sign-in-form__label" htmlFor="password">
            Password<sup className="sign-in-form__label-required">*</sup>:
          </label>
          <input
            className="sign-in-form__field"
            id="password"
            type="password"
            name="password"
            placeholder="Enter your password"
            onChange={onChange}
            value={state.password}
            required
          />
        </div>

        <div className="sign-in-form__field-wrapper sign-in-form__field-wrapper--checkbox">
          <label className="sign-in-form__label" htmlFor="rememberMe">
            Remember me:
          </label>
          <input
            className="sign-in-form__field sign-in-form__field--checkbox"
            id="rememberMe"
            type="checkbox"
            name="remember-me"
            onChange={onRememberMeToggle}
            checked={isRememberMeChecked ? true : false}
          />
        </div>

        <button className="sign-in-form__submit-btn">Sign in</button>
      </form>

      <button className="modal--sign-in__google-btn" onClick={googleSignIn}>
        Sign in with
      </button>

      <span className="modal--sign-in__go-to-reset">
        Forgot password?{' '}
        <Link className="modal--sign-in__link" to="/reset-password">
          Reset
        </Link>
      </span>
      <span className="modal--sign-in__go-to-sign-up">
        Back to{' '}
        <Link className="modal--sign-in__link" to="/sign-up">
          Sign up
        </Link>
      </span>
    </>
  );
};

export default SignInModalContent;
