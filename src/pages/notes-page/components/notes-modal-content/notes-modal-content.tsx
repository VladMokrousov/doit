import React, { useState, useEffect } from 'react';
import { Form, Formik } from 'formik';

import CustomInput from 'components/customInput';
import { useAppContext, useTooltipContext } from 'context';
import { firebaseAddNote, firebaseEditNote, firebaseGetNoteValue } from 'services/firebase-service';
import { INoteItem, INotesPageState } from 'interfaces';
import { Id, ToggleModalTypes } from 'types';
import { noteFormValidationSchema } from 'validationSchemas';

import './notes-modal-content.css';

interface IPartOfFormikBag {
  setSubmitting: (isSubmitting: boolean) => void;
}

interface NotesModalProps {
  selectedItemId: Id | null;
  newItemId: Id;
  onToggleModal: (type?: ToggleModalTypes) => void;
  setNotesPageState: React.Dispatch<React.SetStateAction<INotesPageState>>;
}

const NotesModalContent: React.FC<NotesModalProps> = ({
  selectedItemId,
  newItemId,
  onToggleModal,
  setNotesPageState,
}) => {
  const { currentUser } = useAppContext();
  const { showTooltip } = useTooltipContext();
  const [initialDescription, setInitialDescription] = useState('');

  useEffect(() => {
    if (selectedItemId) {
      firebaseGetNoteValue(currentUser, selectedItemId, setInitialDescription, showTooltip);
    }
  }, []);

  const addNote = (description: string): void => {
    const newNote: INoteItem = {
      description,
      creationDate: new Date().toISOString(),
      id: newItemId,
    };

    firebaseAddNote(currentUser, newNote, showTooltip);
  };

  const editNote = (description: string): void => {
    firebaseEditNote(currentUser, selectedItemId, description, showTooltip);
    // @todo Сетать нужно когда взаимодействие с firebase успешно завершится
    setNotesPageState(({ selectedItemId, ...restParams }) => ({
      selectedItemId: null,
      ...restParams,
    }));
  };

  const handleSubmit = (values: { description: string }, { setSubmitting }: IPartOfFormikBag) => {
    if (selectedItemId) {
      editNote(values.description);
    } else {
      addNote(values.description);
    }

    // @todo По идее, нужно выполнять действия снизу только когда взаимодействие с firebase из addNote и editNote успешно завершится
    // Пока не сделаю todo выше, setSubmitting не нужен
    // setSubmitting(false);

    onToggleModal();
  };

  return (
    <Formik
      initialValues={{
        description: initialDescription,
      }}
      enableReinitialize={true}
      validationSchema={noteFormValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, errors, touched }) => (
        <Form className="notes-form">
          <CustomInput
            label={'Description'}
            labelClass="notes-form__label"
            isRequired={true}
            fieldClass="notes-form__field notes-form__field--description"
            type={undefined}
            fieldName={'description'}
            placeholder={'Type something :)'}
            isError={'description' in errors}
            isTouched={'description' in touched}
            as={'textarea'}
            children={undefined}
          />

          <button className="notes-form__submit-btn" type="submit" disabled={isSubmitting}>
            Save
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default NotesModalContent;
