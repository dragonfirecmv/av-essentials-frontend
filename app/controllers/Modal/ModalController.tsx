//#region Imports
import { h, Fragment as F } from 'preact'
import { useEffect, useState, useCallback } from 'preact/hooks'
import { useSelector, useDispatch } from 'react-redux';
import './_modal.scss'

import { SysActions } from '~/core/redux/sys';
import { AVButton } from '~/components/controls';
import { IAppState } from '~/core/redux';
import { ModalAddToCartView } from '~/components/views/modals';
import { ModalCategorySelectorView } from '~/components/views/modals/CategorySelector/ModalCategorySelectorView';
//#endregion


export const ModalController = () => {

  const dispatch = useDispatch()
  const appState = useSelector<IAppState, IAppState>(state => state)

  let ModalContent = (props) => <F/>

  const onBackgroundClick = (e: MouseEvent) => dispatch(SysActions.modal_close())

  const onContentClick = (e: MouseEvent) => e.stopPropagation()

  const onModalSubmitClick = (e: MouseEvent) => {

  }

  switch (appState.sys.modal.show) {
    case 'add_to_cart':
      ModalContent = ModalAddToCartView
      break;

    case 'categories_selector':
      ModalContent = ModalCategorySelectorView

    default:
      break;
  }

  const cssClass = `
    modal-composition
    ${appState.sys.modal.show === 'none' && 'hide'}
  `

  return (
    <div class={cssClass} onClick={onBackgroundClick} data-theme="light">
      <div class="enclosure-content" onClick={onContentClick}>
        {/* <div class="content-title">
          <div class="enclosing-button">
            <AVButton
              className="button-close"
              onClick={onBackgroundClick}
              size="conform"
              btnStyle="tertiary">
              &times;
            </AVButton>
          </div>
          <div class="tx title">
            Add to cart
          </div>
        </div> */}
        <div class="content">
          <ModalContent/>
        </div>
      </div>
    </div>
  )
}