import { loadState, saveState } from '~/core/libs/services/localstorage'
import { IAppState, configureStore } from '../redux'
import { 
  authInitialState, 
  IAuthStateCredentials, 
  IAuthStateUserInformation 
} from '../redux/auth'
import { galleryInitState } from '../redux/gallery'
import { sysInitialState } from '../redux/sys'
import { shopCartInitState } from '../redux/shop-cart'


export interface ILocalStorageState {
  credentials: IAuthStateCredentials
  user_info: IAuthStateUserInformation
}

const savedLocalState = loadState<ILocalStorageState>()

export const initState: IAppState = {
  auth: {
    ...authInitialState,
    credentials: {
      ...authInitialState.credentials,
      ...savedLocalState?.credentials
    },
    user_info: savedLocalState?.user_info
  },
  gallery: {
    ...galleryInitState
  }, 
  sys: {
    ...sysInitialState
  },
  shopcart: {
    ...shopCartInitState
  }
}

const globalStore = configureStore(initState)

globalStore.subscribe(() => {

  const currentState: ILocalStorageState = {
    credentials: globalStore.getState()?.auth?.credentials,
    user_info: globalStore.getState()?.auth?.user_info
  }

  if (savedLocalState !== currentState)
    saveState(currentState)
  
})

export { globalStore }