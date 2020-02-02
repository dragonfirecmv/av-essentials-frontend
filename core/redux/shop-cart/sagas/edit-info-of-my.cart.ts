import { call, put, takeEvery, select } from 'redux-saga/effects'
import { getType }                      from 'typesafe-actions'
import { IResponse, restRequest }       from '~/core/libs/apis/rest.api'
import { API_SHOPCART }                 from '~/core/libs/constants/server-endpoints.const'
import { ShopCartActions }              from '../actions.shop-cart'
import { IAppState }                    from '../../root-reducer'
import { IShopCartResponse }            from '../types.shop-cart'


export function *handleEditInfoOfMyCurrentShopCart
  (action: ReturnType<typeof ShopCartActions.editMyCurrentCartInfoShopCart_request>) {

  try {
    const allState: IAppState = yield select()

    const response: IResponse<IShopCartResponse> =
      yield call(restRequest,
                 API_SHOPCART.PUT_EDITCARTINFO(),
                 'PUT', 
                 action.payload,
                 { 'Authorization': `Bearer ${allState.auth.credentials.token_access}` })
      
    if (response.meta.ok) {
      yield put(ShopCartActions.editMyCurrentCartInfoShopCart_success({
        meta: {
          server_status: 'finished',
          server_action: action.meta.do,
          server_message: ''
        }
      }))
    }
    else {
      yield put(ShopCartActions.editMyCurrentCartInfoShopCart_failed({ 
        server_status: 'error', 
        server_action: action.meta.do,
        server_message: response.meta.status_text 
      }))
    }
  }
  catch (ex) {
    if (ex instanceof Error) 
      yield put(ShopCartActions.editMyCurrentCartInfoShopCart_failed({ 
        server_status: 'error',
        server_action: action.meta.do, 
        server_message: ex.stack 
      }))

    else 
      yield put(ShopCartActions.editMyCurrentCartInfoShopCart_failed({ 
        server_status: 'error', 
        server_action: action.meta.do,
        server_message: 'UNKNOWN' 
      }))
  }

}

export function *shopCartEditInfoOfMyCurrent() {
  yield takeEvery(getType(ShopCartActions.editMyCurrentCartInfoShopCart_request), handleEditInfoOfMyCurrentShopCart)
}