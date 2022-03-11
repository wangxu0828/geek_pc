import { GET_USER_INFO } from '../constants'

export default function getUserInfo(state = {}, action) {
  if (action.type === GET_USER_INFO) {
    return action.payload
  }
  return state
}
