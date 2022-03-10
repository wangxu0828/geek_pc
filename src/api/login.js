import request from '@/utils/request'

/**
 * 登录接口
 * @param {*} data
 * @returns
 */
export const login = (data) => {
  return request({
    url: '/authorizations',
    method: 'POST',
    data
  })
}
