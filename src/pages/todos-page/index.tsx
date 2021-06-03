import React, { useState, useEffect } from 'react';
import PageTitle from '../../components/page-title';
import SearchPanel from './components/search-panel';
import TodosTable from './components/todos-table';
import StatusFilter from './components/status-filter';
import Portal from '../../components/portal';
import TodosModalContent from './components/todos-modal-content';
import Modal from '../../components/modal';
import { useAppContext } from '../../context';
import firebase from 'firebase/app';
import { IFieldsContent, ITodoItem, IEveryStatusCount } from '../../interfaces';
import { Id } from '../../types';

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
  // console.log('Компонент монтируется или обновляется');
  const [state, setState] = useState<ITodosPageState>({
    term: '',
    filter: 'all',
    showModal: false,
    selectedItemId: false,
    isDataLoaded: false,
  });
  // console.log(state);
  useEffect(() => {
    //Обернуть в try catch?
    const getTodos = (elem: firebase.database.DataSnapshot) => {
      // console.log('Данные из бд подтягиваются');
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

    const createTodoItem = (fieldsContent: IFieldsContent): ITodoItem => {
      return {
        fieldsContent,
        id: newItemId,
      };
    };

    const addItem = (fieldsContent: IFieldsContent): void => {
      const newItem: ITodoItem = createTodoItem({
        ...fieldsContent,
      });

      const db = firebase.database();
      db.ref('users/' + currentUser.uid + '/todos')
        .push(newItem)
        .catch((e) => {
          console.log(`Add item failed: ${e.message}`);
        });
    };

    // evt: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLTableRowElement>
    // Сделать отдельную функцию на закрытие окна?
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
                  .catch((error) => {
                    //Нужно уведомить пользователя, что удаление не прошло успешно
                    console.log('Remove failed: ' + error.message);
                  });
                return true;
              }
            });
          })
          .catch((error) => {
            console.log("Couldn't take the data from DB: " + error);
          });
      };

      const editItem = (fieldsContent: IFieldsContent): void => {
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
                  .catch((error) => {
                    //Нужно уведомить пользователя, что редактирование не прошло успешно
                    console.log('Edit item failed: ' + error.message);
                  });
                return true;
              }
            });
          })
          .catch((error) => {
            console.log("Couldn't take the data from DB: " + error);
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

      const visibleItems: ITodoItem[] = filterItem(search(Object.values(todosData), term), filter);

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
            <div className="flex-wrapper">
              <button className="modal-toggle-button" onClick={toggleModal}>
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
          <div className="flex-wrapper">
            <button className="modal-toggle-button" onClick={toggleModal}>
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
