import { createReducer } from 'typesafe-actions'
import { GalleryCategoryActions as GCA, GalleryCategoryActionsType } from './actions.category'
import { ICategoryState } from './types.category'


export const galleryCategoryInitState: ICategoryState = {
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

export const galleryCategoryReducer = createReducer<ICategoryState, GalleryCategoryActionsType>(galleryCategoryInitState)
  .handleAction(GCA.listAll_request,     (state, { meta })    => ({ ...state, listing: { meta: { server_status: 'loading', server_action: meta.do } } }))
  .handleAction(GCA.listAll_failed,      (state, { payload }) => ({ ...state, listing: { meta: payload } }))
  .handleAction(GCA.listAll_success,     (state, { payload }) => ({ ...state, listing: payload }))