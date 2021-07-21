import React, { useState, useEffect } from 'react';
import PageTitle from '../../components/page-title';
import SearchPanel from './components/search-panel';
import TodosTable from './components/todos-table';
import StatusFilter from './components/status-filter';
import Portal from '../../components/portal';
import TodosModalContent from './components/todos-modal-content';
import Modal from '../../components/modal';
import { useAppContext, useTooltipContext } from '../../context';
import firebase from 'firebase/app';
import { ITodoFieldsContent, ITodoItem, IEveryStatusCount } from '../../interfaces';
import { Id } from '../../types';

import './index.css';

interface ITodosData {
  [key: string]: ITodoItem;
}

interface ITodosPageState {
  todosData?: ITodosData;
  term: string;
  filter: string;
  showModal: boolean;
  selectedItemId: Id | false;
  isDataLoaded: boolean;
}

const TodosPage: React.FC = () => {
  const { currentUser } = useAppContext();
  const { showTooltip } = useTooltipContext();
  const [state, setState] = useState<ITodosPageState>({
    term: '',
    filter: 'all',
    showModal: false,
    selectedItemId: false,
    isDataLoaded: false,
  });
  useEffect(() => {
    //Обернуть в try catch?
    const getTodos = (elem: firebase.database.DataSnapshot) => {
      setState(({ isDataLoaded, ...restParams }) => {
        return {
          isDataLoaded: true,
          ...restParams,
          todosData: elem.val(),
        };
      });
    };
    const todosRef = firebase.database().ref('users/' + currentUser.uid + '/todos');
    todosRef.on('value', getTodos);

    return () => {
      todosRef.off('value', getTodos);
    };
  }, []);

  if (state.isDataLoaded) {
    let newItemId: Id = 100;

    const createTodoItem = (fieldsContent: ITodoFieldsContent): ITodoItem => {
      return {
        fieldsContent,
        id: newItemId,
      };
    };

    const addItem = (fieldsContent: ITodoFieldsContent): void => {
      const newItem: ITodoItem = createTodoItem({
        ...fieldsContent,
      });

      const db = firebase.database();
      db.ref('users/' + currentUser.uid + '/todos')
        .push(newItem)
        .catch((err) => {
          showTooltip(`Add item failed: ${err.message}`);
        });
    };

    // evt: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLTableRowElement>
    // Сделать отдельную функцию на закрытие окна?
    const toggleModal = (evt: any): void => {
      if (evt.target.className == 'modal__close') {
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

    if (state.todosData) {
      let lastItemId: Id = 100;

      Object.values(state.todosData).forEach((item) => {
        if (item.id > lastItemId) {
          lastItemId = item.id;
        }
      });
      newItemId = lastItemId + 1;

      const deleteItem = (id: Id): void => {
        const todosRef = firebase.database().ref('users/' + currentUser.uid + '/todos');
        todosRef
          .once('value')
          .then((snapshot) => {
            snapshot.forEach((childSnapshot) => {
              const childData = childSnapshot.val();
              if (childData.id === id) {
                firebase
                  .database()
                  .ref('users/' + currentUser.uid + `/todos/${childSnapshot.key}`)
                  .remove()
                  .catch((err) => {
                    showTooltip(`Removing the task was failed: ${err.message}`);
                  });
                return true;
              }
            });
          })
          .catch((err) => {
            showTooltip(`Couldn't take the data from DB: ${err.message}`);
          });
      };

      const editItem = (fieldsContent: ITodoFieldsContent): void => {
        const todosRef = firebase.database().ref('users/' + currentUser.uid + '/todos');
        todosRef
          .once('value')
          .then((snapshot) => {
            snapshot.forEach((childSnapshot) => {
              const childData = childSnapshot.val();
              if (childData.id === state.selectedItemId) {
                firebase
                  .database()
                  .ref('users/' + currentUser.uid + `/todos/${childSnapshot.key}/fieldsContent`)
                  .set({ ...fieldsContent })
                  .catch((err) => {
                    showTooltip(`Editing the task was failed: ${err.message}`);
                  });
                return true;
              }
            });
          })
          .catch((err) => {
            showTooltip(`Couldn't take the data from DB: ${err.message}`);
          });

        setState(({ selectedItemId, ...restParams }) => {
          return {
            selectedItemId: false,
            ...restParams,
          };
        });
      };

      const search = (items: ITodoItem[], term: string): ITodoItem[] => {
        if (term.length === 0) {
          return items;
        }
        return items.filter((item) => {
          return item.fieldsContent.description.toLowerCase().indexOf(term.toLowerCase()) > -1;
        });
      };

      const onSearchChange = (term: string): void => {
        //Для единообразия можно деструктуризировать стейт во всех подобных случаях. Это еще и безопасней
        setState((prevState) => {
          return {
            ...prevState,
            term,
          };
        });
      };

      const filterItem = (items: ITodoItem[], filter: string): ITodoItem[] => {
        switch (filter) {
          case 'all':
            return items;
          case 'new':
            return items.filter((item) => item.fieldsContent.status == 'New');
          case 'inProgress':
            return items.filter((item) => item.fieldsContent.status == 'In process');
          case 'done':
            return items.filter((item) => item.fieldsContent.status == 'Done');

          default:
            return items;
        }
      };

      const onFilterChange = (filter: string): void => {
        setState((prevState) => {
          return {
            ...prevState,
            filter,
          };
        });
      };

      const selectItem = (evt: React.MouseEvent<HTMLTableRowElement>, id: Id): void => {
        setState((prevState) => {
          return {
            ...prevState,
            selectedItemId: id,
          };
        });
        //В дальнейшем нужно избавиться от передачи события
        toggleModal(evt);
      };

      const { todosData, term, filter, showModal, selectedItemId } = state;

      const visibleItems: ITodoItem[] = filterItem(
        search(Object.values(todosData), term),
        filter
      ).reverse();

      const everyStatusCount: IEveryStatusCount = {
        all: Object.values(todosData).length,
        new: Object.values(todosData).filter((item) => item.fieldsContent.status == 'New').length,
        inProgress: Object.values(todosData).filter(
          (item) => item.fieldsContent.status == 'In process'
        ).length,
        done: Object.values(todosData).filter((item) => item.fieldsContent.status == 'Done').length,
      };

      return (
        <main className="todos-page">
          <div className="container">
            <PageTitle text="Todo List" />
            <div className="todos-page__control-panel">
              <button className="todos-page__add-task-btn" onClick={toggleModal}>
                Add task
              </button>
              <SearchPanel onSearchChange={onSearchChange} />
              <StatusFilter
                filter={filter}
                onFilterChange={onFilterChange}
                everyStatusCount={everyStatusCount}
              />
            </div>

            <TodosTable todos={visibleItems} onDeleted={deleteItem} onSelected={selectItem} />

            {showModal && (
              <Portal>
                <Modal
                  classes="modal--todos"
                  title={selectedItemId ? 'Edit task' : 'Add task'}
                  onCloseBtnClick={toggleModal}
                >
                  <TodosModalContent
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
      <main className="todos-page">
        <div className="container">
          <PageTitle text="Todo List" />
          <div className="flex-wrapper todos-page__control-panel">
            <button className="todos-page__add-task-btn" onClick={toggleModal}>
              Add task
            </button>
          </div>

          <TodosTable overlayText="You can sleep soundly" />

          {state.showModal && (
            <Portal>
              <Modal classes="modal--todos" title="Add task" onCloseBtnClick={toggleModal}>
                <TodosModalContent
                  onAdded={addItem}
                  selectedItemId={false}
                  onToggleModal={toggleModal}
                />
              </Modal>
            </Portal>
          )}
        </div>
      </main>
    );
  }

  return (
    <main className="todos-page">
      <div className="container">
        <PageTitle text="Todo List" />
        <span>Loading...</span>
      </div>
    </main>
  );
};

export default TodosPage;
