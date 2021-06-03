import React from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase/app';

import './header.css';

const Header: React.FC = () => {
  const signOut = (evt: React.MouseEvent<HTMLButtonElement>): void => {
    firebase
      .auth()
      .signOut()
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <header className="page-header">
      <div className="container flex-wrapper flex-wrapper--jsb">
        <nav className="main-nav">
          <Link to="/">Doit!</Link>
          <ul className="main-nav__list">
            <li className="main-nav__item">
              <Link to="/todo">Todo</Link>
            </li>
            <li className="main-nav__item">
              <Link to="/notes">Notes</Link>
            </li>
            <li className="main-nav__item">
              <Link to="/settings">Settings</Link>
            </li>
          </ul>
        </nav>

        <button className="page-header__sign-out" onClick={signOut}>
          Sign out
        </button>
      </div>
    </header>
  );
};

export default Header;
