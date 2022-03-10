import { login } from '@/api/login'
import { TOKEN } from '@/constants'
import cache from '@/utils/storage'
import { LOGIN } from '../constants'

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
