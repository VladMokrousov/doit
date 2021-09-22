import React from 'react';

import { ITodosList, ITodosPageState } from '../../../../interfaces';
import SearchPanel from '../search-panel';
import StatusFilter from '../status-filter';

import './todos-control-panel.css';

interface TodosControlPanelProps {
  todosList: ITodosList | null;
  filter: string;
  onToggleModal: (evt?: any) => void;
  setState: React.Dispatch<React.SetStateAction<ITodosPageState>>;
}

const TodosControlPanel: React.FC<TodosControlPanelProps> = ({
  todosList,
  filter,
  onToggleModal,
  setState,
}) => {
  return (
    <div className={`todos-page__control-panel ${!todosList ? 'flex-wrapper' : ``}`}>
      <button className="todos-page__add-task-btn" onClick={onToggleModal}>
        Add task
      </button>
      {todosList && (
        <>
          <SearchPanel setState={setState} />
          <StatusFilter todosList={todosList} filter={filter} setState={setState} />
        </>
      )}
    </div>
  );
};
export default TodosControlPanel;
