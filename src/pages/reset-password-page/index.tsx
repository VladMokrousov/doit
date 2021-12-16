import React from 'react';
import Modal from 'components/modal';
import ResetPasswordModalContent from './components/reset-password-modal-content';

const ResetPasswordPage: React.FC = () => (
  <main className="reset-password-page">
    <Modal classes="modal--reset-password" title="Reset password">
      <ResetPasswordModalContent />
    </Modal>
  </main>
);

export default ResetPasswordPage;
