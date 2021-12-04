import { Id } from './types';

export interface ITodoItem {
  fieldsContent: ITodoFieldsContent;
  id: Id;
}

export interface ITodoFieldsContent {
  description: string;
  priority: string;
  status: string;
  endDatePlan: string;
  endDateActual: string;
}

export interface INoteItem {
  description: string;
  creationDate: string;
  id: Id;
}

export interface ICustomInput {
  label: string;
  labelClass?: string;
  isRequired: boolean;
  fieldClass?: string;
  type?: string;
  fieldName: string;
  placeholder?: string;
  isError: boolean;
  isTouched: boolean;
  as?: string;
}

export interface ITodosList {
  [key: string]: ITodoItem;
}

// @todo fix 'todosList' and similary things to 'todoList'
export interface ITodosPageState {
  todosList: ITodosList | null;
  lastTodoId: Id | null;
  term: string;
  filter: string;
  showModal: boolean;
  selectedItemId: Id | null;
  isDataLoaded: boolean;
}

export interface INoteList {
  [key: string]: INoteItem;
}

export interface INotesPageState {
  noteList: INoteList | null;
  lastNoteId: Id | null;
  showModal: boolean;
  selectedItemId: Id | null;
  isDataLoaded: boolean;
}
