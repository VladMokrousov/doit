import React, { useMemo } from 'react';

import TodoItemContent from '../todo-item-content';
import tableHeadersConfig from './tableHeaderConfig';
import { ITodoItem, ITodosPageState } from '../../../../interfaces';
import { Id, ToggleModalTypes } from '../../../../types';

import './todos-table.css';

interface TodosTableProps {
  todosPageState: ITodosPageState;
  toggleModal: (type?: ToggleModalTypes) => void;
  todosPageSetState: React.Dispatch<React.SetStateAction<ITodosPageState>>;
}

const TodosTable: React.FC<TodosTableProps> = ({
  todosPageState,
  toggleModal,
  todosPageSetState,
}) => {
  const tableHeaders: JSX.Element[] = tableHeadersConfig.map((item) => (
    <th key={item.text} className={`table__header ${item.class}`} scope="col">
      {item.text}
    </th>
  ));

  let visibleTodos: ITodoItem[] | undefined;
  let tableRows: JSX.Element[] | undefined;

  const { todosList, term, filter } = todosPageState;

  if (todosList) {
    const searchTodos = (items: ITodoItem[], term: string): ITodoItem[] =>
      term.length === 0
        ? items
        : items.filter(
            (item) => item.fieldsContent.description.toLowerCase().indexOf(term.toLowerCase()) > -1
          );

    const filterTodos = (items: ITodoItem[], filter: string): ITodoItem[] => {
      switch (filter) {
        case 'all':
          return items;
        case 'new':
          return items.filter((item) => item.fieldsContent.status == 'New');
        case 'inProgress':
          return items.filter((item) => item.fieldsContent.status == 'In progress');
        case 'done':
          return items.filter((item) => item.fieldsContent.status == 'Done');

        default:
          return items;
      }
    };

    // @todo Опять не учтена работа с большим количеством элементов. Reverse - не выход
    visibleTodos = useMemo(
      () => filterTodos(searchTodos(Object.values(todosList), term), filter).reverse(),
      [todosList, term, filter]
    );

    const selectItem = (id: Id): void => {
      todosPageSetState((prevState) => {
        return {
          ...prevState,
          selectedItemId: id,
        };
      });

      toggleModal();
    };

    tableRows = visibleTodos.map((item: ITodoItem): JSX.Element => {
      const { id, fieldsContent } = item;

      const importantClass = fieldsContent.priority == 'High' ? 'table__item--important' : '';
      const doneClass = fieldsContent.status == 'Done' ? 'table__item--done' : '';
      const expiredClass =
        fieldsContent.endDateActual != '-'
          ? fieldsContent.endDateActual < fieldsContent.endDatePlan
            ? ''
            : 'table__item--expired'
          : new Date().toISOString() > fieldsContent.endDatePlan
          ? 'table__item--expired'
          : '';

      return (
        <tr
          className={`table__item ${doneClass} ${importantClass} ${expiredClass}`}
          key={id}
          onDoubleClick={() => selectItem(id)}
        >
          <TodoItemContent fieldsContent={fieldsContent} id={id} />
        </tr>
      );
    });
  }
  return (
    <>
      <table className="table table--todo">
        <thead>
          <tr className="table__headers table--todo__headers">{tableHeaders}</tr>
        </thead>
        <tbody>{visibleTodos && tableRows}</tbody>
      </table>
      {!visibleTodos && <span>You can sleep soundly</span>}
    </>
  );
};
export default TodosTable;
