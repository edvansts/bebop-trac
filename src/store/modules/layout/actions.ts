import { IPage } from "../../../static/Pages";
import { Asset } from "../../../types";
import {
  ActionTypes,
  ChangePageActive,
  CloseAssetModal,
  OpenAssetModal,
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
