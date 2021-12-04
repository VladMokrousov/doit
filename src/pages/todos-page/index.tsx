import React, { useState, useEffect } from 'react';

import PageTitle from 'components/page-title';
import TodosTable from './components/todos-table';
import Portal from 'components/portal';
import TodosModalContent from './components/todos-modal-content';
import TodosControlPanel from './components/todos-control-panel';
import Modal from 'components/modal';
import { useAppContext, useTooltipContext } from 'context';
import { ITodosPageState } from 'interfaces';
import { Id, ToggleModalTypes } from 'types';
import { firebaseConnectDisconnectTodoList } from 'services/firebase-service';

const TodosPage: React.FC = () => {
  const { currentUser } = useAppContext();
  const { showTooltip } = useTooltipContext();

  const [state, setState] = useState<ITodosPageState>({
    term: '',
    filter: 'inProgress',
    showModal: false,
    selectedItemId: null,
    isDataLoaded: false,
    todosList: null,
    lastTodoId: null,
  });

  useEffect(() => {
    firebaseConnectDisconnectTodoList('connect', currentUser, showTooltip, setState);

    return () => {
      firebaseConnectDisconnectTodoList('disconnect', currentUser, showTooltip, setState);
    };
  }, []);

  let newItemId: Id = state.lastTodoId ? state.lastTodoId + 1 : 100;

  const toggleModal = (type: ToggleModalTypes = ToggleModalTypes.Default): void => {
    setState(({ showModal, selectedItemId, ...restParams }) => ({
      ...restParams,
      showModal: !showModal,
      selectedItemId: type === ToggleModalTypes.WithSelectedItemClearing ? null : selectedItemId,
    }));
  };

  const { todosList, filter, showModal, selectedItemId } = state;

  return (
    <main className="todos-page">
      <div className="container">
        <PageTitle text="Todo List" />
        {state.isDataLoaded ? (
          <>
            <TodosControlPanel
              todosList={todosList}
              filter={filter}
              onToggleModal={() => toggleModal()}
              setState={setState}
            />

            <TodosTable
              todosPageState={state}
              toggleModal={toggleModal}
              todosPageSetState={setState}
            />

            {showModal && (
              <Portal>
                <Modal
                  classes="modal--todos"
                  title={selectedItemId ? 'Edit task' : 'Add task'}
                  onCloseBtnClick={() => toggleModal(ToggleModalTypes.WithSelectedItemClearing)}
                >
                  <TodosModalContent
                    newItemId={newItemId}
                    onToggleModal={toggleModal}
                    selectedItemId={selectedItemId}
                    setState={setState}
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

export default TodosPage;
