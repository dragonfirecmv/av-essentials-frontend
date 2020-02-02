import { call, put, takeEvery }   from 'redux-saga/effects'
import { getType }                from 'typesafe-actions'
import { IResponse, restRequest } from '~/core/libs/apis/rest.api'
import { API_AUTH }               from '~/core/libs/constants/server-endpoints.const'
import { AuthActions }            from '../actions.auth'
import { IAuthLoginResponse }     from '../types.auth'


export function* handleRegisterUser(action: ReturnType<typeof AuthActions.registerUser_request>) {

  try {
    const response: IResponse<IAuthLoginResponse> = 
      yield call(restRequest, 
                 API_AUTH.USER_REGISTER(), 
                 'POST', 
                 action.payload)

    if (response.meta.ok) {

      yield put(AuthActions.registerUser_success({
        meta: {
          server_status: "finished",
          server_action: action.meta.do,
          server_message: ''
        },
        credentials: {
          is_logged_in: false
        }
      }))
      
    } else {
      yield put(AuthActions.registerUser_failed({ 
        server_status: 'error', 
        server_action: action.meta.do,
        server_message: response.meta.status_text 
      }))
    }
  }
  catch (ex) {

    if (ex instanceof Error) 
      yield put(AuthActions.registerUser_failed({ 
        server_status: 'error',
        server_action: action.meta.do, 
        server_message: ex.stack 
      }))

    else 
      yield put(AuthActions.registerUser_failed({ 
        server_status: 'error', 
        server_action: action.meta.do,
        server_message: 'UNKNOWN' 
      }))
    
  }

}

export function *authRegisterUserSaga() {
  yield takeEvery(getType(AuthActions.registerUser_request), handleRegisterUser)
}