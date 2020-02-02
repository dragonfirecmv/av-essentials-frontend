//#region Imports
import { h } from 'preact'
import { useEffect, useState, useCallback } from 'preact/hooks'
import { useSelector, useDispatch } from 'react-redux';
import './_login.scss'
import { AVInput, AVButton, AVLink } from '~/components/controls'
import { CommonOrnament1, LightBrandLogo } from '~/static/img'
import { IAppState } from '~/core/redux';
import { AuthActions } from '~/core/redux/auth';
import { SysActions } from '~/core/redux/sys';
//#endregion


export const LoginPage = () => {

  const rootState = useSelector((state: IAppState) => state)
  const dispatch = useDispatch()

  const [isLoading, setIsLoading] = useState(false)
  const [inputEmail, setInputEmail] = useState('')
  const [inputPassword, setInputPassword] = useState('')


  useEffect(() => {
    setIsLoading(rootState.auth.meta.server_status === 'loading')

    if (rootState.auth.credentials.is_logged_in)
      window.location.href = '/'
  }, [rootState])

  const _onLoginClick = () => {

    if (!inputEmail || !inputPassword) {
      dispatch(SysActions.toast_create({
        title: 'Authentication',
        content: "Please complete your registration form first.",
        type: 'warning'
      }))
      return
    }
    else {

      const isEmailCorrect = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/.test(inputEmail)
  
      if (!isEmailCorrect) {
        dispatch(SysActions.toast_create({
          title: 'Authentication',
          content: "Your email is invalid, please retype it again.",
          type: 'warning'
        }))
      }
  
      else if (inputEmail && inputPassword) {
        dispatch(SysActions.toast_create({
          title: 'Authentication',
          content: "Registering user...",
          type: 'info'
        }))
        dispatch(AuthActions.loginUser_request({
          email: inputEmail, password: inputPassword
        }))
        return
      }
    }
  }

  return (
    <div class='login-page' data-theme="light">
  
      <AVLink link="/">
        <img class="brand-logo" src={LightBrandLogo} alt="Brand"/>
      </AVLink>
  
      <div class="panel-main">
        <div class="section main">
          <div class="tx panel-title">Halo</div>
          <div class="tx panel-subtitle">Silakan masuk ke akun anda.</div>
  
          <div class="enclosure-input">
            <AVInput 
              id="email" 
              type="email" 
              label="Email address" 
              onChange={e => setInputEmail(e.target.value)}/>
          </div>
          <div class="enclosure-input">
            <AVInput 
              id="password" 
              type="password" 
              label="Password" 
              onChange={e => setInputPassword(e.target.value)}/>
          </div>
  
          <div class="enclosure-action">
            <AVButton 
              loadingMode={isLoading}
              size="large" 
              onClick={_onLoginClick}>
              LOGIN
          </AVButton>
          </div>
  
          <div class="enclosure-action">
            <div class="tx par">
              Belum punya akun? <AVLink link="/auth/register" color="primary">Daftar</AVLink>
            </div>
          </div>
  
        </div>
        <div class="section ornament">
          <img src={CommonOrnament1} alt="Ornament"/>
        </div>
      </div>
    </div>
  )
}