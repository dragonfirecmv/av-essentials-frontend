import { ConnectionStatus } from "~/core/libs/types/global-status.type";


export interface ISysState {
  locale: string
  status: ISysStateStatus
  modal: ISysStateModal
  toast: ISysStateToast
  theme: ISysStateTheme
}

export interface ISysStateTheme {
  skin: ThemeSkin
}

export interface ISysStateToast {
  history: ISysStateToastMessage[]
  current?: ISysStateToastMessage
  timeout_in_ms: number
}

export interface ISysStateToastMessagePayload {
  title: string
  content: string
  type: ToastType
}

export interface ISysStateToastMessage {
  id: string
  timestamp: number
  title: string
  content: string
  type: ToastType
}

export interface ISysStateModal {
  show: ModalType
  meta?: any
}

export interface ISysStateStatus {
  app_status: 'normal' | 'paused'
  network_connection: ConnectionStatus
}


export type ThemeSkin = 
    'light'
  | 'dark'

export type ToastType = 
  'none'
  | 'info'
  | 'warning'
  | 'error'
  | 'success'

export type ModalType = 
  'none'
  | 'add_to_cart'
  | 'categories_selector'
  | 'login'
  | 'register'