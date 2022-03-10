import { UIActionType, UIStateType } from '../types/UITypes';

export const uiReducer = (uiState: UIStateType, action: UIActionType): UIStateType => {
  switch (action.type) {
    case 'OPEN_SIDEBAR':
      return {
        ...uiState,
        sidebarIsOpen: true,
      };
    case 'CLOSE_SIDEBAR':
      return {
        ...uiState,
        sidebarIsOpen: false,
      };
    case 'IS_ADDING':
      return {
        ...uiState,
        isAdding: action.payload,
      };
    case 'IS_DRAGGING':
      return {
        ...uiState,
        isDragging: action.payload,
      };

    default:
      return uiState;
  }
};
