//#region Imports
import { h, Fragment as F } from 'preact'
import { useEffect, useState, useCallback } from 'preact/hooks'
import { useSelector, useDispatch } from 'react-redux';
import './_toast.scss'

import { SysActions, ISysStateToastMessage } from '~/core/redux/sys';
import { AVButton } from '~/components/controls';
import { IAppState } from '~/core/redux';
import { ToastDefaultView } from '~/components/views/toast';
//#endregion


export const ToastController = () => {

  const dispatch = useDispatch()
  const appState = useSelector<IAppState, IAppState>(state => state)

  const [toastHistory, setToastHistory] = useState([] as ISysStateToastMessage[])

  useEffect(() => {

    const { current, history } = appState.sys.toast

    if (current) {
      const newToastHistory = [...history, current]

      if (newToastHistory.length > 4)
        newToastHistory.shift()

      dispatch(SysActions.toast_alterhistory([...newToastHistory]))
    }

  }, [appState.sys.toast.current])

  useEffect(() => {
    const { history: toastH, timeout_in_ms } = appState.sys.toast

    setToastHistory(toastH)

    let watchToast 

    if (toastH) {
      watchToast = setInterval(() => {

        toastH.forEach(toast => {
          if ((toast.timestamp + timeout_in_ms) < (new Date().getTime()))
            _handleToastClose(toast)
        })
  
      }, 500)
    }

    return () => {
      watchToast && clearInterval(watchToast)
    }

  }, [appState.sys.toast.history])

  const _handleToastClose = (meta: ISysStateToastMessage) => {
    const newToastH = appState.sys.toast.history.filter(toast => toast.id !== meta.id)

    dispatch(SysActions.toast_alterhistory([...newToastH]))
  }

  return (
    <div className="toast-composition" data-theme="light">
      <div className="enclosure-toasts">
        {
          (toastHistory.length > 0) ? toastHistory?.map(toast => (
            <div className="enclose-indiv">
              <ToastDefaultView
                meta={toast || null}
                title={toast?.title}
                message={toast?.content}
                type={toast?.type}

                onCloseButtonClick={_handleToastClose}
              />
            </div>
          )) : <div></div>
        }

      </div>
    </div>
  )

}