import { h, Fragment as F } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import { Route, RouteProps } from 'react-router-dom'
import { DefaultShellDesktop } from './_desktop.shell'
import { DefaultShellMobile } from './_mobile.shell'


export const RouteDefaultShell = ({ component: Child, ...rest }: RouteProps) => {

  const mql = window.matchMedia('(max-width: 576px)')
  const [isMobile, setIsMobile] = useState(true)

  useEffect(() => {

    setIsMobile(mql.matches)

    const _onMobileDetected = e => {
      if (mql.matches) setIsMobile(true)
      else setIsMobile(false)
    }

    mql.addListener(_onMobileDetected)

    return (() => {
      mql.removeListener(_onMobileDetected)
    })
  }, [])

  return (
    <Route
      {...rest}
      render={routeProps => (
        !isMobile
          ? (
            <DefaultShellDesktop>
              <Child {...routeProps} />
            </DefaultShellDesktop>
          )
          : (
            <DefaultShellMobile>
              <Child {...routeProps} />
            </DefaultShellMobile>
          )
      )} />
  )
}