import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'

import Layout from './pages/Layout'
import Login from './pages/Login'
import NotFount from './pages/NotFount'

export default function App() {
  return (
    <Router>
      <Switch>
        <Redirect exact from="/" to="/home"></Redirect>
        <Route path="/login" component={Login}></Route>
        <Route path="/home" component={Layout}></Route>
        <Route component={NotFount}></Route>
      </Switch>
    </Router>
  )
}
