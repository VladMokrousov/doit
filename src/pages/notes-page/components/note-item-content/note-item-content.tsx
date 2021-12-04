import React from 'react';

import { firebaseDeleteNote } from 'services/firebase-service';
import { getFormattedDate } from 'helpers';
import { useAppContext, useTooltipContext } from 'context';
import deleteIcon from 'assets/img/delete-icon.svg';
import { INoteItem } from 'interfaces';

import './note-item-content.css';

interface NoteItemContentProps {
  note: INoteItem;
}

const NoteItemContent: React.FC<NoteItemContentProps> = ({ note }) => {
  const { currentUser } = useAppContext();
  const { showTooltip } = useTooltipContext();

  return (
    <>
      <div className="note__header">
        <span>{getFormattedDate(new Date(note.creationDate), 'note')}</span>
        <button
          type="button"
          className="btn note__btn note__btn--del"
          onClick={() => firebaseDeleteNote(note.id, currentUser, showTooltip)}
        >
          <img src={deleteIcon} className="delete-icon" width="24" height="24" alt="Delete note" />
        </button>
      </div>
      <p className="note__description">{note.description}</p>
    </>
  );
};

export default NoteItemContent;
