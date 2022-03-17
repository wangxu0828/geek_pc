import React from 'react'
import { Router, Route, Switch, Redirect } from 'react-router-dom'

import Layout from './pages/Layout'
import Login from './pages/Login'
import NotFount from './pages/NotFount'

import history from '@/utils/history'
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
