import { all, fork } from 'redux-saga/effects'
import { shopCartAddItemToMine } from './sagas/add-item.cart-item'
import { shopCartGetMyCurrent } from './sagas/get-my-current.cart'
import { shopCartCheckoutMyCurrent } from './sagas/checkout-my.cart'
import { shopCartEditInfoOfMyCurrent } from './sagas/edit-info-of-my.cart'


export function *shopCartRootSaga() {
  yield all([
    fork(shopCartAddItemToMine),
    fork(shopCartGetMyCurrent),
    fork(shopCartCheckoutMyCurrent),
    fork(shopCartEditInfoOfMyCurrent)
  ])
}
