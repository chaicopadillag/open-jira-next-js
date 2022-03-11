import { createContext, FC, useEffect, useReducer } from 'react';
import { Entry } from '../interfaces';
import { entrieReducer } from '../reducers';
import { entryService } from '../services';
import { EntryContextState } from '../types/EntryTypes';

const EntryInitialState: EntryContextState = {
  entries: [],
  addEntry: (description: string) => {},
  updateEntry: (entry: Entry) => {},
};

export const EntryContext = createContext<EntryContextState>({} as EntryContextState);

export const EntryProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(entrieReducer, EntryInitialState);

  const addEntry = async (description: string) => {
    const { data } = await entryService.post<Entry>('/entry', { description });
    dispatch({ type: 'ADD_ENTRY', payload: data });
  };

  const updateEntry = async ({ _id, description, status }: Entry) => {
    try {
      const { data } = await entryService.put<Entry>(`/entry/${_id}`, { description, status });

      dispatch({ type: 'UPDATE_ENTRY', payload: data });
    } catch (error) {
      console.log(error);
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
      }}
    >
      {children}
    </EntryContext.Provider>
  );
};
