import React from 'react';
import { Id } from '../../../../types';
import './note-item-content.css';

interface NoteItemContentProps {
  creationDate: string;
  description: string;
  onDeleted: () => any;
  // onDeleted: () => (id: Id) => void
}

const NoteItemContent: React.FC<NoteItemContentProps> = ({
  creationDate,
  description,
  onDeleted,
}) => (
  <>
    <div className="note__header">
      <span>{creationDate}</span>
      <button type="button" className="btn note__btn note__btn--del" onClick={onDeleted}>
        Удалить
      </button>
    </div>
    <p className="note__description">{description}</p>
  </>
);

export default NoteItemContent;
