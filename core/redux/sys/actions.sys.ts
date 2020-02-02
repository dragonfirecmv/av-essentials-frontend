import { createAction, action } from 'typesafe-actions'
import { ModalType, ISysStateToastMessage, ISysStateToastMessagePayload } from './types.sys'


export const SysActions = {
  modal_open:         createAction('@sys/MODAL_OPEN',         action => (payload: ModalType) => action(payload)),
  modal_close:        createAction('@sys/MODAL_CLOSE',        action => ()                   => action()),
      
  toast_create:       createAction('@sys/TOAST_CREATE',       action => (payload: ISysStateToastMessagePayload) => action(payload)),
  toast_alterhistory: createAction('@sys/TOAST_ALTERHISTORY', action => (payload: ISysStateToastMessage[]) => action(payload)),

}