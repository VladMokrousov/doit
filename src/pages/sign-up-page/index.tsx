import React from 'react';
import Modal from '../../components/modal';
import SignUpModalContent from './components/sign-up-modal-content';

const SignUpPage: React.FC = () => (
  <main className="sign-up-page">
    <Modal classes="modal--sign-up" title="Sign up">
      <SignUpModalContent />
    </Modal>
  </main>
);

export default SignUpPage;
