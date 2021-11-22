import { LayoutReducer } from "./modules/layout/types";
import RootReducer from "./modules/RootReducer";
import createSagaMiddleware from "redux-saga";
import RootSaga from "./modules/RootSaga";
import { mainApi } from "./api/Endpoints";
import { configureStore } from "@reduxjs/toolkit";

export interface IState {
  layout: LayoutReducer;
  [mainApi.reducerPath]: ReturnType<typeof mainApi.reducer>;
}

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware, mainApi.middleware];

const store = configureStore({
  reducer: RootReducer,
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({ serializableCheck: false }),
    ...middlewares,
  ],
  devTools: true,
});

sagaMiddleware.run(RootSaga);

export default store;
