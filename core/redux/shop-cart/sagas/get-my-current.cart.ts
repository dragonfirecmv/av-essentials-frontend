import { call, put, takeEvery, select } from 'redux-saga/effects'
import { getType }                      from 'typesafe-actions'
import { IResponse, restRequest }       from '~/core/libs/apis/rest.api'
import { API_SHOPCART }                 from '~/core/libs/constants/server-endpoints.const'
import { ShopCartActions }              from '../actions.shop-cart'
import { IAppState }                    from '../../root-reducer'
import { IShopCartResponse }            from '../types.shop-cart'


export function *handleGetMyCurrentShopCart
  (action: ReturnType<typeof ShopCartActions.getMyCurrentShopCart_request>) {

  try {
    const allState: IAppState = yield select()

    const response: IResponse<IShopCartResponse> =
      yield call(restRequest,
                 API_SHOPCART.GET_MY_BYTOKEN(),
                 'GET', 
                 {},
                 { 'Authorization': `Bearer ${allState.auth.credentials.token_access}` })
      
    if (response.meta.ok) {
      yield put(ShopCartActions.getMyCurrentShopCart_success({
        meta: {
          server_status: 'finished',
          server_action: action.meta.do,
          server_message: ''
        },
        cart_list: response.payload
      }))
    }
    else {
      yield put(ShopCartActions.getMyCurrentShopCart_failed({ 
        server_status: 'error', 
        server_action: action.meta.do,
        server_message: response.meta.status_text 
      }))
    }
  }
  catch (ex) {
    if (ex instanceof Error) 
      yield put(ShopCartActions.getMyCurrentShopCart_failed({ 
        server_status: 'error',
        server_action: action.meta.do, 
        server_message: ex.stack 
      }))

    else 
      yield put(ShopCartActions.getMyCurrentShopCart_failed({ 
        server_status: 'error', 
        server_action: action.meta.do,
        server_message: 'UNKNOWN' 
      }))
  }

}

export function *shopCartGetMyCurrent() {
  yield takeEvery(getType(ShopCartActions.getMyCurrentShopCart_request), handleGetMyCurrentShopCart)
}