//#region Imports
import { h, Fragment as F } from 'preact'
import { useEffect, useState, useCallback } from 'preact/hooks'
import { useSelector, useDispatch } from 'react-redux';
import './_toastDefault.scss'
import { AVButton } from '~/components/controls';
import { ToastType, ISysStateToastMessage } from '~/core/redux/sys';
//#endregion


export const ToastDefaultView = (props: IProps) => {

  return (
    <div className="view-toast-default">
      <div className={`area indicator i-${props.type}`}/>
      <div className="area icon">

      </div>
      <div className="area info">
        <div className="tx toast-title">{props.title}</div>
        <div className="tx toast-msg">{props.message}</div>
      </div>
      <div className="area close">
        <AVButton 
          btnStyle="borderless" 
          size="conform" 
          onClick={() => props.onCloseButtonClick && props.onCloseButtonClick(props.meta)}>
          <div className="tx btn-close">&times;</div>
        </AVButton>
      </div>
    </div>
  )
}

interface IProps {
  meta: ISysStateToastMessage
  title: string
  message: string
  type: ToastType

  onCloseButtonClick?(meta: ISysStateToastMessage): void
}