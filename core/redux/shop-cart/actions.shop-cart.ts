
import { createAction, ActionType } from 'typesafe-actions'
import { IGoodsResponse } from '../gallery/goods'
import { IPackageResponse } from '../gallery/packages'
import { IShopCartAddItemPayload, IStateBaseMetadata, IShopCartStateSelection, IShopCartStateMyCart } from './types.shop-cart'


export const ShopCartActions = {
  addToCartDirect_forGoods:     createAction('@SHOPCART/ADDTOCART_FORGOODS',                          action => (payload: IGoodsResponse)   => action(payload)),
  addToCartDirect_forPkg:       createAction('@SHOPCART/ADDTOCART_FORPKG',                            action => (payload: IPackageResponse) => action(payload)),

  addItemToMyShopCart_request:  createAction('@auth/ADDITEMTOMYSHOPCART_REQUEST',                     action => (payload: IShopCartAddItemPayload)  => action(payload, { do: 'add-item-to-my-shop-cart' })),
  addItemToMyShopCart_success:  createAction('@auth/ADDITEMTOMYSHOPCART_SUCCESS',                     action => (payload: IShopCartStateSelection)  => action(payload, { do: 'add-item-to-my-shop-cart' })),
  addItemToMyShopCart_failed:   createAction('@auth/ADDITEMTOMYSHOPCART_FAILED',                      action => (payload: IStateBaseMetadata)       => action(payload, { do: 'add-item-to-my-shop-cart' })),

  getMyCurrentShopCart_request:  createAction('@auth/GETMYCURRENTSHOPCART_REQUEST',                   action => ()                                => action({},      { do: 'get-my-current-shop-cart' })),
  getMyCurrentShopCart_success:  createAction('@auth/GETMYCURRENTSHOPCART_SUCCESS',                   action => (payload: IShopCartStateMyCart)   => action(payload, { do: 'get-my-current-shop-cart' })),
  getMyCurrentShopCart_failed:   createAction('@auth/GETMYCURRENTSHOPCART_FAILED',                    action => (payload: IStateBaseMetadata)     => action(payload, { do: 'get-my-current-shop-cart' })),

  checkoutMyShopCart_request:  createAction('@auth/CHECKOUTMYSHOPCART_REQUEST',                       action => ()                                => action({},      { do: 'checkout-my-current-shop-cart' })),
  checkoutMyShopCart_success:  createAction('@auth/CHECKOUTMYSHOPCART_SUCCESS',                       action => (payload: IShopCartStateMyCart)   => action(payload, { do: 'checkout-my-current-shop-cart' })),
  checkoutMyShopCart_failed:   createAction('@auth/CHECKOUTMYSHOPCART_FAILED',                        action => (payload: IStateBaseMetadata)     => action(payload, { do: 'checkout-my-current-shop-cart' })),

  editMyCurrentCartInfoShopCart_request:  createAction('@auth/EDITMYCURRENTCARTINFOSHOPCART_REQUEST', action => (payload: object)                 => action(payload, { do: 'edit-my-current-cart-info-shop-cart' })),
  editMyCurrentCartInfoShopCart_success:  createAction('@auth/EDITMYCURRENTCARTINFOSHOPCART_SUCCESS', action => (payload: IShopCartStateMyCart)   => action(payload, { do: 'edit-my-current-cart-info-shop-cart' })),
  editMyCurrentCartInfoShopCart_failed:   createAction('@auth/EDITMYCURRENTCARTINFOSHOPCART_FAILED',  action => (payload: IStateBaseMetadata)     => action(payload, { do: 'edit-my-current-cart-info-shop-cart' }))

}

export type ShopCartActionType = ActionType<typeof ShopCartActions>