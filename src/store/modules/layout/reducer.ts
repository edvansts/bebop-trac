import { Reducer } from "redux";
import { ActionTypes, LayoutReducer, LayoutAction } from "./types";
import produce from "immer";
import { PAGES } from "../../../static/Pages";

const INITIAL_STATE: LayoutReducer = {
  collapsed: false,
  pageActive: PAGES.home,
};

const layout: Reducer<LayoutReducer, LayoutAction> = (
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

        draft.pageActive = page;

        break;
      default:
        return draft;
    }
  });
};

export default layout;
