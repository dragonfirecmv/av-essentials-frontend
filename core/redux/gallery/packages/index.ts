import { all, fork } from 'redux-saga/effects'
import { galleryPackageListAllSaga } from './sagas/list-all.packages'

export * from './actions.package'
export * from './types.package'
export * from './reducer.package'


export function *galleryPackageRootSaga() {
  yield all([
    fork(galleryPackageListAllSaga)
  ])
}