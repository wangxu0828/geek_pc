import {
  getChannelList as getChannels,
  getArticleList as getArticles,
  delArticle as del
} from '@/api'
import request from '@/utils/request'
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

export const saveArticle = (data) => {
  return async (dispatch) => {
    await request.post('/mp/articles?draft=false', data)
  }
}

export const saveDraft = (data) => {
  return async (dispatch) => {
    await request.post('/mp/articles?draft=true', data)
  }
}

export const getArticleInfo = (id) => {
  return async (dispatch) => {
    const res = await request(`/mp/articles/${id}`)
    return res.data
  }
}
export const editArticle = (draft = false, data) => {
  return async (dispatch) => {
    await request({
      url: `/mp/articles/${data.id}`,
      method: 'put',
      data,
      params: {
        draft
      }
    })
  }
}
