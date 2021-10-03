import React from 'react';

import { getFormattedDate } from '../../../../helpers';
import deleteIcon from '../../../../assets/img/delete-icon.svg';

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
      <span>{getFormattedDate(new Date(creationDate), 'note')}</span>
      <button type="button" className="btn note__btn note__btn--del" onClick={onDeleted}>
        <img src={deleteIcon} className="delete-icon" width="24" height="24" alt="Delete note" />
      </button>
    </div>
    <p className="note__description">{description}</p>
  </>
);

export default NoteItemContent;
