import React, { ReactNode } from 'react';
import './modal.css';

interface IModal {
  classes: string;
  title: string;
  onCloseBtnClick?: (evt: any) => void;
  children: ReactNode;
}

const Modal: React.FC<IModal> = ({ classes, title, onCloseBtnClick, children }) => (
  <section className={`modal ${classes}`}>
    <h2 className="modal__title">{title}</h2>
    {onCloseBtnClick && (
      <button className="modal__close" onClick={onCloseBtnClick}>
        X
      </button>
    )}
    {children}
  </section>
);

export default Modal;
