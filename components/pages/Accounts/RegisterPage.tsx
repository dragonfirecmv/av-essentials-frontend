//#region Imports
import { h } from 'preact'
import { useEffect, useState, useCallback } from 'preact/hooks'
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router'
import './_register.scss'
import { AVInput, AVButton, AVLink } from '~/components/controls'
import { CommonOrnament1, LightBrandLogo } from '~/static/img'
import { IAppState } from '~/core/redux';
import { AuthActions } from '~/core/redux/auth';
import { SysActions } from '~/core/redux/sys';
//#endregion


export const RegisterPage = () => {

  const history = useHistory()
  const dispatch = useDispatch()
  const rootState = useSelector((state: IAppState) => state)

  const [isLoading, setIsLoading] = useState(false)
  const [inputGivenname, setInputGivenname] = useState('')
  const [inputEmail, setInputEmail] = useState('')
  const [inputPassword, setInputPassword] = useState('')

  useEffect(() => {
    const { server_action, server_status } = rootState.auth.meta

    if (server_action === 'auth-register') {
      if (server_status === 'finished') {

        dispatch(SysActions.toast_create({
          title: 'Authentication',
          content: "You're registered! Now you can login.",
          type: 'success'
        }))

        history.push('/auth/login')
      }
      else {
        dispatch(SysActions.toast_create({
          title: 'Authentication',
          content: "Registering failed, please try again.",
          type: 'error'
        }))
      }

    }
  }, [rootState.auth])

  const _onRegisterClick = () => {

    if (!inputEmail || !inputGivenname || !inputPassword) {
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
  
      else if (inputGivenname && inputEmail && inputPassword) {
        dispatch(SysActions.toast_create({
          title: 'Authentication',
          content: "Registering user...",
          type: 'info'
        }))
        dispatch(AuthActions.registerUser_request({
          givenname: inputGivenname, email: inputEmail, password1: inputPassword, password2: inputPassword
        }))
        return
      }
    }
  }

  return (
    <div class='register-page' data-theme="light">

      <AVLink link="/">
        <img class="brand-logo" src={LightBrandLogo} alt="Brand" />
      </AVLink>

      <div class="panel-main">
        <div class="section main">
          <div class="tx panel-title">Daftar</div>
          <div class="tx panel-subtitle">Pengguna baru? Daftar dan dapatkan keuntungan Adavendor.</div>

          <div class="enclosure-input">
            <AVInput
              id="email"
              type="email"
              label="Email address"
              onChange={e => setInputEmail(e.target.value)} />
          </div>
          <div class="enclosure-input">
            <AVInput
              id="name"
              type="text"
              label="Givenname"
              onChange={e => setInputGivenname(e.target.value)} />
          </div>
          <div class="enclosure-input">
            <AVInput
              id="password"
              type="password"
              label="Password"
              onChange={e => setInputPassword(e.target.value)} />
          </div>

          <div class="enclosure-action">
            <AVButton
              loadingMode={isLoading}
              size="large"
              onClick={_onRegisterClick}>
              REGISTER
            </AVButton>
          </div>

          <div class="enclosure-action">
            <div class="tx par">
              Sudah punya akun? <AVLink link="/auth/login" color="primary">Masuk</AVLink>
            </div>
          </div>

        </div>
        <div class="section ornament">
          <img src={CommonOrnament1} alt="Ornament" />
        </div>
      </div>
    </div>
  )
}