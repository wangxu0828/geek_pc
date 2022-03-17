import { combineReducers } from 'redux'

import login from './login'
import getUserInfo from './user'
import article from './article'
const rootReducer = combineReducers({
  login,
  user: getUserInfo,
  article
})

export default rootReducer
