import { combineReducers } from 'redux'
import { IAuthState, authReducer } from './auth'
import { IGalleryState, galleryRootReducer } from './gallery'
import { ISysState, sysReducer } from './sys'
import { IShopCartState, shopCartReducer } from './shop-cart'


export interface IAppState {
  auth: IAuthState
  gallery: IGalleryState
  sys: ISysState
  shopcart: IShopCartState
}

export const rootReducer = combineReducers({
  auth: authReducer,
  gallery: galleryRootReducer,
  sys: sysReducer,
  shopcart: shopCartReducer
})