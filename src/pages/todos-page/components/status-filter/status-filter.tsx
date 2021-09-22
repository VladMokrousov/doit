import React from 'react';

import { ITodosList, ITodosPageState } from '../../../../interfaces';

import './status-filter.css';

interface IBtnProps {
  name: string;
  label: string;
  todosCount?: number;
}

interface StatusFilterProps {
  todosList: ITodosList;
  filter: string;
  setState: React.Dispatch<React.SetStateAction<ITodosPageState>>;
}

const StatusFilter: React.FC<StatusFilterProps> = ({ todosList, filter, setState }) => {
  // @todo пагинация и большое количество items не предусмотрены
  const todos = Object.values(todosList);
  const getTodosLengthWithStatusFilter = (status: 'New' | 'In progress' | 'Done') =>
    todos.filter((item) => item.fieldsContent.status == status).length;

  const btnProps: IBtnProps[] = [
    {
      name: 'inProgress',
      label: 'In progress',
      todosCount: getTodosLengthWithStatusFilter('In progress'),
    },
    { name: 'new', label: 'New', todosCount: getTodosLengthWithStatusFilter('New') },
    { name: 'done', label: 'Done', todosCount: getTodosLengthWithStatusFilter('Done') },
    { name: 'all', label: 'All', todosCount: todos.length },
  ];

  const onFilterChange = (filter: string): void =>
    setState((prevState) => ({
      ...prevState,
      filter,
    }));

  const buttons: JSX.Element[] = btnProps.map(({ name, label, todosCount }) => {
    const isActive = filter === name;
    const clazz = isActive ? 'status-filter__btn--active' : '';
    return (
      <button
        type="button"
        className={`status-filter__btn btn ${clazz}`}
        key={name}
        onClick={() => onFilterChange(name)}
      >
        {`${label} - ${todosCount}`}
      </button>
    );
  });

  return <div className="status-filter">{buttons}</div>;
};

export default StatusFilter;
