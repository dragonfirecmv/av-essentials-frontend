import { createReducer } from 'typesafe-actions'
import { SysActions as SA } from './actions.sys'
import { ISysState } from './types.sys'
import { randRange } from '~/core/libs/tools/generators'


export const sysInitialState: ISysState = {
  locale: 'en',
  modal: {
    show: 'none'
  },
  toast: {
    timeout_in_ms: 3000,
    history: []
  },
  status: {
    app_status: "normal",
    network_connection: "connected"
  },
  theme: {
    skin: 'light'
  }
}

export const sysReducer = createReducer<ISysState>(sysInitialState)
  .handleAction(SA.modal_open,          (state, { payload }) => ({ ...state, modal: { show: payload } }))
  .handleAction(SA.modal_close,         (state, { payload }) => ({ ...state, modal: { show: 'none' } }))
  .handleAction(SA.toast_create,        (state, { payload }) => ({ ...state, toast: { ...state.toast, current: { ...payload, timestamp: (new Date().getTime()), id: randRange(10000, 99999).toString() } } }))
  .handleAction(SA.toast_alterhistory,  (state, { payload }) => ({ ...state, toast: { ...state.toast, history: payload } }))
