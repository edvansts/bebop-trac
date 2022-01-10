import { Reducer } from "redux";
import { ActionTypes, LayoutReducer, LayoutAction } from "./types";
import produce from "immer";
import { PAGES } from "../../../static/Pages";
import { removeProperties } from "../../../static/FnUtils";

const INITIAL_STATE: LayoutReducer = {
  collapsed: false,
  pageActive: removeProperties(PAGES.home, ["icon", "component"]),
};

const layoutReducer: Reducer<LayoutReducer, LayoutAction> = (
  state = INITIAL_STATE,
  action
) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case ActionTypes.toggleSidebar:
        draft.collapsed = !draft.collapsed;

        break;
      case ActionTypes.changePageActive:
        const { page } = action.payload;

        const pageNormalized = removeProperties(page, ["icon", "component"]);

        draft.pageActive = pageNormalized;

        break;

      case ActionTypes.openAssetModal:
        draft.assetModalActived = action.payload.asset;
        break;
      case ActionTypes.closeAssetModal:
        draft.assetModalActived = undefined;
        break;

      case ActionTypes.openCompanyModal:
        draft.companyModalActived = action.payload.company;

        break;
      case ActionTypes.closeCompanyModal:
        draft.companyModalActived = undefined;

        break;

      case ActionTypes.openUserModal:
        draft.userModalActived = action.payload.user;

        break;
      case ActionTypes.closeUserModal:
        draft.userModalActived = undefined;

        break;

      case ActionTypes.openUnitModal:
        draft.unitModalActived = action.payload.unit;

        break;
      case ActionTypes.closeUnitModal:
        draft.unitModalActived = undefined;

        break;
      default:
        return draft;
    }
  });
};

export default layoutReducer;
