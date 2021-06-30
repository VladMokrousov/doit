import React, { useState, useEffect, useContext } from 'react';
import { useTooltipContext } from './index';
import firebase from 'firebase/app';

interface AppContextProps {
  children: React.ReactNode;
}

// @todo По идее мне не нужно указывать тип и аргумент. Нужно посмотреть, как сделать нормально
const AppContext = React.createContext<any>({});

export const useAppContext = () => {
  return useContext(AppContext);
};

// @todo Не уверен, что корректно давать контексту тип React.FC
export const AppProvider: React.FC<AppContextProps> = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(false);
  const [isUserGet, setUserGet] = useState(false);

  const actionCodeSettings = {
    url: 'https://vladmokrousov.github.io/doit/build/#/sign-in',
    // url: 'http://localhost:3000/sign-in',
  };

  const { showTooltip } = useTooltipContext();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        if (!user.emailVerified) {
          user.sendEmailVerification(actionCodeSettings).catch((err) => {
            // @todo тултип не отображается
            showTooltip(`При подтверждении email произошла ошибка ${err.message}`);
          });
        }
        if (!localStorage.getItem('rememberMe')) {
          const lastSignInTime = new Date(user.metadata.lastSignInTime!);
          const lastSignInTimeTimeStamp = Math.round(lastSignInTime.getTime() / 1000);
          const yesterdayTimeStamp = Math.round(new Date().getTime() / 1000) - 24 * 3600;

          if (lastSignInTimeTimeStamp < yesterdayTimeStamp) {
            firebase
              .auth()
              .signOut()
              .catch((error) => {
                showTooltip(error.message);
              });
          } else {
            onLogIn(user);
          }
        } else {
          onLogIn(user);
        }
      } else {
        onLogOut();
      }
      setUserGet(true);
    });
  }, []);

  const onLogIn = (user: any): void => {
    setLoggedIn(true);
    setCurrentUser(user);
  };
  const onLogOut = (): void => {
    setLoggedIn(false);
    setCurrentUser(false);
  };

  return isUserGet ? (
    <AppContext.Provider value={{ isLoggedIn, currentUser, actionCodeSettings }}>
      {children}
    </AppContext.Provider>
  ) : null;
};
