import request from '@/utils/request'

/**
 * 获取所有频道信息
 * @returns
 */
export const getChannelList = () => {
  return request({
    url: '/channels',
    method: 'GET'
  })
}

/**
 * 获取文章列表
 * @returns
 */
export const getArticleList = (data) => {
  return request({
    url: '/mp/articles',
    method: 'GET',
    params: data
  })
}

/**
 * 删除文章
 * @param {*} id
 * @returns
 */
export const delArticle = (id) => {
  return request({
    url: `/mp/articles/${id}`,
    method: 'delete'
  })
}
