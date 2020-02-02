//#region Imports
import { createAction, ActionType } from 'typesafe-actions'
import { IStateBaseMetadata } from '../types.gallery'
import {
  IVendorStateListing,
  IVendorStateSelected,
  IVendorGetFromSlugPayload,
  IVendorCreatePayload,
  IVendorGetFromCategoryIdPayload,
  IVendorGetFromIdPayload
} from './types.vendor'
//#endregion


export const GalleryVendorActions = {
  reset_listing:          createAction('@gallery/VENDOR__RESETLISTING',           action => ()                                          => action()),
  reset_selected:         createAction('@gallery/VENDOR__RESETSELECTED',          action => ()                                          => action()),

  listAll_request:        createAction('@gallery/VENDOR__LISTALL_REQUEST',        action => ()                                          => action({},      { do: 'gallery-vendor-get_list_all' })),
  listAll_success:        createAction('@gallery/VENDOR__LISTALL_SUCCESS',        action => (payload: IVendorStateListing)              => action(payload, { do: 'gallery-vendor-get_list_all' })),
  listAll_failed:         createAction('@gallery/VENDOR__LISTALL_FAILED',         action => (payload: IStateBaseMetadata)               => action(payload, { do: 'gallery-vendor-get_list_all' })),

  getByCategory_request:  createAction('@gallery/VENDOR__GETBYCATEGORY_REQUEST',  action => (payload: IVendorGetFromCategoryIdPayload)  => action(payload, { do: 'gallery-vendor-get_by_category' })),
  getByCategory_success:  createAction('@gallery/VENDOR__GETBYCATEGORY_SUCCESS',  action => (payload: IVendorStateListing)              => action(payload, { do: 'gallery-vendor-get_by_category' })),
  getByCategory_failed:   createAction('@gallery/VENDOR__GETBYCATEGORY_FAILED',   action => (payload: IStateBaseMetadata)               => action(payload, { do: 'gallery-vendor-get_by_category' })),

  getFromSlug_request:    createAction('@gallery/VENDOR__GETFROMSLUG_REQUEST',    action => (payload: IVendorGetFromSlugPayload)        => action(payload, { do: 'gallery-vendor-get_from_slug' })),
  getFromSlug_success:    createAction('@gallery/VENDOR__GETFROMSLUG_SUCCESS',    action => (payload: IVendorStateSelected)             => action(payload, { do: 'gallery-vendor-get_from_slug' })),
  getFromSlug_failed:     createAction('@gallery/VENDOR__GETFROMSLUG_FAILED',     action => (payload: IStateBaseMetadata)               => action(payload, { do: 'gallery-vendor-get_from_slug' })),

  getById_request:        createAction('@gallery/VENDOR__GETBYID_REQUEST',        action => (payload: IVendorGetFromIdPayload)          => action(payload, { do: 'gallery-vendor-get_by_id' })),
  getById_success:        createAction('@gallery/VENDOR__GETBYID_SUCCESS',        action => (payload: IVendorStateSelected)             => action(payload, { do: 'gallery-vendor-get_by_id' })),
  getById_failed:         createAction('@gallery/VENDOR__GETBYID_FAILED',         action => (payload: IStateBaseMetadata)               => action(payload, { do: 'gallery-vendor-get_by_id' })),

}

export type GalleryVendorActionType = ActionType<typeof GalleryVendorActions>