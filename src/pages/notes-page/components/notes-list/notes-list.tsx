import React from 'react';

import NoteItemContent from '../note-item-content';
import { INoteItem } from '../../../../interfaces';
import { Id } from '../../../../types';
import './notes-list.css';

interface NotesListProps {
  notes?: INoteItem[];
  onDeleted?: (id: Id) => void;
  onSelected?: (evt: React.MouseEvent<HTMLLIElement>, id: Id) => void;
  overlayText?: string;
}

const NotesList: React.FC<NotesListProps> = ({ notes, onDeleted, onSelected, overlayText }) => {
  if (notes && onDeleted && onSelected) {
    const itemsList: JSX.Element[] = notes.map(
      (item: INoteItem): JSX.Element => {
        const { id, ...itemProps } = item;

        return (
          <li className="list__item" key={id} onDoubleClick={(evt) => onSelected(evt, id)}>
            <NoteItemContent {...itemProps} onDeleted={() => onDeleted(id)} />
          </li>
        );
      }
    );

    return <ul className="list list--notes">{itemsList}</ul>;
  }
  return (
    <>
      <ul className="list list--notes"></ul>
      <span>{overlayText}</span>
    </>
  );
};
export default NotesList;
