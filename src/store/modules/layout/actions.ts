import { IPage } from "../../../static/Pages";
import { Asset, Company, Unit, User } from "../../../types";
import {
  ActionTypes,
  ChangePageActive,
  CloseAssetModal,
  CloseCompanyModal,
  CloseUnitModal,
  CloseUserModal,
  OpenAssetModal,
  OpenCompanyModal,
  OpenUnitModal,
  OpenUserModal,
  ToggleSidebar,
} from "./types";

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

export function openAssetModal(asset: Asset): OpenAssetModal {
  return {
    type: ActionTypes.openAssetModal,
    payload: { asset },
  };
}

export function closeAssetModal(): CloseAssetModal {
  return {
    type: ActionTypes.closeAssetModal,
  };
}

export function openCompanyModal(company: Company): OpenCompanyModal {
  return {
    type: ActionTypes.openCompanyModal,
    payload: { company },
  };
}

export function closeCompanyModal(): CloseCompanyModal {
  return {
    type: ActionTypes.closeCompanyModal,
  };
}

export function openUserModal(user: User): OpenUserModal {
  return {
    type: ActionTypes.openUserModal,
    payload: { user },
  };
}

export function closeUserModal(): CloseUserModal {
  return {
    type: ActionTypes.closeUserModal,
  };
}

export function openUnitModal(unit: Unit): OpenUnitModal {
  return {
    type: ActionTypes.openUnitModal,
    payload: { unit },
  };
}

export function closeUnitModal(): CloseUnitModal {
  return {
    type: ActionTypes.closeUnitModal,
  };
}
