import { EntryActionType, EntryStateType } from '../types/EntryTypes';

export const entrieReducer = (state: EntryStateType, action: EntryActionType): EntryStateType => {
  switch (action.type) {
    case 'ADD_ENTRY':
      return {
        ...state,
        entries: [...state.entries, action.payload],
      };
    case 'UPDATE_ENTRY':
      return {
        ...state,
        entries: state.entries.map((entry) => {
          if (entry._id === action.payload._id) {
            return {
              ...entry,
              status: action.payload.status,
              description: action.payload.description,
            };
          }
          return entry;
        }),
      };

    default:
      return state;
  }
};
