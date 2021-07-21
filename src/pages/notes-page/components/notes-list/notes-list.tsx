import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

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
    const itemsList: JSX.Element[] = notes.map((item: INoteItem): JSX.Element => {
      const { id, ...itemProps } = item;

      return (
        <CSSTransition key={id} timeout={500} classNames="list__item">
          <li className="list__item" onDoubleClick={(evt) => onSelected(evt, id)}>
            <NoteItemContent {...itemProps} onDeleted={() => onDeleted(id)} />
          </li>
        </CSSTransition>
      );
    });

    return (
      <ul className="list list--notes">
        <TransitionGroup component={null}>{itemsList}</TransitionGroup>
      </ul>
    );
  }
  return (
    <>
      <ul className="list list--notes"></ul>
      <span>{overlayText}</span>
    </>
  );
};
export default NotesList;
