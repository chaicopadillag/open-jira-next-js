import { Entry } from '../interfaces';
import { EntryActionType, EntryStateType } from '../types/EntryTypes';

export const entrieReducer = (state: EntryStateType, action: EntryActionType): EntryStateType => {
  switch (action.type) {
    case 'ADD_ENTRY':
      return {
        ...state,
        entries: [...(<Entry[]>state.entries), <Entry>action.payload],
      };
    case 'UPDATE_ENTRY':
      return {
        ...state,
        entries: state.entries.map((entry) => {
          if (entry._id === (<Entry>action.payload)._id) {
            return {
              ...entry,
              status: (<Entry>action.payload).status,
              description: (<Entry>action.payload).description,
            };
          }
          return entry;
        }),
      };
    case 'SET_ENTRIES':
      return {
        ...state,
        entries: <Entry[]>action.payload,
      };

    default:
      return state;
  }
};
