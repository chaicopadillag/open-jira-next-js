import { createContext, FC, useReducer } from 'react';
import { uiReducer } from '../reducers';
import { UIContextState } from '../types/UITypes';

const UiInitialState: UIContextState = {
  sidebarIsOpen: false,
  isAdding: false,
  isDragging: false,
  setIsAdding: (val: boolean) => {},
  setIsDragging: (val: boolean) => {},
};

export const UIContext = createContext<UIContextState>({} as UIContextState);

export const UIProvider: FC = ({ children }) => {
  const [uiState, dispatch] = useReducer(uiReducer, UiInitialState);

  const openSidebar = () => {
    dispatch({ type: 'OPEN_SIDEBAR', payload: true });
  };

  const closeSidebar = () => {
    dispatch({ type: 'CLOSE_SIDEBAR', payload: false });
  };

  const setIsAdding = (isAdding: boolean) => {
    dispatch({ type: 'IS_ADDING', payload: isAdding });
  };

  const setIsDragging = (isDragging: boolean) => dispatch({ type: 'IS_DRAGGING', payload: isDragging });

  return (
    <UIContext.Provider
      value={{
        ...uiState,
        openSidebar,
        closeSidebar,
        setIsAdding,
        setIsDragging,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
