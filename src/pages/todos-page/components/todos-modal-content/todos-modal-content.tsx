import React, { useState, useEffect } from 'react';
import { useAppContext, useTooltipContext } from '../../../../context';
import { ITodoFieldsContent } from '../../../../interfaces';
import { Id } from '../../../../types';
import firebase from 'firebase/app';
import { getFormattedDate } from '../../../../helpers';
import { TooltipTypes } from '../../../../types';
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

  const [state, setState] = useState<ITodoFieldsContent>({
    description: '',
    priority: 'Low',
    status: 'New',
    endDatePlan: '',
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
          showTooltip(TooltipTypes.Error, `Couldn't take the data from DB: ${err.message}`);
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
          endDateActual: new Date().toISOString(),
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
    if (evt.target.value.length == 10) {
      let formattedTimeOffset = String(new Date().getTimezoneOffset() / 60);

      if (formattedTimeOffset.includes('-')) {
        formattedTimeOffset.length == 2
          ? (formattedTimeOffset = formattedTimeOffset.replace('-', '+0'))
          : (formattedTimeOffset = formattedTimeOffset.replace('-', '+'));
      } else {
        formattedTimeOffset.length == 1
          ? (formattedTimeOffset = `-0${formattedTimeOffset}`)
          : (formattedTimeOffset = `-${formattedTimeOffset}`);
      }

      setState((prevState) => {
        return {
          ...prevState,
          endDatePlan: new Date(
            `${evt.target.value}T23:59:59.000${formattedTimeOffset}:00`
          ).toISOString(),
        };
      });
    }
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
      <div className="todos-form__field-wrapper">
        <label className="todos-form__label" htmlFor="description">
          Description<sup className="todos-form__label-required">*</sup>:
        </label>
        <input
          maxLength={40}
          className="todos-form__field"
          id="description"
          type="text"
          name="description"
          onChange={onDescriptionChange}
          placeholder="What must be to do?"
          value={description}
          required
        />
      </div>

      <div className="todos-form__fields-group-wrapper">
        <div className="todos-form__field-wrapper">
          <label className="todos-form__label" htmlFor="priority">
            Priority:
          </label>
          <select
            className="todos-form__field"
            id="priority"
            name="priority"
            onChange={onPriorityChange}
            value={priority}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <div className="todos-form__field-wrapper">
          <label className="todos-form__label" htmlFor="status">
            Status:
          </label>
          <select
            className="todos-form__field"
            id="status"
            name="status"
            onChange={onStatusChange}
            value={status}
          >
            <option value="New">New</option>
            <option value="In progress">In progress</option>
            <option value="Done">Done</option>
          </select>
        </div>
      </div>
      <div className="todos-form__field-wrapper">
        <label className="todos-form__label" htmlFor="calendar">
          End Date:{' '}
        </label>
        <input
          required
          className="todos-form__field"
          id="calendar"
          type="date"
          name="calendar"
          onChange={onEndDatePlanChange}
          value={endDatePlan ? getFormattedDate(new Date(endDatePlan), 'calendar') : endDatePlan}
          min={getFormattedDate(new Date(), 'calendar')}
        />
      </div>

      <button className="todos-form__submit-btn">Save</button>
    </form>
  );
};

export default TodosModalContent;
