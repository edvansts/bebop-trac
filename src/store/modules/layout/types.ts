import { IPage } from "../../../static/Pages";

export enum ActionTypes {
  toggleSidebar = "TOGGLE_SIDEBAR",
  changePageActive = "CHANGE_PAGE_ACTIVE",
}

export interface ToggleSidebar {
  type: ActionTypes.toggleSidebar;
}
export interface ChangePageActive {
  type: ActionTypes.changePageActive;
  payload: {
    page: IPage;
  };
}

export type LayoutAction = ToggleSidebar | ChangePageActive;

export interface LayoutReducer {
  collapsed: boolean;
  pageActive: IPage;
}
