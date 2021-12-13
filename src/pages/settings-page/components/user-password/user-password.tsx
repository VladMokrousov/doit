import React, { useState } from 'react';

import Portal from 'components/portal';
import Modal from 'components/modal';
import ChangePasswordModalContent from '../change-password-modal-content';
import { useAppContext, useTooltipContext } from 'context';
import { firebaseSendEmailForResetingPassword } from 'services/firebase-service';

const UserPassword: React.FC = () => {
  const { currentUser, actionCodeSettings } = useAppContext();
  const { showTooltip } = useTooltipContext();

  const [showModalPasswordChange, setShowModalPasswordChange] = useState(false);

  const togglePasswordChangeModal = (): void => {
    setShowModalPasswordChange((prev) => !prev);
  };

  return (
    <>
      <div className="settings-item">
        <span>If you remember your password, you can</span>
        <button className="settings-item__btn" onClick={togglePasswordChangeModal}>
          Change it
        </button>
      </div>
      <div className="settings-item">
        <span>But if you forgot it, we can send the email to you to reset the password</span>
        <button
          className="settings-item__btn"
          onClick={() =>
            firebaseSendEmailForResetingPassword(currentUser.email, actionCodeSettings, showTooltip)
          }
        >
          Send the email
        </button>
      </div>

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
    </>
  );
};

export default UserPassword;
