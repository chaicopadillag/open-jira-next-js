import { Entry } from '../interfaces';

export type EntryContextState = {
  entries: Entry[];
  addEntry: (entry: string) => Promise<boolean>;
  updateEntry: (entry: Entry) => Promise<boolean>;
  deleteEntry: (entry: Entry) => Promise<boolean>;
};

export type EntryStateType = {
  entries: Entry[];
};

export type EntryActionType = {
  type: 'SET_ENTRIES' | 'ADD_ENTRY' | 'UPDATE_ENTRY' | 'DELETE_ENTRY';
  payload: Entry | Entry[];
};
