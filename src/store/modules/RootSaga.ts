import { all } from "redux-saga/effects";

import layoutSagas from "./layout/sagas";

export default function* RootSaga() {
  yield all([layoutSagas]);
  return;
}
