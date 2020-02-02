import { createReducer } from 'typesafe-actions'
import { IPackageState } from './types.package'
import { GalleryPackageActions as GPaA } from './actions.package'

export const galleryPackageInitState: IPackageState = {
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

export const galleryPackageReducer = createReducer<IPackageState>(galleryPackageInitState)
  .handleAction(GPaA.listAll_request, (state, { meta })    => ({ ...state, listing: { meta: { server_status: 'loading', server_action: meta.do } } }))
  .handleAction(GPaA.listAll_failed,  (state, { payload }) => ({ ...state, listing: { meta: payload } }))
  .handleAction(GPaA.listAll_success, (state, { payload }) => ({ ...state, listing: payload }))

