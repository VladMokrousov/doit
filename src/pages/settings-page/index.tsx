import React, { useState, useEffect } from 'react';
import PageTitle from '../../components/page-title';
import Portal from '../../components/portal';
import Modal from '../../components/modal';
import { useAppContext } from '../../context';
import firebase from 'firebase/app';
import ChangeEmailModalContent from './components/change-email-modal-content';
import ChangePasswordModalContent from './components/change-password-modal-content';
import DeleteAccountModalContent from './components/delete-account-modal-content';
import './index.css';

// @todo Рефакторинг компонента + привести к единому виду названия функций, переменных из useState
const SettingsPage: React.FC = () => {
  const { currentUser, actionCodeSettings } = useAppContext();

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
        console.log('Не удалось обновить имя пользователя', err.message);
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
        console.log('Не удалось обновить аватар пользователя', err.message);
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
        // @todo Всплывает тултип с просьбой проверить почту
      })
      .catch((err) => {
        console.log('Не удалось отправить email:(', err.message);
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
        <span className="settings-page__subtitle">Account</span>

        <div className="settings-wrapper">
          <div className="settings-item settings-item__avatar-wrapper">
            <img
              className="settings-item__avatar"
              src={
                photoUrl
                  ? photoUrl
                  : 'https://yt3.ggpht.com/ytc/AAUvwng-3d-BcGfaNN09TTsLOoFfVhCT96sjcPQeJzQ2iQ=s900-c-k-c0x00ffffff-no-rj'
              }
              onClick={onAvatarClick}
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
                  placeholder="Type link on you avatar"
                  value={photoUrl ? photoUrl : ''}
                />
                <button className="settings-item__btn" onClick={onPhotoUrlSave}>
                  Save
                </button>
                <button className="settings-item__btn" onClick={onPhotoUrlCancel}>
                  Cancel
                </button>
              </>
            ) : null}
          </div>

          {isNameClicked ? (
            <div className="settings-item">
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
              <button className="settings-item__btn" onClick={onNameCancel}>
                Cancel
              </button>
            </div>
          ) : (
            <div className="settings-item">
              <span className="settings-item__text" onClick={onNameClick}>
                {name ? name : 'Anonymous'}
              </span>
            </div>
          )}

          <div className="settings-item settings-item--email">
            <span onClick={isGoogleUser ? undefined : toggleEmailChangeModal}>Your email: </span>

            <span
              className={
                isGoogleUser
                  ? 'settings-item__text settings-item__text--unclickable'
                  : 'settings-item__text'
              }
              onClick={isGoogleUser ? undefined : toggleEmailChangeModal}
            >
              {email}
            </span>
          </div>

          {!isGoogleUser && (
            <>
              <div className="settings-item">
                <button className="settings-item__btn" onClick={togglePasswordChangeModal}>
                  Change password
                </button>
              </div>
              <div className="settings-item">
                <button className="settings-item__btn" onClick={onEmailForResetPasswordSend}>
                  Send me email to reset the password
                </button>
              </div>
            </>
          )}

          <div className="settings-item">
            <button className="settings-item__btn" onClick={toggleAccountDeleteModal}>
              Delete account
            </button>
          </div>
        </div>
        <span className="settings-page__subtitle">App</span>
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
