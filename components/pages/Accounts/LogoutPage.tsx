import { h } from 'preact'
import { useEffect, useState, useCallback } from 'preact/hooks'
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router'
import { AuthActions } from '~/core/redux/auth';


export const LogoutPage = () => {

  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    dispatch(AuthActions.logoutUser())
    history.replace('/')
    window.location.href = '/'
  }, [])


  return <div/>
}