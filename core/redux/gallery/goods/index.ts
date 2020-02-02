import { all, fork } from 'redux-saga/effects'
import { galleryGoodsListAllSaga } from './sagas/list-all.goods'
import { galleryGoodsGetFromSlugSaga } from './sagas/get-from-id.goods'

export * from './actions.goods'
export * from './reducer.goods'
export * from './types.goods'


export function *galleryGoodsRootSaga() {
  yield all([
    fork(galleryGoodsListAllSaga),
    fork(galleryGoodsGetFromSlugSaga)
  ])
}