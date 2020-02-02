import { createAction } from 'typesafe-actions'
import { IStateBaseMetadata } from '../types.gallery'
import { 
  IGoodsStateListing, IGoodsGetFromIdPayload, IGoodsStateSelected 
} from './types.goods'


export const GalleryGoodsActions = {
  listAll_request:          createAction('@gallery/GOODS__LISTALL_REQUEST',           action => ()                                => action({},      { do: 'gallery-goods-get_list_all' })),
  listAll_success:          createAction('@gallery/GOODS__LISTALL_SUCCESS',           action => (payload: IGoodsStateListing)     => action(payload, { do: 'gallery-goods-get_list_all' })),
  listAll_failed:           createAction('@gallery/GOODS__LISTALL_FAILED',            action => (payload: IStateBaseMetadata)     => action(payload, { do: 'gallery-goods-get_list_all' })),

  getFromId_request:        createAction('@gallery/GOODS__GETFROMID_REQUEST',         action => (payload: IGoodsGetFromIdPayload) => action(payload, { do: 'gallery-goods-get_from_id' })),
  getFromId_success:        createAction('@gallery/GOODS__GETFROMID_SUCCESS',         action => (payload: IGoodsStateSelected)    => action(payload, { do: 'gallery-goods-get_from_id' })),
  getFromId_failed:         createAction('@gallery/GOODS__GETFROMID_FAILED',          action => (payload: IStateBaseMetadata)     => action(payload, { do: 'gallery-goods-get_from_id' })),

  getFromVendorId_request:  createAction('@gallery/GOODS__GETFROMVENDORID_REQUEST',   action => (payload: IGoodsGetFromIdPayload) => action(payload, { do: 'gallery-goods-get_from_vendor_id' })),
  getFromVendorId_success:  createAction('@gallery/GOODS__GETFROMVENDORID_SUCCESS',   action => (payload: IGoodsStateSelected)    => action(payload, { do: 'gallery-goods-get_from_vendor_id' })),
  getFromVendorId_failed:   createAction('@gallery/GOODS__GETFROMVENDORID_FAILED',    action => (payload: IStateBaseMetadata)     => action(payload, { do: 'gallery-goods-get_from_vendor_id' })),

  getFromPackageId_request: createAction('@gallery/GOODS__GETFROMPACKAGEID_REQUEST',  action => (payload: IGoodsGetFromIdPayload) => action(payload, { do: 'gallery-goods-get_from_package_id' })),
  getFromPackageId_success: createAction('@gallery/GOODS__GETFROMPACKAGEID_SUCCESS',  action => (payload: IGoodsStateSelected)    => action(payload, { do: 'gallery-goods-get_from_package_id' })),
  getFromPackageId_failed:  createAction('@gallery/GOODS__GETFROMPACKAGEID_FAILED',   action => (payload: IStateBaseMetadata)     => action(payload, { do: 'gallery-goods-get_from_package_id' })),
}