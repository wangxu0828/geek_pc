import { LOGIN } from '../constants'

const initValue = {
  token: ''
}

export default function login(state = initValue, action) {
  if (action.type === LOGIN) {
    return {
      ...state,
      token: action.payload
    }
  } else if (action.type === LOGIN) {
    return {
      token: ''
    }
  } else {
    return state
  }
}
