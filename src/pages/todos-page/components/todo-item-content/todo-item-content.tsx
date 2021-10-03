import React from 'react';

import { ITodoFieldsContent } from '../../../../interfaces';
import { Id } from '../../../../types';
import { getFormattedDate } from '../../../../helpers';
import { useAppContext, useTooltipContext } from '../../../../context';
import { firebaseDeleteTodo } from '../../../../services/firebase-service';
import deleteIcon from '../../../../assets/img/delete-icon.svg';

import './todo-item-content.css';

interface TodoItemContentProps {
  fieldsContent: ITodoFieldsContent;
  id: Id;
}

const TodoItemContent: React.FC<TodoItemContentProps> = ({ fieldsContent, id }) => {
  const { description, status, priority, endDatePlan, endDateActual } = fieldsContent;

  const { currentUser } = useAppContext();
  const { showTooltip } = useTooltipContext();

  const classNames = 'table__item-cell';

  return (
    <>
      <td className={classNames}>
        <span className={`${classNames}--description`}>{description}</span>
      </td>
      <td className={classNames}>
        <span className={`${classNames}--status`}>{status}</span>
      </td>
      <td className={classNames}>
        <span className={`${classNames}--priority`}>{priority}</span>
      </td>
      <td className={classNames}>
        <span className={`${classNames}--datePlan`}>
          {getFormattedDate(new Date(endDatePlan), 'task')}
        </span>
      </td>
      <td className={classNames}>
        <span className={`${classNames}--actualDate`}>
          {endDateActual == '-' ? endDateActual : getFormattedDate(new Date(endDateActual), 'task')}
        </span>
      </td>
      <td className={classNames}>
        <button
          type="button"
          className="btn table__btn table__btn--del"
          onClick={() => firebaseDeleteTodo(id, currentUser, showTooltip)}
        >
          <img src={deleteIcon} className="delete-icon" width="24" height="24" alt="Delete todo" />
        </button>
      </td>
    </>
  );
};

export default TodoItemContent;
