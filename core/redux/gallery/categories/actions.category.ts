import { createAction, ActionType } from 'typesafe-actions'
import { ICategoryStateListing } from './types.category'
import { IStateBaseMetadata } from '../types.gallery'


export const GalleryCategoryActions = {
  listAll_request:   createAction('@gallery/CATEGORY__LISTALL_REQUEST',   action => ()                                => action({},      { do: 'gallery-category-get_list_all' })),
  listAll_success:   createAction('@gallery/CATEGORY__LISTALL_SUCCESS',   action => (payload: ICategoryStateListing)  => action(payload, { do: 'gallery-category-get_list_all' })),
  listAll_failed:    createAction('@gallery/CATEGORY__LISTALL_ERROR',     action => (payload: IStateBaseMetadata)     => action(payload, { do: 'gallery-category-get_list_all' })),

  getBySlug_request: createAction('@gallery/CATEGORY__GETBYSLUG_REQUEST', action => ()                                => action({},      { do: 'gallery-category-get_by_slug' })),
  getBySlug_success: createAction('@gallery/CATEGORY__GETBYSLUG_SUCCESS', action => (payload: ICategoryStateListing)  => action(payload, { do: 'gallery-category-get_by_slug' })),
  getBySlug_failed:  createAction('@gallery/CATEGORY__GETBYSLUG_ERROR',   action => (payload: IStateBaseMetadata)     => action(payload, { do: 'gallery-category-get_by_slug' })),

  getById_request:   createAction('@gallery/CATEGORY__GETBYID_REQUEST',   action => ()                                => action({},      { do: 'gallery-category-get_by_id' })),
  getById_success:   createAction('@gallery/CATEGORY__GETBYID_SUCCESS',   action => (payload: ICategoryStateListing)  => action(payload, { do: 'gallery-category-get_by_id' })),
  getById_failed:    createAction('@gallery/CATEGORY__GETBYID_ERROR',     action => (payload: IStateBaseMetadata)     => action(payload, { do: 'gallery-category-get_by_id' })),
  
}

export type GalleryCategoryActionsType = ActionType<typeof GalleryCategoryActions>