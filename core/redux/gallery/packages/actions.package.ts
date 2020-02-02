import { createAction } from 'typesafe-actions'
import { IStateBaseMetadata } from '../types.gallery'
import { 
  IPackageStateListing 
} from './types.package'


export const GalleryPackageActions = {
  listAll_request:          createAction('@gallery/PACKAGE__LISTALL_REQUEST',           action => ()                              => action({},      { do: 'gallery-package-get_list_all' })),
  listAll_success:          createAction('@gallery/PACKAGE__LISTALL_SUCCESS',           action => (payload: IPackageStateListing) => action(payload, { do: 'gallery-package-get_list_all' })),
  listAll_failed:           createAction('@gallery/PACKAGE__LISTALL_FAILED',            action => (payload: IStateBaseMetadata)   => action(payload, { do: 'gallery-package-get_list_all' })),

  getFromId_request:        createAction('@gallery/PACKAGE__GETFROMID_REQUEST',         action => (payload: IGoodsGetFromIdPayload) => action(payload, { do: 'gallery-package-get_from_id' })),
  getFromId_success:        createAction('@gallery/PACKAGE__GETFROMID_SUCCESS',         action => (payload: IGoodsStateSelected)    => action(payload, { do: 'gallery-package-get_from_id' })),
  getFromId_failed:         createAction('@gallery/PACKAGE__GETFROMID_FAILED',          action => (payload: IStateBaseMetadata)     => action(payload, { do: 'gallery-package-get_from_id' })),

  getFromVendorId_request:  createAction('@gallery/PACKAGE__GETFROMVENDORID_REQUEST',   action => (payload: IGoodsGetFromIdPayload) => action(payload, { do: 'gallery-package-get_from_vendor_id' })),
  getFromVendorId_success:  createAction('@gallery/PACKAGE__GETFROMVENDORID_SUCCESS',   action => (payload: IGoodsStateSelected)    => action(payload, { do: 'gallery-package-get_from_vendor_id' })),
  getFromVendorId_failed:   createAction('@gallery/PACKAGE__GETFROMVENDORID_FAILED',    action => (payload: IStateBaseMetadata)     => action(payload, { do: 'gallery-package-get_from_vendor_id' })),

  getFromPackageId_request: createAction('@gallery/PACKAGE__GETFROMPACKAGEID_REQUEST',  action => (payload: IGoodsGetFromIdPayload) => action(payload, { do: 'gallery-package-get_from_package_id' })),
  getFromPackageId_success: createAction('@gallery/PACKAGE__GETFROMPACKAGEID_SUCCESS',  action => (payload: IGoodsStateSelected)    => action(payload, { do: 'gallery-package-get_from_package_id' })),
  getFromPackageId_failed:  createAction('@gallery/PACKAGE__GETFROMPACKAGEID_FAILED',   action => (payload: IStateBaseMetadata)     => action(payload, { do: 'gallery-package-get_from_package_id' })),
}