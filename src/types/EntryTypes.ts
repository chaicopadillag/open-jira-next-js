import { Entry } from '../interfaces';

export type EntryContextState = {
  entries: Entry[];
  addEntry: (entry: string) => void;
  updateEntry: (entry: Entry) => void;
};

export type EntryStateType = {
  entries: Entry[];
};

export type EntryActionType = {
  type: 'ADD_ENTRY' | 'UPDATE_ENTRY';
  payload: Entry;
};
