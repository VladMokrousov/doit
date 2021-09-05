import { Id } from './types';

export interface ITodoItem {
  fieldsContent: ITodoFieldsContent;
  id: Id;
}

// @todo Поменять название, чтобы было ясно, что это  поля в модалке для todo
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

// @todo
export interface IEveryStatusCount {
  [key: string]: number;
  // all: number;
  // new: number;
  // inProgress: number;
  // done: number;
}

export interface ICustomInput {
  label: string;
  labelClass?: string;
  isRequired: boolean;
  fieldClass?: string;
  type: string;
  fieldName: string;
  placeholder: string;
  isError: boolean;
  isTouched: boolean;
}
