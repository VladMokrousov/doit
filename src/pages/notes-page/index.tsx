import React, { useState, useEffect } from 'react';
import PageTitle from '../../components/page-title';
import NotesList from './components/notes-list';
import Portal from '../../components/portal';
import NotesModalContent from './components/notes-modal-content';
import Modal from '../../components/modal';
import { useAppContext, useTooltipContext } from '../../context';
import firebase from 'firebase/app';
import { INoteItem } from '../../interfaces';
import { Id } from '../../types';

interface INotesData {
  [key: string]: INoteItem;
}

interface INotesPageState {
  notesData?: INotesData;
  showModal: boolean;
  selectedItemId: Id | false;
  isDataLoaded: boolean;
}

const NotesPage: React.FC = () => {
  const { currentUser } = useAppContext();
  const { showTooltip } = useTooltipContext();
  const [state, setState] = useState<INotesPageState>({
    showModal: false,
    selectedItemId: false,
    isDataLoaded: false,
  });

  useEffect(() => {
    // @todo Обернуть в try catch?
    const getNotes = (elem: firebase.database.DataSnapshot) => {
      setState(({ isDataLoaded, ...restParams }) => {
        return {
          isDataLoaded: true,
          ...restParams,
          notesData: elem.val(),
        };
      });
    };
    const notesRef = firebase.database().ref('users/' + currentUser.uid + '/notes');
    notesRef.on('value', getNotes);

    return () => {
      notesRef.off('value', getNotes);
    };
  }, []);

  if (state.isDataLoaded) {
    let newItemId: Id = 100;

    const createNoteItem = (description: string): INoteItem => {
      return {
        description,
        creationDate: getCurrentFormattedDate(),
        id: newItemId,
      };
    };

    const addItem = (description: string): void => {
      const newItem: INoteItem = createNoteItem(description);

      firebase
        .database()
        .ref('users/' + currentUser.uid + '/notes')
        .push(newItem)
        .catch((e) => {
          showTooltip(`Add item failed: ${e.message}`);
        });
    };

    const getCurrentFormattedDate = (): string => {
      const currentDate: Date = new Date();
      const currentMonth: number = currentDate.getMonth() + 1;
      const currentDay: number = currentDate.getDate();

      return `${String(currentDay).length == 2 ? currentDay : '0' + currentDay}.${
        String(currentMonth).length == 2 ? currentMonth : '0' + currentMonth
      }.${currentDate.getFullYear()}`;
    };

    // @todo evt: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
    // @todo Сделать отдельную функцию на закрытие окна?
    const toggleModal = (evt: any): void => {
      if (evt.target.textContent == 'X') {
        setState((prevState) => {
          return {
            ...prevState,
            selectedItemId: false,
          };
        });
      }

      setState(({ showModal, ...restParams }) => {
        return {
          ...restParams,
          showModal: !showModal,
        };
      });
    };

    if (state.notesData) {
      let lastItemId: Id = 100;

      Object.values(state.notesData).forEach((item) => {
        if (item.id > lastItemId) {
          lastItemId = item.id;
        }
      });
      newItemId = lastItemId + 1;

      const deleteItem = (id: Id): void => {
        const notesRef = firebase.database().ref('users/' + currentUser.uid + '/notes');
        notesRef
          .once('value')
          .then((snapshot) => {
            snapshot.forEach((childSnapshot) => {
              const childData = childSnapshot.val();
              if (childData.id === id) {
                firebase
                  .database()
                  .ref('users/' + currentUser.uid + `/notes/${childSnapshot.key}`)
                  .remove()
                  .catch((error) => {
                    showTooltip(`Remove failed: ${error.message}`);
                  });
                return true;
              }
            });
          })
          .catch((error) => {
            showTooltip(`Couldn't take the data from DB: ${error.message}`);
          });
      };

      const editItem = (description: string): void => {
        const notesRef = firebase.database().ref('users/' + currentUser.uid + '/notes');
        notesRef
          .once('value')
          .then((snapshot) => {
            snapshot.forEach((childSnapshot) => {
              const childData = childSnapshot.val();
              if (childData.id === state.selectedItemId) {
                firebase
                  .database()
                  .ref('users/' + currentUser.uid + `/notes/${childSnapshot.key}/description`)
                  .set(description)
                  .catch((error) => {
                    showTooltip(`Edit item failed: ${error.message}`);
                  });
                return true;
              }
            });
          })
          .catch((error) => {
            showTooltip(`Couldn't take the data from DB: ${error.message}`);
          });

        setState(({ selectedItemId, ...restParams }) => {
          return {
            selectedItemId: false,
            ...restParams,
          };
        });
      };

      const selectItem = (evt: React.MouseEvent<HTMLLIElement>, id: Id): void => {
        setState((prevState) => {
          return {
            ...prevState,
            selectedItemId: id,
          };
        });
        // @todo В дальнейшем нужно избавиться от передачи события
        toggleModal(evt);
      };

      const { notesData, showModal, selectedItemId } = state;

      return (
        <main className="notes-page">
          <div className="container">
            <PageTitle text="Notes" />
            <button className="modal-toggle-button" onClick={toggleModal}>
              Add note
            </button>
            <NotesList
              notes={Object.values(notesData)}
              onDeleted={deleteItem}
              onSelected={selectItem}
            />
            {showModal && (
              <Portal>
                <Modal
                  classes="modal--notes"
                  title={selectedItemId ? 'Edit note' : 'Add note'}
                  onCloseBtnClick={toggleModal}
                >
                  <NotesModalContent
                    onAdded={addItem}
                    onEdited={editItem}
                    onToggleModal={toggleModal}
                    selectedItemId={selectedItemId}
                  />
                </Modal>
              </Portal>
            )}
          </div>
        </main>
      );
    }

    return (
      <main className="notes-page">
        <div className="container">
          <PageTitle text="Notes" />
          <button className="modal-toggle-button" onClick={toggleModal}>
            Add note
          </button>
          <NotesList overlayText="You can sleep soundly" />
          {state.showModal && (
            <Portal>
              <Modal classes="modal--notes" title="Add note" onCloseBtnClick={toggleModal}>
                <NotesModalContent
                  onAdded={addItem}
                  onToggleModal={toggleModal}
                  selectedItemId={false}
                />
              </Modal>
            </Portal>
          )}
        </div>
      </main>
    );
  }

  return (
    <main className="notes-page">
      <div className="container">
        <PageTitle text="Notes" />
        <span>Loading...</span>
      </div>
    </main>
  );
};

export default NotesPage;
