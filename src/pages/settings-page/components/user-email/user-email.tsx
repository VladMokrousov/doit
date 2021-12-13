import React, { useState } from 'react';

import Modal from 'components/modal';
import Portal from 'components/portal';
import ChangeEmailModalContent from '../change-email-modal-content';
import { useAppContext } from 'context';
import ChangeIcon from '!@svgr/webpack!assets/img/change-icon.svg';

const UserEmail: React.FC = () => {
  const { currentUser, actionCodeSettings } = useAppContext();
  const isGoogleUser = currentUser.providerData[0].providerId === 'google.com';

  const [showModalEmailChange, setShowModalEmailChange] = useState(false);

  const toggleEmailChangeModal = (): void => {
    setShowModalEmailChange((prev) => !prev);
  };

  return (
    <div className="settings-item settings-item--email">
      <span className="settings-item__text">
        <b>Your email: </b>
        {currentUser.email}
      </span>

      {!isGoogleUser && (
        <button
          className="settings-item__edit-btn settings-item__edit-btn--email"
          onClick={toggleEmailChangeModal}
        >
          <ChangeIcon width="18px" height="18px" />
        </button>
      )}

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
    </div>
  );
};

export default UserEmail;
