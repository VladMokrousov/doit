import React from 'react';
import { useTooltipContext } from '../../context';
import { firebaseSignOut } from '../../services/firebase-service';

import './emailUnverifiedOverlay.css';

const EmailUnverifiedOverlay = () => {
  const { showTooltip } = useTooltipContext();

  return (
    <div className="app-overlay">
      <div className="app-overlay__content">
        Please confirm your email to use the app or{' '}
        <button className="app-overlay__sign-out-btn" onClick={() => firebaseSignOut(showTooltip)}>
          Sign out
        </button>
      </div>
    </div>
  );
};

export default EmailUnverifiedOverlay;
