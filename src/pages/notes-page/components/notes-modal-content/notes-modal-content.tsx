import React, { useState, useEffect } from 'react';
import { useAppContext, useTooltipContext } from '../../../../context';
import { Id } from '../../../../types';
import firebase from 'firebase/app';
import './notes-modal-content.css';

interface NotesModalProps {
  selectedItemId: Id | false;
  onEdited?: (description: string) => void;
  onAdded: (description: string) => void;
  onToggleModal: (evt: any) => void;
}

const NotesModalContent: React.FC<NotesModalProps> = ({
  selectedItemId,
  onEdited,
  onAdded,
  onToggleModal,
}) => {
  const { currentUser } = useAppContext();
  const { showTooltip } = useTooltipContext();
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (selectedItemId) {
      const notesRef = firebase.database().ref('users/' + currentUser.uid + '/notes');
      notesRef
        .once('value')
        .then((snapshot) => {
          snapshot.forEach((childSnapshot) => {
            const childData = childSnapshot.val();
            if (childData.id === selectedItemId) {
              setDescription(childData.description);

              return true;
            }
          });
        })
        .catch((error) => {
          showTooltip(`Couldn't take the data from DB: ${error.message}`);
        });
    }
  }, []);

  const onDescriptionChange = (evt: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setDescription(evt.target.value);
  };

  const onSubmit = (evt: React.FormEvent<HTMLFormElement>): void => {
    evt.preventDefault();

    if (selectedItemId) {
      onEdited!(description);
    } else {
      onAdded(description);
    }

    onToggleModal(evt);
  };

  return (
    <form className="notes-form" onSubmit={onSubmit}>
      <label htmlFor="description">Description (*): </label>
      <textarea
        className="notes-form__description-field"
        id="description"
        name="description"
        onChange={onDescriptionChange}
        placeholder="Type something:)"
        value={description}
        required
      />

      <button className="notes-form__submit">Save</button>
    </form>
  );
};

export default NotesModalContent;
