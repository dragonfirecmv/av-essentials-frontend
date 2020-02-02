import { createReducer } from 'typesafe-actions'
import { IShopCartState } from './types.shop-cart'
import { ShopCartActionType, ShopCartActions as SCA } from './actions.shop-cart'


export const shopCartInitState: IShopCartState = {
  my_cart: {
    meta: {
      server_status: 'idle',
      server_action: 'none'
    }
  },
  selection: {
    meta: {
      server_status: 'idle',
      server_action: 'none'
    }
  }
}

export const shopCartReducer = createReducer<IShopCartState, ShopCartActionType>(shopCartInitState)
  //#region add to cart item preview direct
  .handleAction(SCA.addToCartDirect_forGoods, 
                (state, { payload }) => ({ ...state, 
                                            selection: {
                                              meta: {
                                                server_status: 'finished',
                                                server_action: 'add2cart-direct-goods'
                                              },
                                              type: 'goods',
                                              selected_item: {
                                                goods_item: payload
                                              }
                                            }}))
  .handleAction(SCA.addToCartDirect_forPkg, 
                (state, { payload }) => ({ ...state, 
                                            selection: {
                                              meta: {
                                                server_status: 'finished',
                                                server_action: 'add2cart-direct-pkg'
                                              },
                                              type: 'package',
                                              selected_item: {
                                                pkg_item: payload
                                              }
                                            }}))
  //#endregion

  //#region Add item to cart SERVER
  .handleAction(SCA.addItemToMyShopCart_request, 
                (state, { meta }) => ({ ...state, 
                                        selection: { 
                                          ...state.selection, 
                                          meta: { 
                                            ...state.selection.meta, 
                                            server_status: 'loading',
                                            server_action: meta.do 
                                          } } }))

  .handleAction(SCA.addItemToMyShopCart_success, 
    (state, { payload }) => ({ ...state, 
                                selection: payload }))

  .handleAction(SCA.addItemToMyShopCart_failed, 
    (state, { payload }) => ({ ...state, 
                                selection: {
                                  meta: payload
                                } }))
  //#endregion

  //#region Get MY CURRENT Cart
  .handleAction(SCA.getMyCurrentShopCart_request, 
    (state, { meta }) => ({ ...state, 
                              my_cart: { 
                              meta: { 
                                ...state.selection.meta, 
                                server_status: 'loading',
                                server_action: meta.do 
                              } } }))

  .handleAction(SCA.getMyCurrentShopCart_success, 
  (state, { payload }) => ({ ...state, 
                              my_cart: payload }))

  .handleAction(SCA.getMyCurrentShopCart_failed, 
  (state, { payload }) => ({ ...state, 
                              my_cart: {
                                meta: payload
                              } }))
  //#endregion

  //#region Checkout MY CURRENT Cart
  .handleAction(SCA.checkoutMyShopCart_request, 
    (state, { meta }) => ({ ...state, 
                              my_cart: { 
                              meta: { 
                                ...state.selection.meta, 
                                server_status: 'loading',
                                server_action: meta.do 
                              } } }))

  .handleAction(SCA.checkoutMyShopCart_success, 
  (state, { payload }) => ({ ...state, 
                              my_cart: payload }))

  .handleAction(SCA.checkoutMyShopCart_failed, 
  (state, { payload }) => ({ ...state, 
                              my_cart: {
                                meta: payload
                              } }))
  //#endregion

  //#region Edit MY CURRENT cart infos
  .handleAction(SCA.editMyCurrentCartInfoShopCart_request, 
    (state, { meta }) => ({ ...state, 
                              my_cart: { 
                              meta: { 
                                ...state.selection.meta, 
                                server_status: 'loading',
                                server_action: meta.do 
                              } } }))

  .handleAction(SCA.editMyCurrentCartInfoShopCart_success, 
  (state, { payload }) => ({ ...state, 
                              my_cart: payload }))

  .handleAction(SCA.editMyCurrentCartInfoShopCart_failed, 
  (state, { payload }) => ({ ...state, 
                              my_cart: {
                                meta: payload
                              } }))
  //#endregion