import React from 'react';

import TodoItemContent from '../todo-item-content';
import { ITodoItem } from '../../../../interfaces';
import { Id } from '../../../../types';
import './todos-table.css';

interface TodosTableProps {
  todos?: ITodoItem[];
  onDeleted?: (id: Id) => void;
  onSelected?: (evt: React.MouseEvent<HTMLTableRowElement>, id: Id) => void;
  overlayText?: string;
}

const TodosTable: React.FC<TodosTableProps> = ({ todos, onDeleted, onSelected, overlayText }) => {
  const tableHeadersText: string[] = [
    'Description',
    'Status',
    'Priority',
    'End date plan',
    'End date actual',
    'Action',
  ];

  const tableHeaders: JSX.Element[] = tableHeadersText.map((item: string): JSX.Element => {
    const additionalClass: string =
      item == 'Description'
        ? 'table__header--description'
        : item == 'Status'
        ? 'table__header--status'
        : item == 'Priority'
        ? 'table__header--priority'
        : item == 'End date plan'
        ? 'table__header--planDate'
        : item == 'End date actual'
        ? 'table__header--actualDate'
        : item == 'Action'
        ? 'table__header--action'
        : '';

    const clazz: string = additionalClass ? `table__header ${additionalClass}` : 'table__header';

    return (
      <th key={item} className={clazz} scope="col">
        {item}
      </th>
    );
  });
  if (todos && onDeleted && onSelected) {
    const tableRows: JSX.Element[] = todos.map((item: ITodoItem): JSX.Element => {
      const { id, ...itemProps } = item;

      const importantClass: string | null =
        itemProps.fieldsContent.priority == 'High' ? 'table__item--important' : '';
      const doneClass: string | null =
        itemProps.fieldsContent.status == 'Done' ? 'table__item--done' : '';

      return (
        <tr
          className={`table__item ${doneClass} ${importantClass}`}
          key={id}
          onDoubleClick={(evt) => onSelected(evt, id)}
        >
          <TodoItemContent {...itemProps} onDeleted={() => onDeleted(id)} />
        </tr>
      );
    });

    return (
      <table className="table table--todo">
        <thead>
          <tr className="table__headers table--todo__headers">{tableHeaders}</tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </table>
    );
  }
  return (
    <>
      <table className="table table--todo">
        <thead>
          <tr className="table__headers table--todo__headers">{tableHeaders}</tr>
        </thead>
        <tbody></tbody>
      </table>
      <span>{overlayText}</span>
    </>
  );
};
export default TodosTable;
