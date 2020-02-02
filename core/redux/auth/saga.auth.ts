import { all, fork } from 'redux-saga/effects'
import { authLoginUserSaga } from './sagas/login-user.auth'
import { authRegisterUserSaga } from './sagas/register-user.auth'


export function *authRootSaga() {
  yield all([
    fork(authLoginUserSaga),
    fork(authRegisterUserSaga)
  ])
}
