import { applyMiddleware, createStore } from "redux";
import { LayoutReducer } from "./modules/layout/types";
import RootReducer from "./modules/RootReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import RootSaga from "./modules/RootSaga";

export interface IState {
  layout: LayoutReducer;
}

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

const store = createStore(
  RootReducer,
  composeWithDevTools(applyMiddleware(...middlewares))
);

sagaMiddleware.run(RootSaga);

export default store;
