import { IPage } from "../../../static/Pages";
import { Asset } from "../../../types";

export type LayoutAction =
  | ToggleSidebar
  | ChangePageActive
  | OpenAssetModal
  | CloseAssetModal;

export enum ActionTypes {
  toggleSidebar = "TOGGLE_SIDEBAR",
  changePageActive = "CHANGE_PAGE_ACTIVE",
  openAssetModal = "OPEN_ASSET_MODAL",
  closeAssetModal = "CLOSE_ASSET_MODAL",
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

export interface OpenAssetModal {
  type: ActionTypes.openAssetModal;
  payload: {
    asset: Asset;
  };
}

export interface CloseAssetModal {
  type: ActionTypes.closeAssetModal;
}

export type PageActive = Omit<IPage, "icon" | "component">;

export interface LayoutReducer {
  collapsed: boolean;
  pageActive: PageActive;

  assetModalActived?: Asset;
}
