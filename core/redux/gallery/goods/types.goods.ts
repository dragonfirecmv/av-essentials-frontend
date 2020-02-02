import { ICategoryResponse } from "../categories/types.category";
import { IMedia, IStateBaseMetadata } from "../types.gallery";
import { IVendorResponse } from "../vendors";
import { IPackageResponse } from "../packages/types.package";


// Interface :: Payloads and Response

export interface IGoodsGetFromIdPayload {
  id: string
}

export interface IGoodsPayload {
  packaged_in?: IPackageResponse[];
  category: ICategoryResponse;
  main_label: string;
  description: string;
  goods_type: IGoodsType;
  only_buy_with_packet: boolean;
  price: string;
  additional_info?: any;
  min_order_price: string
  min_order_details: string
  media: IMedia[];
}

export interface IGoodsResponse extends IGoodsPayload {
  id: string;
  owned_by: IVendorResponse;
}

export interface IGoodsType {
  id: string;
  name: string;
}


// Interface :: States

export interface IGoodsState {
  listing: IGoodsStateListing
  selected: IGoodsStateSelected
}

export interface IGoodsStateListing {
  meta: IStateBaseMetadata
  goods_list?: IGoodsResponse[]
}

export interface IGoodsStateSelected{
  meta: IStateBaseMetadata
  goods_info?: IGoodsResponse
}