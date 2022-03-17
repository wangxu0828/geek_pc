import {
  getChannelList as getChannels,
  getArticleList as getArticles,
  delArticle as del
} from '@/api'
import { GET_ARTICLE, GET_CHANNEL } from '../constants'

export const getChannelList = () => {
  return async (dispatch) => {
    const res = await getChannels()
    dispatch({
      type: GET_CHANNEL,
      payload: res.data.channels
    })
  }
}

export const getArticleList = (data) => {
  return async (dispatch) => {
    const res = await getArticles(data)
    dispatch({
      type: GET_ARTICLE,
      payload: res.data
    })
  }
}

export const delArticle = (id) => {
  return async (dispatch) => {
    await del(id)
  }
}
