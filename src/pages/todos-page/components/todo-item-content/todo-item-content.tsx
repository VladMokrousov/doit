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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
            fill="#ff2a2a"
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v10zM9 9h6c.55 0 1 .45 1 1v8c0 .55-.45 1-1 1H9c-.55 0-1-.45-1-1v-8c0-.55.45-1 1-1zm6.5-5l-.71-.71c-.18-.18-.44-.29-.7-.29H9.91c-.26 0-.52.11-.7.29L8.5 4H6c-.55 0-1 .45-1 1s.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1h-2.5z" />
          </svg>
        </button>
      </td>
    </>
  );
};

export default TodoItemContent;
