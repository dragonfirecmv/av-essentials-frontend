import { createReducer } from 'typesafe-actions'
import { IVendorState } from './types.vendor'
import { GalleryVendorActions as GVA } from './actions.vendor'


export const galleryVendorInitState: IVendorState = {
  listing: {
    meta: {
      server_status: "idle",
      server_action: 'none'
    }
  },
  selected: {
    meta: {
      server_status: 'idle',
      server_action: 'none'
    }
  }
}

export const galleryVendorReducer = createReducer<IVendorState>(galleryVendorInitState)
  .handleAction(GVA.listAll_request,     (state, { meta })    => ({ ...state, listing: { meta: { server_status: 'loading', server_action: meta.do } } }))
  .handleAction(GVA.listAll_failed,      (state, { payload }) => ({ ...state, listing: { meta: payload } }))
  .handleAction(GVA.listAll_success,     (state, { payload }) => ({ ...state, listing: payload }))

  .handleAction(GVA.listAll_request,     (state, { meta })    => ({ ...state, listing: { meta: { server_status: 'loading', server_action: meta.do } } }))
  .handleAction(GVA.listAll_failed,      (state, { payload }) => ({ ...state, listing: { meta: payload } }))
  .handleAction(GVA.listAll_success,     (state, { payload }) => ({ ...state, listing: payload }))
  
  .handleAction(GVA.getFromSlug_request, (state, { meta })    => ({ ...state, selected: { meta: { server_status: 'loading', server_action: meta.do } }}))
  .handleAction(GVA.getFromSlug_failed,  (state, { payload }) => ({ ...state, selected: { meta: payload } }))
  .handleAction(GVA.getFromSlug_success, (state, { payload }) => ({ ...state, selected: payload }))

  .handleAction(GVA.reset_listing,       (state)              => ({ ...state, listing: galleryVendorInitState.listing }))
  .handleAction(GVA.reset_selected,      (state)              => ({ ...state, selected: galleryVendorInitState.selected }))
