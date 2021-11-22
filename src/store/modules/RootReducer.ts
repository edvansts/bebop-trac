import { combineReducers } from "redux";
import { mainApi } from "../api/Endpoints";
import layout from "./layout/reducer";

export default combineReducers({
  layout,
  [mainApi.reducerPath]: mainApi.reducer,
});
