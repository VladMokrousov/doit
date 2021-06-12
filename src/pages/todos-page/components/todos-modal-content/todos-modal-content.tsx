import React, { useState, useEffect } from 'react';
import { useAppContext, useTooltipContext } from '../../../../context';
import { ITodoFieldsContent } from '../../../../interfaces';
import { Id } from '../../../../types';
import firebase from 'firebase/app';
import './todos-modal-content.css';

interface TodosModalProps {
  selectedItemId: Id | false;
  onEdited?: (fieldsContent: ITodoFieldsContent) => void;
  onAdded: (fieldsContent: ITodoFieldsContent) => void;
  onToggleModal: (evt: any) => void;
}

const TodosModalContent: React.FC<TodosModalProps> = ({
  selectedItemId,
  onEdited,
  onAdded,
  onToggleModal,
}) => {
  const { currentUser } = useAppContext();
  const { showTooltip } = useTooltipContext();
  const currentDate: Date = new Date();
  const currentMonth: number = currentDate.getMonth() + 1;
  const currentDay: number = currentDate.getDate();
  const formattedDate: string = `${currentDate.getFullYear()}-${
    String(currentMonth).length == 2 ? currentMonth : '0' + currentMonth
  }-${String(currentDay).length == 2 ? currentDay : '0' + currentDay}`;

  const [state, setState] = useState<ITodoFieldsContent>({
    description: '',
    priority: 'Low',
    status: 'New',
    endDatePlan: formattedDate,
    endDateActual: '-',
  });

  useEffect(() => {
    if (selectedItemId) {
      const todosRef = firebase.database().ref('users/' + currentUser.uid + '/todos');
      todosRef
        .once('value')
        .then((snapshot) => {
          snapshot.forEach((childSnapshot) => {
            const childData = childSnapshot.val();
            if (childData.id === selectedItemId) {
              setState({
                ...childData.fieldsContent,
              });

              return true;
            }
          });
        })
        .catch((err) => {
          showTooltip(`Couldn't take the data from DB: ${err.message}`);
        });
    }
  }, []);

  const onDescriptionChange = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    setState((prevState) => {
      return {
        ...prevState,
        description: evt.target.value,
      };
    });
  };

  const onPriorityChange = (evt: React.ChangeEvent<HTMLSelectElement>): void => {
    setState((prevState) => {
      return {
        ...prevState,
        priority: evt.target.value,
      };
    });
  };

  const onStatusChange = (evt: React.ChangeEvent<HTMLSelectElement>): void => {
    if (evt.target.value == 'Done') {
      setState((prevState) => {
        return {
          ...prevState,
          endDateActual: formattedDate,
        };
      });
    } else {
      setState((prevState) => {
        return {
          ...prevState,
          endDateActual: '-',
        };
      });
    }
    setState((prevState) => {
      return {
        ...prevState,
        status: evt.target.value,
      };
    });
  };

  const onEndDatePlanChange = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    setState((prevState) => {
      return {
        ...prevState,
        endDatePlan: evt.target.value,
      };
    });
  };

  const onSubmit = (evt: React.FormEvent<HTMLFormElement>): void => {
    evt.preventDefault();

    if (selectedItemId) {
      onEdited!(state);
    } else {
      onAdded(state);
    }

    onToggleModal(evt);
  };

  const { description, priority, status, endDatePlan } = state;

  return (
    <form className="todos-form" onSubmit={onSubmit}>
      <label htmlFor="description">Description (*): </label>
      <input
        className="todos-form__description-field"
        id="description"
        type="text"
        name="description"
        onChange={onDescriptionChange}
        placeholder="What must be to do?"
        value={description}
        required
      />
      <div className="todos-form__select-wrapper flex-wrapper flex-wrapper--jsb">
        <div className="todos-form__priority-wrapper">
          <span className="todos-form__label-for-select">Priority:</span>
          <select
            className="todos-form__select"
            name="priority"
            onChange={onPriorityChange}
            value={priority}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <div className="todos-form__status-wrapper">
          <span className="todos-form__label-for-select">Status: </span>
          <select
            className="todos-form__select"
            disabled={!selectedItemId}
            name="status"
            onChange={onStatusChange}
            value={status}
          >
            <option value="New">New</option>
            <option value="In process">In process</option>
            <option value="Done">Done</option>
          </select>
        </div>
      </div>
      <label htmlFor="calendar">End Date: </label>
      <input
        className="todos-form__calendar"
        id="calendar"
        type="date"
        name="calendar"
        onChange={onEndDatePlanChange}
        value={endDatePlan}
      />

      <button className="todos-form__submit-btn">Save</button>
    </form>
  );
};

export default TodosModalContent;
