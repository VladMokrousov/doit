import React from 'react';

import PageTitle from 'components/page-title';
import UserAvatar from './components/user-avatar';
import UserName from './components/user-name';
import UserEmail from './components/user-email';
import UserPassword from './components/user-password';
import UserDelete from './components/user-delete';
import { useAppContext } from 'context';

import './index.css';

const SettingsPage: React.FC = () => {
  const { currentUser } = useAppContext();
  const isGoogleUser = currentUser.providerData[0].providerId === 'google.com';

  return (
    <main className="settings-page">
      <div className="container">
        <PageTitle text="Settings" />
        <h2 className="settings-page__subtitle">Account</h2>

        <div className="settings-wrapper">
          <UserAvatar />
          <UserName />
          <UserEmail />

          {!isGoogleUser && <UserPassword />}
          <UserDelete />
        </div>
        <h2 className="settings-page__subtitle">App</h2>
        {/* @todo Здесь будет тогглер цветовой схемы сайта */}
      </div>
    </main>
  );
};

export default SettingsPage;
