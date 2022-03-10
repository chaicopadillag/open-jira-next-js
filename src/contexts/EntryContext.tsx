import { createContext, FC, useReducer } from 'react';
import { v4 as uuid } from 'uuid';
import { Entry } from '../interfaces';
import { entrieReducer } from '../reducers';
import { EntryContextState } from '../types/EntryTypes';

const EntryInitialState: EntryContextState = {
  entries: [
    {
      _id: uuid(),
      description: 'Quo quibusdam tempore quae quaerat. Occaecati esse praesentium eum autem ex sed dolores voluptates. Sapiente repellendus molestiae velit saepe assumenda.',
      status: 'pending',
      createdAt: Date.now(),
    },
    {
      _id: uuid(),
      description:
        'Dignissimos eos optio vel mollitia qui. Quis vero provident. Et corrupti minus quo voluptatem corporis illo sint nihil. Aut et nostrum dolorem omnis. Perspiciatis vitae dolor itaque voluptatem. Saepe omnis sit a et voluptatum ex maxime.',
      status: 'inProgress',
      createdAt: Date.now() - 1000000,
    },
    {
      _id: uuid(),
      description: 'Maiores et ut est. Corrupti totam est nisi id voluptatem dolorum et. Ratione sint alias sit saepe aliquam dolore.',
      status: 'finished',
      createdAt: Date.now() - 2000000,
    },
  ],
  addEntry: (description: string) => {},
  updateEntry: (entry: Entry) => {},
};

export const EntryContext = createContext<EntryContextState>({} as EntryContextState);

export const EntryProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(entrieReducer, EntryInitialState);

  const addEntry = (description: string) => {
    const entry: Entry = {
      _id: uuid(),
      description,
      status: 'pending',
      createdAt: Date.now(),
    };
    dispatch({ type: 'ADD_ENTRY', payload: entry });
  };

  const updateEntry = (entry: Entry) => dispatch({ type: 'UPDATE_ENTRY', payload: entry });

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
