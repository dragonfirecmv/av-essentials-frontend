//#region Imports
import { h, Fragment as F } from 'preact'
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useHistory } from 'react-router'
import './_menubarMobile.scss'
import { AVContainer, AVButton, AVLink } from '~/components/controls'
import { LightBrandLogoOnly } from '~/static/img'
import { SysActions } from '~/core/redux/sys';
import { IAppState } from '~/core/redux';
import { IAuthState } from '~/core/redux/auth';
//#endregion


export const MenubarMobileView = () => {

  const history = useHistory()
  const dispatch = useDispatch()
  const authState = useSelector<IAppState, IAuthState>(state => state.auth)

  return (
    <div class="view-menubar-mobile">
      <AVContainer sizingType="TKPDA">
        <div class="enclosing-menubar">

          <div class="enclosure-brand">
            <AVLink link="/">
              <img src={LightBrandLogoOnly} alt="Brand" />
            </AVLink>
          </div>

          <div class="enclosure-left">
            <AVButton btnStyle="borderless" onClick={() => dispatch(SysActions.modal_open('categories_selector'))}>KATEGORI</AVButton>
          </div>

          {
            !authState?.credentials?.is_logged_in
              ? (
                <div class="enclosure-right">
                  <AVButton btnStyle="borderless" onClick={() => history.push('/auth/login')}>MASUK</AVButton>
                  <AVButton btnStyle="secondary" onClick={() => history.push('/auth/register')}>DAFTAR</AVButton>
                </div>
              )
              : (
                <div class="enclosure-right">
                  <AVButton btnStyle="borderless" onClick={() => history.push('/my-cart')}>MY CART</AVButton>
                  <AVButton btnStyle="borderless" onClick={() => history.push('/auth/logout')}>LOG OUT</AVButton>
                </div>
              )
          }

        </div>

      </AVContainer>
    </div>
  )
}