import firebase from 'firebase/app';

import { TooltipTypes } from '../types';

export const firebaseCreateUser = (values: any, showTooltip: any, setSubmitting: any) =>
  firebase
    .auth()
    .createUserWithEmailAndPassword(values.email, values.password)
    .then(() => localStorage.setItem('rememberMe', 'true'))
    .catch((err) =>
      showTooltip(TooltipTypes.Error, `Your account didn't be created: ${err.message}`)
    )
    .finally(() => setSubmitting(false));

export const firebaseSignIn = (values: any, showTooltip: any, setSubmitting: any) => {
  if (values.rememberMe) {
    localStorage.setItem('rememberMe', 'true');
  } else {
    localStorage.removeItem('rememberMe');
  }

  firebase
    .auth()
    .signInWithEmailAndPassword(values.email, values.password)
    .catch((err) => showTooltip(TooltipTypes.Error, err.message))
    .finally(() => setSubmitting(false));
};

// @todo Do i need in almost the same Google signIn/Up?
// @todo  setSubmitting(false)
export const firebaseCreateUserWithGoogle = (showTooltip: any): void => {
  const provider = new firebase.auth.GoogleAuthProvider();

  firebase
    .auth()
    .signInWithPopup(provider)
    .then(() => localStorage.setItem('rememberMe', 'true'))
    .catch((error) => {
      showTooltip(TooltipTypes.Error, error.message);
    });
};

// @todo  setSubmitting(false)
export const firebaseGoogleSignIn = (showTooltip: any): void => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .catch((error) => {
      showTooltip(TooltipTypes.Error, error.message);
    });
};

// @todo  setSubmitting(false)
export const firebaseSignOut = (
  showTooltip: (type: TooltipTypes, message: string) => void
): Promise<void> =>
  firebase
    .auth()
    .signOut()
    .catch((error) => {
      showTooltip(TooltipTypes.Error, error.message);
    });

export const firebaseSendPasswordResetEmail = (
  values: any,
  actionCodeSettings: any,
  showTooltip: any,
  setSubmitting: any
) =>
  firebase
    .auth()
    .sendPasswordResetEmail(values.email, actionCodeSettings)
    .then(() => {
      showTooltip(TooltipTypes.Info, 'The email to reset your password was send');
    })
    .catch((err) => {
      showTooltip(TooltipTypes.Error, err.message);
    })
    .finally(() => setSubmitting(false));
