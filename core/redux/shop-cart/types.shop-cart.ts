import { BaseServerStatus } from "~/core/libs/types/global-status.type";
import { IPackageResponse } from "../gallery/packages";
import { IGoodsResponse } from "../gallery/goods";
import { IOwnedByWho } from "../gallery";


export interface IShopCartAddItemPayload {
  item_from_packages?: IPackageResponse
  item_from_goods?: IGoodsResponse
  buy_configuration?: IBuyConfigShape
  total_price?: number
  additional_notes?: string
  quantity?: number
}

export interface IShopCartItemPayload {
  item_from_packages?: { id: string }
  item_from_goods?: { id: string }
  buy_configuration: object
  total_price: number
  additional_notes: string
}

export interface IShopCartResponse {
  id: string
  time_created: string
  time_last_edited: string
  cart_items: ShopCartItemResponse[]
  checked_out: boolean
  checked_out_date: string
  paid: boolean
  expired: boolean
  owner: IOwnedByWho
}

export interface ShopCartItemResponse {
  id: string
  shop_cart: IShopCartResponse
  item_from_packages?: IPackageResponse
  item_from_goods?: IGoodsResponse
  buy_configuration: IBuyConfigShape
  total_price: number
  quantity: number
  additional_notes: string
}


export interface IShopCartState {
  selection: IShopCartStateSelection
  my_cart: IShopCartStateMyCart
}

export interface IShopCartStateSelection {
  meta: IStateBaseMetadata
  type?: 'package' | 'goods'
  selected_item?: {
    pkg_item?: IPackageResponse
    goods_item?: IGoodsResponse
  }
}

export interface IShopCartStateMyCart {
  meta: IStateBaseMetadata
  cart_list?: IShopCartResponse
}

export interface IStateBaseMetadata {
  server_status: BaseServerStatus
  server_action: string
  server_message?: string
}

export interface IBuyConfigShape {
  dateFrom: string
  dateTo: string
}

export type ItemSelectedType = "packages" | "goods"