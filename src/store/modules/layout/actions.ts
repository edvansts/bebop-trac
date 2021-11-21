import { IPage } from "../../../static/Pages";
import { ActionTypes, ChangePageActive, ToggleSidebar } from "./types";

export function toggleSidebar(): ToggleSidebar {
  return {
    type: ActionTypes.toggleSidebar,
  };
}

export function changePageActive(page: IPage): ChangePageActive {
  return {
    type: ActionTypes.changePageActive,
    payload: { page },
  };
}
