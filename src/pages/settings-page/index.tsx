import React, { useState, useEffect } from 'react';
import PageTitle from '../../components/page-title';
import Portal from '../../components/portal';
import Modal from '../../components/modal';
import { useAppContext, useTooltipContext } from '../../context';
import firebase from 'firebase/app';
import ChangeEmailModalContent from './components/change-email-modal-content';
import ChangePasswordModalContent from './components/change-password-modal-content';
import DeleteAccountModalContent from './components/delete-account-modal-content';
import './index.css';

// @todo Рефакторинг компонента + привести к единому виду названия функций, переменных из useState
const SettingsPage: React.FC = () => {
  const { currentUser, actionCodeSettings } = useAppContext();
  const { showTooltip } = useTooltipContext();

  const [name, setName] = useState(currentUser.displayName);
  const [photoUrl, setPhotoUrl] = useState(currentUser.photoURL);
  const [isNameClicked, setIsNameClicked] = useState(false);
  const [isAvatarClicked, setIsAvatarClicked] = useState(false);
  const [showModalEmailChange, setShowModalEmailChange] = useState(false);
  const [showModalPasswordChange, setShowModalPasswordChange] = useState(false);
  const [showModalAccountDelete, setShowModalAccountDelete] = useState(false);

  const isGoogleUser = currentUser.providerData[0].providerId == 'google.com' ? true : false;
  const email = currentUser.email;

  //Смена имени
  const onNameClick = (): void => {
    setIsNameClicked(true);
  };

  const onNameSave = (): void => {
    currentUser
      .updateProfile({
        displayName: name,
      })
      .then(() => setIsNameClicked(false))
      .catch((err: any) => {
        showTooltip(`User name didn't update: ${err.message}`);
      });
  };
  const onNameCancel = (): void => {
    setName(currentUser.displayName);
    setIsNameClicked(false);
  };

  //Смена фото
  const onAvatarClick = (): void => {
    setIsAvatarClicked(true);
  };
  const onPhotoUrlSave = (): void => {
    currentUser
      .updateProfile({
        photoURL: photoUrl,
      })
      .then(() => setIsAvatarClicked(false))
      .catch((err: any) => {
        showTooltip(`User avatar didn't update: ${err.message}`);
      });
  };
  const onPhotoUrlCancel = (): void => {
    setPhotoUrl(currentUser.photoURL);
    setIsAvatarClicked(false);
  };

  // Сброс пароля
  const onEmailForResetPasswordSend = (): void => {
    firebase
      .auth()
      .sendPasswordResetEmail(email, actionCodeSettings)
      .then(() => {
        showTooltip('Please check your email');
      })
      .catch((err) => {
        showTooltip(`Email for reset password didn't send ${err.message}`);
      });
  };

  // @todo Сделать один хендлер с swith case?
  const onNameChange = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    setName(evt.target.value);
  };
  const onPhotoUrlChange = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    setPhotoUrl(evt.target.value);
  };

  // Тоггл модалок
  const toggleEmailChangeModal = (
    evt:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement>
      | React.FormEvent<HTMLSpanElement>
  ): void => {
    setShowModalEmailChange((prev) => !prev);
  };

  const togglePasswordChangeModal = (
    evt: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ): void => {
    setShowModalPasswordChange((prev) => !prev);
  };

  const toggleAccountDeleteModal = (
    evt: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ): void => {
    setShowModalAccountDelete((prev) => !prev);
  };

  return (
    <main className="settings-page">
      <div className="container">
        <PageTitle text="Settings" />
        <h2 className="settings-page__subtitle">Account</h2>

        <div className="settings-wrapper">
          <div className="settings-item settings-item__avatar-wrapper">
            <img
              className="settings-item__avatar"
              src={
                photoUrl
                  ? photoUrl
                  : 'https://yt3.ggpht.com/ytc/AAUvwng-3d-BcGfaNN09TTsLOoFfVhCT96sjcPQeJzQ2iQ=s900-c-k-c0x00ffffff-no-rj'
              }
              width="100"
              height="100"
              alt="User's avatar"
            />

            {isAvatarClicked ? (
              <>
                {/* @todo Стоит сделать ref на инпут, чтобы бахать фокус сразу после его появления? */}
                <input
                  className="settings-item__field settings-item__field--avatar"
                  type="text"
                  name="avatar"
                  onChange={onPhotoUrlChange}
                  placeholder="Type the link on your avatar"
                  value={photoUrl ? photoUrl : ''}
                />
                <button className="settings-item__btn" onClick={onPhotoUrlSave}>
                  Save
                </button>
                <button
                  className="settings-item__btn settings-item__btn--cancel"
                  onClick={onPhotoUrlCancel}
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                className="settings-item__edit-btn settings-item__edit-btn--avatar"
                onClick={onAvatarClick}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 0 24 24"
                  width="24px"
                  fill="#000000"
                >
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                </svg>
              </button>
            )}
          </div>

          <div className="settings-item">
            {isNameClicked ? (
              <>
                <input
                  className="settings-item__field settings-item__field--name"
                  type="text"
                  name="name"
                  onChange={onNameChange}
                  placeholder="What is your name?"
                  value={name ? name : ''}
                />
                <button className="settings-item__btn" onClick={onNameSave}>
                  Save
                </button>
                <button
                  className="settings-item__btn settings-item__btn--cancel"
                  onClick={onNameCancel}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <span className="settings-item__text">
                  <b>Your name: </b>
                  {name ? name : 'Anonymous'}
                </span>
                <button
                  className="settings-item__edit-btn settings-item__edit-btn--name"
                  onClick={onNameClick}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="18px"
                    viewBox="0 0 24 24"
                    width="18px"
                    fill="#000000"
                  >
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                  </svg>
                </button>
              </>
            )}
          </div>

          <div className="settings-item settings-item--email">
            <span className="settings-item__text">
              <b>Your email: </b>
              {email}
            </span>

            {isGoogleUser ? undefined : (
              <button
                className="settings-item__edit-btn settings-item__edit-btn--email"
                onClick={toggleEmailChangeModal}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="18px"
                  viewBox="0 0 24 24"
                  width="18px"
                  fill="#000000"
                >
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                </svg>
              </button>
            )}
          </div>

          {!isGoogleUser && (
            <>
              <div className="settings-item">
                <span>If you remember your password, you can</span>
                <button className="settings-item__btn" onClick={togglePasswordChangeModal}>
                  Change it
                </button>
              </div>
              <div className="settings-item">
                <span>
                  But if you forgot it, we can send the email to you to reset the password
                </span>
                <button className="settings-item__btn" onClick={onEmailForResetPasswordSend}>
                  Send the email
                </button>
              </div>
            </>
          )}

          <div className="settings-item">
            <button
              className="settings-item__btn settings-item__btn--cancel settings-item__btn--delete-account"
              onClick={toggleAccountDeleteModal}
            >
              Delete account
            </button>
          </div>
        </div>
        <h2 className="settings-page__subtitle">App</h2>
        {/* @todo Здесь будет тогглер цветовой схемы сайта */}

        {showModalEmailChange && (
          <Portal>
            <Modal
              classes="modal--change-email"
              title="Changing the email"
              onCloseBtnClick={toggleEmailChangeModal}
            >
              <ChangeEmailModalContent
                onToggleModal={toggleEmailChangeModal}
                user={currentUser}
                actionCodeSettings={actionCodeSettings}
              />
            </Modal>
          </Portal>
        )}
        {showModalPasswordChange && (
          <Portal>
            <Modal
              classes="modal--change-password"
              title="Changing the password"
              onCloseBtnClick={togglePasswordChangeModal}
            >
              <ChangePasswordModalContent
                onToggleModal={togglePasswordChangeModal}
                user={currentUser}
              />
            </Modal>
          </Portal>
        )}
        {showModalAccountDelete && (
          <Portal>
            <Modal
              classes="modal--delete-account"
              title="Deleting the account"
              onCloseBtnClick={toggleAccountDeleteModal}
            >
              <DeleteAccountModalContent
                user={currentUser}
                onToggleModal={toggleAccountDeleteModal}
              />
            </Modal>
          </Portal>
        )}
      </div>
    </main>
  );
};

export default SettingsPage;
