import { IPage } from "../../../static/Pages";
import { Asset, Company, Unit, User } from "../../../types";

export type LayoutAction =
  | ToggleSidebar
  | ChangePageActive
  | OpenAssetModal
  | CloseAssetModal
  | OpenCompanyModal
  | CloseCompanyModal
  | OpenUserModal
  | CloseUserModal
  | OpenUnitModal
  | CloseUnitModal;

export enum ActionTypes {
  toggleSidebar = "TOGGLE_SIDEBAR",
  changePageActive = "CHANGE_PAGE_ACTIVE",

  openAssetModal = "OPEN_ASSET_MODAL",
  closeAssetModal = "CLOSE_ASSET_MODAL",

  openCompanyModal = "OPEN_COMPANY_MODAL",
  closeCompanyModal = "CLOSE_COMPANY_MODAL",

  openUserModal = "OPEN_USER_MODAL",
  closeUserModal = "CLOSE_USER_MODAL",

  openUnitModal = "OPEN_UNIT_MODAL",
  closeUnitModal = "CLOSE_UNIT_MODAL",
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

export interface OpenCompanyModal {
  type: ActionTypes.openCompanyModal;
  payload: {
    company: Company;
  };
}

export interface CloseCompanyModal {
  type: ActionTypes.closeCompanyModal;
}

export interface OpenUserModal {
  type: ActionTypes.openUserModal;
  payload: {
    user: User;
  };
}

export interface CloseUserModal {
  type: ActionTypes.closeUserModal;
}

export interface OpenUnitModal {
  type: ActionTypes.openUnitModal;
  payload: {
    unit: Unit;
  };
}

export interface CloseUnitModal {
  type: ActionTypes.closeUnitModal;
}

export type PageActive = Omit<IPage, "icon" | "component">;

export interface LayoutReducer {
  collapsed: boolean;
  pageActive: PageActive;

  assetModalActived?: Asset;
  companyModalActived?: Company;
  userModalActived?: User;
  unitModalActived?: Unit;
}
