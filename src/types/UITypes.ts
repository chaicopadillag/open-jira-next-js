export type UIContextState = {
  sidebarIsOpen: boolean;
  isAdding: boolean;
  isDragging: boolean;
  setIsAdding: (isAdding: boolean) => void;
  setIsDragging: (isDragging: boolean) => void;
  openSidebar?: () => void;
  closeSidebar?: () => void;
};

export type UIStateType = {
  sidebarIsOpen: boolean;
  isAdding: boolean;
  isDragging: boolean;
};

export type UIActionType = {
  type: 'OPEN_SIDEBAR' | 'CLOSE_SIDEBAR' | 'IS_ADDING' | 'IS_DRAGGING';
  payload: boolean;
};
