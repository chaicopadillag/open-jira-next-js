import { createContext, FC, useEffect, useReducer } from 'react';
import { Entry } from '../interfaces';
import { entrieReducer } from '../reducers';
import { entryService } from '../services';
import { EntryContextState } from '../types/EntryTypes';

const EntryInitialState: EntryContextState = {
  entries: [],
  addEntry: async (description: string) => false,
  updateEntry: async (entry: Entry) => false,
  deleteEntry: async (entry: Entry) => false,
};

export const EntryContext = createContext<EntryContextState>({} as EntryContextState);

export const EntryProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(entrieReducer, EntryInitialState);

  const addEntry = async (description: string) => {
    const { data } = await entryService.post<Entry>('/entry', { description });
    dispatch({ type: 'ADD_ENTRY', payload: data });
    return true;
  };

  const updateEntry = async ({ _id, description, status }: Entry) => {
    try {
      const { data } = await entryService.put<Entry>(`/entry/${_id}`, { description, status });

      dispatch({ type: 'UPDATE_ENTRY', payload: data });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const deleteEntry = async (entry: Entry) => {
    try {
      await entryService.delete<string>(`/entry/${entry._id}`);

      dispatch({ type: 'DELETE_ENTRY', payload: entry });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const getEntries = async () => {
    const { data } = await entryService.get<Entry[]>('/entry');
    dispatch({ type: 'SET_ENTRIES', payload: data });
  };

  useEffect(() => {
    getEntries();
  }, []);

  return (
    <EntryContext.Provider
      value={{
        ...state,
        addEntry,
        updateEntry,
        deleteEntry,
      }}
    >
      {children}
    </EntryContext.Provider>
  );
};
