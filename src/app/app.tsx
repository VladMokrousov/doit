import React from 'react';
import { HashRouter as Router, Redirect, Route } from 'react-router-dom';
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
              <Route path="/sign-in" render={() => <Redirect to="/" />} />
              <Route path="/sign-up" render={() => <Redirect to="/" />} />
              <Header />
              <Tooltip />
              <Route path="/" component={MainPage} exact />
              <Route path="/todo" component={TodosPage} />
              <Route path="/notes" component={NotesPage} />
              <Route path="/settings" component={SettingsPage} />
            </>
          ) : (
            <>
              <Route path="/sign-in" render={() => <Redirect to="/" />} />
              <Route path="/sign-up" render={() => <Redirect to="/" />} />
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
          <Route path="/sign-up" component={SignUpPage} />
          <Route path="/sign-in" component={SignInPage} />
          <Route path="/reset-password" component={ResetPasswordPage} />
          <Redirect to="/sign-up" />
        </>
      )}
    </Router>
  );
};

export default App;
