//#region Imports
import { h, Fragment as F } from 'preact'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { RouteDefaultShell } from './shells/Default'
import { HomePage, LoginPage, CartPage, RegisterPage, BrowsePage, VendorOverviewPage, LogoutPage } from '~/components/pages'
//#endregion



export default () => (
  <Router>
    <RouteDefaultShell exact path="/"              component={HomePage} />
    <RouteDefaultShell exact path="/browse"        component={BrowsePage} />
    <RouteDefaultShell       path="/b"             component={BrowsePage} />
    <RouteDefaultShell       path="/v"             component={VendorOverviewPage} />
    <RouteDefaultShell exact path="/my-cart/"      component={CartPage} />
   
    <Route             exact path="/auth/login"    component={LoginPage} />
    <Route             exact path="/auth/logout"   component={LogoutPage} />
    <Route             exact path="/auth/register" component={RegisterPage} />

  </Router>
)