import React, { useMemo } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import NoteItemContent from '../note-item-content';
import { INoteItem, INoteList, INotesPageState } from 'interfaces';
import { Id, ToggleModalTypes } from 'types';
import './notes-list.css';

interface NotesListProps {
  notes: INoteList | null;
  notesPageSetState: React.Dispatch<React.SetStateAction<INotesPageState>>;
  toggleModal: (type?: ToggleModalTypes) => void;
}

const NotesList: React.FC<NotesListProps> = ({ notes, notesPageSetState, toggleModal }) => {
  // @todo Опять не учтена работа с большим количеством элементов. Reverse - не выход
  let visibleNotes: INoteItem[] | undefined = useMemo(() => notes ? Object.values(notes).reverse() : undefined, [notes]);
  let noteList: JSX.Element[] | undefined;

  if (visibleNotes) {
    const selectItem = (id: Id): void => {
      notesPageSetState((prevState) => ({
        ...prevState,
        selectedItemId: id,
      }));

      toggleModal();
    };

    noteList = visibleNotes.map((item): JSX.Element => {
      const { id } = item;

      return (
        <CSSTransition key={id} timeout={500} classNames="list__item">
          <li className="list__item" onDoubleClick={() => selectItem(id)}>
            <NoteItemContent note={item} />
          </li>
        </CSSTransition>
      );
    });
  }

  return (
    <>
      <ul className="list list--notes">
        <TransitionGroup component={null}>{noteList}</TransitionGroup>
      </ul>
      {!visibleNotes && <span>You can sleep soundly</span>}
    </>
  );
};
export default NotesList;
