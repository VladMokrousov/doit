import React, { ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';

import './portal.css';

interface PortalProps {
  children: ReactNode;
}

const Portal: React.FC<PortalProps> = ({ children }) => {
  const el: HTMLDivElement = document.createElement('div');
  el.classList.add('overlay');

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    // document.querySelector("#modal").append(el);

    const modalHtml: HTMLDivElement | null = document.querySelector('#modal');
    if (modalHtml) {
      modalHtml.append(el);
    }

    return () => {
      el.remove();
      document.body.style.overflow = 'visible';
    };
  }, []);

  return createPortal(children, el);
};

export default Portal;
