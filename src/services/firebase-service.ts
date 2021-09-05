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

export const firebaseSignOut = (
  showTooltip: (type: TooltipTypes, message: string) => void
): Promise<void> =>
  firebase
    .auth()
    .signOut()
    .catch((error) => {
      showTooltip(TooltipTypes.Error, error.message);
    });
