import request from '@/utils/request'

/**
 * 获取个人信息
 * @returns
 */
export const getUserInfo = () => {
  return request({
    url: '/user/profile',
    method: 'GET'
  })
}
