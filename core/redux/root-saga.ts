import { fork, all } from "redux-saga/effects";
import { authRootSaga } from "./auth/saga.auth";
import { galleryRootSaga } from "./gallery";
import { shopCartRootSaga } from "./shop-cart";


export function *rootSaga() {
  yield all([
    fork(authRootSaga),
    fork(galleryRootSaga),
    fork(shopCartRootSaga)
  ])
}