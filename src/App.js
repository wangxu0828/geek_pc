import React, { lazy } from 'react'
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import history from '@/utils/history'

const Layout = lazy(() => import('./pages/Layout'))
const Login = lazy(() => import('./pages/Login'))
const NotFount = lazy(() => import('./pages/NotFount'))

export default function App() {
  return (
    <Router history={history}>
      <Switch>
        <Redirect exact from="/" to="/home"></Redirect>
        <Route path="/login" component={Login}></Route>
        <Route path="/home" component={Layout}></Route>
        <Route component={NotFount}></Route>
      </Switch>
    </Router>
  )
}
