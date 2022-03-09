export type UIContextState = {
  sidebarIsOpen: boolean;
  openSidebar?: () => void;
  closeSidebar?: () => void;
};

export type UIStateType = {
  sidebarIsOpen: boolean;
};

export type UIActionType = {
  type: 'OPEN_SIDEBAR' | 'CLOSE_SIDEBAR';
};
