import React, { useState } from 'react';

import Modal from 'components/modal';
import Portal from 'components/portal';
import DeleteAccountModalContent from '../delete-account-modal-content';
import { useAppContext } from 'context';

const UserDelete: React.FC = () => {
  const { currentUser } = useAppContext();

  const [showModalAccountDelete, setShowModalAccountDelete] = useState(false);

  const toggleAccountDeleteModal = (): void => {
    setShowModalAccountDelete((prev) => !prev);
  };

  return (
    <div className="settings-item">
      <button
        className="settings-item__btn settings-item__btn--cancel settings-item__btn--delete-account"
        onClick={toggleAccountDeleteModal}
      >
        Delete account
      </button>

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
  );
};

export default UserDelete;
