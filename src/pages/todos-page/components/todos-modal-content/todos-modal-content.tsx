import React, { useState, useEffect, useMemo } from 'react';
import { Formik, Form } from 'formik';

import { useAppContext, useTooltipContext } from 'context';
import { ITodoFieldsContent, ITodoItem, ITodosPageState } from 'interfaces';
import { Id, ToggleModalTypes } from 'types';
import { getFormattedDate, getFormattedTimeOffset } from 'helpers';
import { todoFormValidationSchema } from 'validationSchemas';
import CustomInput from 'components/customInput';
import { firebaseAddTodo, firebaseEditTodo, firebaseGetTodoValue } from 'services/firebase-service';

import './todos-modal-content.css';

interface IPartOfFormikBag {
  setSubmitting: (isSubmitting: boolean) => void;
}

interface ITodosModalProps {
  selectedItemId: Id | null;
  newItemId: Id;
  onToggleModal: (type?: ToggleModalTypes) => void;
  setState: React.Dispatch<React.SetStateAction<ITodosPageState>>;
}

const TodosModalContent: React.FC<ITodosModalProps> = ({
  selectedItemId,
  newItemId,
  onToggleModal,
  setState,
}) => {
  const { currentUser } = useAppContext();
  const { showTooltip } = useTooltipContext();

  const [initialState, setInitialState] = useState<ITodoFieldsContent>({
    description: '',
    priority: 'Low',
    status: 'New',
    endDatePlan: '',
    endDateActual: '-',
  });

  useEffect(() => {
    if (selectedItemId) {
      firebaseGetTodoValue(currentUser, selectedItemId, setInitialState, showTooltip);
    }
  }, []);

  const createCustomInput = (
    label: string,
    isRequired: boolean,
    type: string | undefined,
    fieldName: string,
    placeholder: string | undefined,
    errors: any,
    touched: any,
    as: any,
    children?: React.ReactNode
  ) => (
    <div className="todos-form__field-wrapper">
      <CustomInput
        label={label}
        labelClass="todos-form__label"
        isRequired={isRequired}
        fieldClass="todos-form__field"
        type={type}
        fieldName={fieldName}
        placeholder={placeholder}
        isError={fieldName in errors}
        isTouched={fieldName in touched}
        as={as}
        children={children}
      />
    </div>
  );

  const addTodo = (fieldsContent: ITodoFieldsContent): void => {
    const newItem: ITodoItem = {
      fieldsContent,
      id: newItemId,
    };

    firebaseAddTodo(currentUser, newItem, showTooltip);
  };

  const editTodo = (fieldsContent: ITodoFieldsContent): void => {
    firebaseEditTodo(currentUser, selectedItemId, fieldsContent, showTooltip);
    // @todo Сетать нужно когда взаимодействие с firebase успешно завершится
    setState(({ selectedItemId, ...restParams }) => ({
      selectedItemId: null,
      ...restParams,
    }));
  };

  const handleSubmit = (
    values: Omit<ITodoFieldsContent, 'endDateActual'>,
    { setSubmitting }: IPartOfFormikBag
  ) => {
    // Пример даты, которая хранится в values.endDatePlan 2021-09-10
    // Формат ниже нужен, чтобы задача считалась просроченной только тогда, когда у нас наступит 00:00 дня, следующего за тем, который мы обозначили в endDatePlan
    const endDatePlan = new Date(
      `${values.endDatePlan}T23:59:59.000${getFormattedTimeOffset()}:00`
    ).toISOString();

    const endDateActual =
      values.status == 'Done' && initialState.endDateActual === '-'
        ? new Date().toISOString()
        : initialState.endDateActual;

    const todo = {
      ...values,
      endDatePlan,
      endDateActual,
    };
    if (selectedItemId) {
      editTodo(todo);
    } else {
      addTodo(todo);
    }

    // @todo По идее, нужно выполнять действия снизу только когда взаимодействие с firebase из addTodo и editTodo успешно завершится
    // Пока не сделаю todo выше, setSubmitting не нужен
    // setSubmitting(false);

    onToggleModal();
  };

  return (
    <Formik
      initialValues={{
        description: initialState.description,
        priority: initialState.priority,
        status: initialState.status,
        endDatePlan: initialState.endDatePlan
          ? getFormattedDate(new Date(initialState.endDatePlan), 'calendar')
          : initialState.endDatePlan,
      }}
      enableReinitialize={true}
      validationSchema={todoFormValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, errors, touched }) => (
        <Form className="todos-form">
          {useMemo(
            () =>
              createCustomInput(
                `Description`,
                true,
                `text`,
                `description`,
                `What must be to do?`,
                errors,
                touched,
                undefined
              ),
            [errors, touched]
          )}
          <div className="todos-form__fields-group-wrapper">
            {useMemo(
              () =>
                createCustomInput(
                  `Priority`,
                  true,
                  undefined,
                  `priority`,
                  undefined,
                  errors,
                  touched,
                  `select`,
                  [
                    <option key="Low" value="Low">
                      Low
                    </option>,
                    <option key="Medium" value="Medium">
                      Medium
                    </option>,
                    <option key="High" value="High">
                      High
                    </option>,
                  ]
                ),
              [errors, touched]
            )}
            {useMemo(
              () =>
                createCustomInput(
                  `Status`,
                  true,
                  undefined,
                  `status`,
                  undefined,
                  errors,
                  touched,
                  `select`,
                  [
                    <option key="New" value="New">
                      New
                    </option>,
                    <option key="In progress" value="In progress">
                      In progress
                    </option>,
                    <option key="Done" value="Done">
                      Done
                    </option>,
                  ]
                ),
              [errors, touched]
            )}
          </div>

          {/* @todo Эта проверка была раньше на календаре. Нужно перенести ее на кастомный календарь
          min={getFormattedDate(new Date(), 'calendar')}
           */}
          {useMemo(
            () =>
              createCustomInput(
                `End Date`,
                true,
                `date`,
                `endDatePlan`,
                undefined,
                errors,
                touched,
                undefined
              ),
            [errors, touched]
          )}

          <button className="todos-form__submit-btn" type="submit" disabled={isSubmitting}>
            Save
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default TodosModalContent;
