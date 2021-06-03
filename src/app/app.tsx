import React from 'react';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import {
  MainPage,
  TodosPage,
  NotesPage,
  SettingsPage,
  SignUpPage,
  SignInPage,
  ResetPasswordPage,
} from '../pages';
import { useAppContext } from '../context';
import Header from '../components/header';
import Tooltip from '../components/tooltip';

import '../assets/css/normalize.css';
import './app.css';
import './scaffolding.css';

const App: React.FC = () => {
  const { isLoggedIn, currentUser } = useAppContext();

  return (
    <Router>
      {isLoggedIn ? (
        <>
          {currentUser.emailVerified ? (
            <>
              <Header />
              <Tooltip />
              <Route path="/" render={() => <MainPage />} exact />
              <Route path="/todo" render={() => <TodosPage />} />
              <Route path="/notes" render={() => <NotesPage />} />
              <Route path="/settings" render={() => <SettingsPage />} />
              <Redirect to="/" />
            </>
          ) : (
            <>
              <Header />
              <div className="app__overlay">
                <span className="app__confirm-message">
                  Please confirm your email to use the app
                </span>
              </div>
            </>
          )}
        </>
      ) : (
        <>
          <Tooltip />
          <Route path="/sign-up" render={() => <SignUpPage />} />
          <Route path="/sign-in" render={() => <SignInPage />} />
          <Route path="/reset-password" render={() => <ResetPasswordPage />} />
          <Redirect to="/sign-up" />
        </>
      )}
    </Router>
  );
};

export default App;
