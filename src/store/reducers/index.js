import { combineReducers } from 'redux'

import login from './login'
import getUserInfo from './user'
const rootReducer = combineReducers({
  login,
  user: getUserInfo
})

export default rootReducer
