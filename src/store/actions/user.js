import { GET_USER_INFO } from '../constants/index'
import { getUserInfo as UserInfo } from '@/api'

export const getUserInfoAction = () => {
  return async (dispatch) => {
    const res = await UserInfo()
    dispatch({
      type: GET_USER_INFO,
      payload: res.data
    })
  }
}
