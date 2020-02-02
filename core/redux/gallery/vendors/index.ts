import { all, fork } from 'redux-saga/effects'
import { galleryVendorListAllSaga } from './sagas/list-all.vendor'
import { galleryVendorGetFromSlugSaga } from './sagas/get-from-slug.vendor'

export * from './actions.vendor'
export * from './types.vendor'
export * from './reducer.vendor'


export function *galleryVendorRootSaga() {
  yield all([
    fork(galleryVendorListAllSaga),
    fork(galleryVendorGetFromSlugSaga)
  ])
}