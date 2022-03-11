import { login } from '@/api'
import { TOKEN } from '@/constants'
import cache from '@/utils/storage'
import { LOGIN, LOGOUT } from '../constants'

export const loginAction = (payload) => {
  return async (dispatch) => {
    const res = await login(payload)
    cache.setCache(TOKEN, res.data.token)
    dispatch({
      type: LOGIN,
      payload: res.data.token
    })
  }
}

export const logout = () => {
  return (dispatch) => {
    cache.clearCache()
    dispatch({
      type: LOGOUT
    })
  }
}
