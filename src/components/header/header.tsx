import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTooltipContext } from '../../context';
import firebase from 'firebase/app';

import './header.css';

const Header: React.FC = () => {
  const { showTooltip } = useTooltipContext();
  const signOut = (evt: React.MouseEvent<HTMLButtonElement>): void => {
    firebase
      .auth()
      .signOut()
      .catch((error) => {
        showTooltip(error.message);
      });
  };

  return (
    <header className="page-header">
      <div className="container flex-wrapper">
        <nav className="main-nav">
          <NavLink exact to="/" className="main-nav__link" activeClassName="main-nav__active-link">
            Doit!
          </NavLink>
          <ul className="main-nav__list">
            <li className="main-nav__item">
              <NavLink
                to="/todo"
                className="main-nav__link"
                activeClassName="main-nav__active-link"
              >
                Todo
              </NavLink>
            </li>
            <li className="main-nav__item">
              <NavLink
                to="/notes"
                className="main-nav__link"
                activeClassName="main-nav__active-link"
              >
                Notes
              </NavLink>
            </li>
            <li className="main-nav__item">
              <NavLink
                to="/settings"
                className="main-nav__link"
                activeClassName="main-nav__active-link"
              >
                Settings
              </NavLink>
            </li>
          </ul>
        </nav>

        <button className="page-header__sign-out-btn" onClick={signOut}>
          Sign out
        </button>
      </div>
    </header>
  );
};

export default Header;
