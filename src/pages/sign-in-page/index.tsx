import React from 'react';
import Modal from '../../components/modal';
import SignInModalContent from './components/sign-in-modal-content';

const SignInPage: React.FC = () => (
  <main className="sign-in-page">
    <Modal classes="modal--sign-in" title="Sign in">
      <SignInModalContent />
    </Modal>
  </main>
);

export default SignInPage;
