import React, { useState, useEffect } from 'react';

import PageTitle from 'components/page-title';
import NotesList from './components/notes-list';
import Portal from 'components/portal';
import NotesModalContent from './components/notes-modal-content';
import Modal from 'components/modal';
import { useAppContext, useTooltipContext } from 'context';
import { INotesPageState } from 'interfaces';
import { Id, ToggleModalTypes } from 'types';
import { firebaseConnectDisconnectNoteList } from 'services/firebase-service';

import './index.css';

const NotesPage: React.FC = () => {
  const { currentUser } = useAppContext();
  const { showTooltip } = useTooltipContext();
  const [state, setState] = useState<INotesPageState>({
    showModal: false,
    selectedItemId: null,
    isDataLoaded: false,
    noteList: null,
    lastNoteId: null,
  });

  useEffect(() => {
    firebaseConnectDisconnectNoteList('connect', currentUser, showTooltip, setState);

    return () => {
      firebaseConnectDisconnectNoteList('disconnect', currentUser, showTooltip, setState);
    };
  }, []);

  // Заменить потом на uuid
  let newItemId: Id = state.lastNoteId ? state.lastNoteId + 1 : 100;
  const toggleModal = (type: ToggleModalTypes = ToggleModalTypes.Default): void => {
    setState(({ showModal, selectedItemId, ...restParams }) => ({
      ...restParams,
      showModal: !showModal,
      selectedItemId: type === ToggleModalTypes.WithSelectedItemClearing ? null : selectedItemId,
    }));
  };

  const { noteList, showModal, selectedItemId } = state;

  return (
    <main className="notes-page">
      <div className="container">
        <PageTitle text="Notes" />
        {state.isDataLoaded ? (
          <>
            <button className="notes-page__add-note-btn" onClick={() => toggleModal()}>
              Add note
            </button>
            <NotesList notes={noteList} notesPageSetState={setState} toggleModal={toggleModal} />
            {showModal && (
              <Portal>
                <Modal
                  classes="modal--notes"
                  title={selectedItemId ? 'Edit note' : 'Add note'}
                  onCloseBtnClick={() => toggleModal(ToggleModalTypes.WithSelectedItemClearing)}
                >
                  <NotesModalContent
                    newItemId={newItemId}
                    onToggleModal={toggleModal}
                    selectedItemId={selectedItemId}
                    setNotesPageState={setState}
                  />
                </Modal>
              </Portal>
            )}
          </>
        ) : (
          <span>Loading...</span>
        )}
      </div>
    </main>
  );
};

export default NotesPage;
