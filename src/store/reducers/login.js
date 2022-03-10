import { LOGIN } from '../constants'

const initValue = {
  token: ''
}

export default function login(state = initValue, action) {
  if (action.type === LOGIN) {
    return (state = {
      ...state,
      token: action.payload
    })
  }

  return state
}
