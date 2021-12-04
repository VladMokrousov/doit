import firebase from 'firebase/app';

import {
  INoteItem,
  INotesPageState,
  ITodoFieldsContent,
  ITodoItem,
  ITodosPageState,
} from '../interfaces';
import { TooltipTypes, Id } from '../types';

export const firebaseCreateUser = (values: any, showTooltip: any, setSubmitting: any) =>
  firebase
    .auth()
    .createUserWithEmailAndPassword(values.email, values.password)
    .then(() => localStorage.setItem('rememberMe', 'true'))
    .catch((err) =>
      showTooltip(TooltipTypes.Error, `Your account didn't be created: ${err.message}`)
    )
    .finally(() => setSubmitting(false));

export const firebaseSignIn = (values: any, showTooltip: any, setSubmitting: any) => {
  if (values.rememberMe) {
    localStorage.setItem('rememberMe', 'true');
  } else {
    localStorage.removeItem('rememberMe');
  }

  firebase
    .auth()
    .signInWithEmailAndPassword(values.email, values.password)
    .catch((err) => showTooltip(TooltipTypes.Error, err.message))
    .finally(() => setSubmitting(false));
};

// @todo Do i need in almost the same Google signIn/Up?
// @todo  setSubmitting(false)
export const firebaseCreateUserWithGoogle = (showTooltip: any): void => {
  const provider = new firebase.auth.GoogleAuthProvider();

  firebase
    .auth()
    .signInWithPopup(provider)
    .then(() => localStorage.setItem('rememberMe', 'true'))
    .catch((error) => {
      showTooltip(TooltipTypes.Error, error.message);
    });
};

// @todo  setSubmitting(false)
export const firebaseGoogleSignIn = (showTooltip: any): void => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .catch((error) => {
      showTooltip(TooltipTypes.Error, error.message);
    });
};

// @todo  setSubmitting(false)
export const firebaseSignOut = (
  showTooltip: (type: TooltipTypes, message: string) => void
): Promise<void> =>
  firebase
    .auth()
    .signOut()
    .catch((error) => {
      showTooltip(TooltipTypes.Error, error.message);
    });

export const firebaseSendPasswordResetEmail = (
  values: any,
  actionCodeSettings: any,
  showTooltip: any,
  setSubmitting: any
) =>
  firebase
    .auth()
    .sendPasswordResetEmail(values.email, actionCodeSettings)
    .then(() => {
      showTooltip(TooltipTypes.Info, 'The email to reset your password was send');
    })
    .catch((err) => {
      showTooltip(TooltipTypes.Error, err.message);
    })
    .finally(() => setSubmitting(false));

// Todos page --------------------------------------------
export const firebaseConnectDisconnectTodoList = (
  type: 'connect' | 'disconnect',
  currentUser: any,
  showTooltip: any,
  setTodoPageState: React.Dispatch<React.SetStateAction<ITodosPageState>>
) => {
  const getTodos = (elem: firebase.database.DataSnapshot) => {
    setTodoPageState(({ isDataLoaded, ...restParams }) => ({
      isDataLoaded: true,
      ...restParams,
      todosList: elem.child('list').val(),
      lastTodoId: elem.child('lastTodoId').val(),
    }));
  };

  const todosRef = firebase.database().ref('users/' + currentUser.uid + '/todos');
  if (type === 'connect') {
    try {
      todosRef.on('value', getTodos);
    } catch (error: any) {
      showTooltip(TooltipTypes.Error, `Couldn't fetch the todo list: ${error.message}`);
    }
  } else {
    todosRef.off('value', getTodos);
  }
};

export const firebaseDeleteTodo = (id: Id, currentUser: any, showTooltip: any): void => {
  const todosRef = firebase.database().ref('users/' + currentUser.uid + '/todos/list');
  todosRef
    .once('value')
    .then((snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const childData = childSnapshot.val();
        if (childData.id === id) {
          const todoRef = firebase.database().ref('users/' + currentUser.uid + `/todos`);

          // Если от=стался последний элемент, который мы сейчас удалим
          if (Object.keys(snapshot.val()).length - 1 === 0) {
            todoRef.update({
              [`/list/${childSnapshot.key}`]: null,
              '/lastTodoId': null,
            });
          } else {
            firebase
              .database()
              .ref('users/' + currentUser.uid + `/todos/list/${childSnapshot.key}`)
              .remove();
          }

          return true;
        }
      });
    })
    .catch((err) => {
      showTooltip(TooltipTypes.Error, `Removing the todo was failed: ${err.message}`);
    });
};

export const firebaseAddTodo = (currentUser: any, newItem: ITodoItem, showTooltip: any): void => {
  const todosRef = firebase.database().ref(`users/${currentUser.uid}/todos`);
  const newTodoKey = todosRef.child(`list`).push().key;

  todosRef
    .update({
      [`list/${newTodoKey}`]: newItem,
      lastTodoId: newItem.id,
    })
    .catch((err) => {
      showTooltip(TooltipTypes.Error, `Todo wasn't added: ${err.message}`);
    });
};

export const firebaseEditTodo = (
  currentUser: any,
  selectedItemId: Id | null,
  fieldsContent: ITodoFieldsContent,
  showTooltip: any
) => {
  const todosListRef = firebase.database().ref('users/' + currentUser.uid + '/todos/list');
  todosListRef
    .once('value')
    .then((snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const childData = childSnapshot.val();
        if (childData.id === selectedItemId) {
          todosListRef.child(`${childSnapshot.key}/fieldsContent`).set({ ...fieldsContent });

          return true;
        }
      });
    })
    .catch((err) => {
      showTooltip(TooltipTypes.Error, `Editing the task was failed: ${err.message}`);
    });
};

export const firebaseGetTodoValue = (
  currentUser: any,
  selectedItemId: Id,
  setInitialState: React.Dispatch<React.SetStateAction<ITodoFieldsContent>>,
  showTooltip: any
) => {
  const todosRef = firebase.database().ref('users/' + currentUser.uid + '/todos/list');
  todosRef
    .once('value')
    .then((snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const childData = childSnapshot.val();
        if (childData.id === selectedItemId) {
          setInitialState({
            ...childData.fieldsContent,
          });

          return true;
        }
      });
    })
    .catch((err) => {
      showTooltip(TooltipTypes.Error, `Couldn't take the data about this todo: ${err.message}`);
    });
};

// Notes page --------------------------------------------
export const firebaseConnectDisconnectNoteList = (
  type: 'connect' | 'disconnect',
  currentUser: any,
  showTooltip: any,
  setNotesPageState: React.Dispatch<React.SetStateAction<INotesPageState>>
) => {
  const getNotes = (elem: firebase.database.DataSnapshot) => {
    setNotesPageState(({ isDataLoaded, ...restParams }) => ({
      isDataLoaded: true,
      ...restParams,
      noteList: elem.child('list').val(),
      lastNoteId: elem.child('lastNoteId').val(),
    }));
  };

  const notesRef = firebase.database().ref('users/' + currentUser.uid + '/notes');
  if (type === 'connect') {
    try {
      notesRef.on('value', getNotes);
    } catch (error: any) {
      showTooltip(TooltipTypes.Error, `Couldn't fetch the note list: ${error.message}`);
    }
  } else {
    notesRef.off('value', getNotes);
  }
};

// @todo Стоит объединить с такой же функцией для удаления todo
export const firebaseDeleteNote = (id: Id, currentUser: any, showTooltip: any): void => {
  const notesRef = firebase.database().ref('users/' + currentUser.uid + '/notes/list');
  notesRef
    .once('value')
    .then((snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const childData = childSnapshot.val();
        if (childData.id === id) {
          const noteRef = firebase.database().ref('users/' + currentUser.uid + `/notes`);

          // Если остался последний элемент, который мы сейчас удалим
          if (Object.keys(snapshot.val()).length - 1 === 0) {
            noteRef.update({
              [`/list/${childSnapshot.key}`]: null,
              '/lastNoteId': null,
            });
          } else {
            firebase
              .database()
              .ref('users/' + currentUser.uid + `/notes/list/${childSnapshot.key}`)
              .remove();
          }

          return true;
        }
      });
    })
    .catch((error) => {
      showTooltip(TooltipTypes.Error, `Removing the note failed: ${error.message}`);
    });
};

export const firebaseGetNoteValue = (
  currentUser: any,
  selectedItemId: Id,
  setInitialDescription: React.Dispatch<React.SetStateAction<string>>,
  showTooltip: any
) => {
  const notesRef = firebase.database().ref('users/' + currentUser.uid + '/notes/list');
  notesRef
    .once('value')
    .then((snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const childData = childSnapshot.val();
        if (childData.id === selectedItemId) {
          setInitialDescription(childData.description);

          return true;
        }
      });
    })
    .catch((error) => {
      showTooltip(TooltipTypes.Error, `Couldn't take the data about this note: ${error.message}`);
    });
};
// @todo Стоит объединить с такой же функцией для добавления todo
export const firebaseAddNote = (currentUser: any, newNote: INoteItem, showTooltip: any): void => {
  const notesRef = firebase.database().ref(`users/${currentUser.uid}/notes`);
  const newNoteKey = notesRef.child(`list`).push().key;

  notesRef
    .update({
      [`list/${newNoteKey}`]: newNote,
      lastNoteId: newNote.id,
    })
    .catch((err) => {
      showTooltip(TooltipTypes.Error, `Note wasn't added: ${err.message}`);
    });
};

// @todo Стоит объединить с такой же функцией для добавления todo
export const firebaseEditNote = (
  currentUser: any,
  selectedItemId: Id | null,
  description: string,
  showTooltip: any
) => {
  const noteListRef = firebase.database().ref('users/' + currentUser.uid + '/notes/list');
  noteListRef
    .once('value')
    .then((snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const childData = childSnapshot.val();
        if (childData.id === selectedItemId) {
          noteListRef.child(`${childSnapshot.key}/description`).set(description);
          return true;
        }
      });
    })
    .catch((error) => {
      showTooltip(TooltipTypes.Error, `Editing the note was failed: ${error.message}`);
    });
};
