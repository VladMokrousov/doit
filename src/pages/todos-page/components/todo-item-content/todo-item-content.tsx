import React from 'react';
import { ITodoFieldsContent } from '../../../../interfaces';
import { Id } from '../../../../types';
import './todo-item-content.css';

interface TodoItemContentProps {
  fieldsContent: ITodoFieldsContent;
  onDeleted: () => any;
  // onDeleted: () => (id: Id) => void
}

const TodoItemContent: React.FC<TodoItemContentProps> = ({ fieldsContent, onDeleted }) => {
  const { description, status, priority, endDatePlan, endDateActual } = fieldsContent;

  const classNames: string = 'table__item-cell';

  return (
    <>
      <td className={classNames}>
        <span className="table__item-cell--description">{description}</span>
      </td>
      <td className={classNames}>
        <span className="table__item-cell--status">{status}</span>
      </td>
      <td className={classNames}>
        <span className="table__item-cell--priority">{priority}</span>
      </td>
      <td className={classNames}>
        <span className="table__item-cell--datePlan">{endDatePlan}</span>
      </td>
      <td className={classNames}>
        <span className="table__item-cell--actualDate">{endDateActual}</span>
      </td>
      <td className={classNames}>
        <button type="button" className="btn table__btn table__btn--del" onClick={onDeleted}>
          Удалить
        </button>
      </td>
    </>
  );
};

export default TodoItemContent;
