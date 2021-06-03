import React, { useState, useEffect, useContext } from 'react';
import firebase from 'firebase/app';

interface AppContextProps {
  children: React.ReactNode;
}

//По идее мне не нужно указывать тип и аргумент. Нужно посмотреть, как сделать нормально
const AppContext = React.createContext<any>({});

export const useAppContext = () => {
  return useContext(AppContext);
};

//Не уверен, что корректно давать контексту тип React.FC
export const AppProvider: React.FC<AppContextProps> = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(false);
  const [isUserGet, setUserGet] = useState(false);

  const actionCodeSettings = {
    // @todo Заменить на реальный адрес приложения
    url: 'https://vladmokrousov.github.io/doit/build/index.html',
    // url: 'http://localhost:3000/sign-in',
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        if (!user.emailVerified) {
          user.sendEmailVerification(actionCodeSettings).catch((err) => {
            console.log('При подтверждении email произошла ошибка', err.message);
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
                console.log(error.message);
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
