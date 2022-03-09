import { createContext, FC, useReducer } from 'react';
import { uiReducer } from '../reducers';
import { UIContextState } from '../types/UITypes';

const UiInitialState: UIContextState = {
  sidebarIsOpen: false,
};

export const UIContext = createContext<UIContextState>({} as UIContextState);

export const UIProvider: FC = ({ children }) => {
  const [uiState, dispatch] = useReducer(uiReducer, UiInitialState);

  const openSidebar = () => {
    dispatch({ type: 'OPEN_SIDEBAR' });
  };

  const closeSidebar = () => {
    dispatch({ type: 'CLOSE_SIDEBAR' });
  };

  return (
    <UIContext.Provider
      value={{
        ...uiState,
        openSidebar,
        closeSidebar,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
