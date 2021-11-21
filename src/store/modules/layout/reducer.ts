import { Reducer } from "redux";
import { ActionTypes, ILayoutReducer } from "./types";
import produce from "immer";

const INITIAL_STATE: ILayoutReducer = {
  collapsed: false,
};

const layout: Reducer<ILayoutReducer> = (state = INITIAL_STATE, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case ActionTypes.toggleSidebar:
        draft.collapsed = !draft.collapsed;

        break;
      default:
        return draft;
    }
  });
};

export default layout;
