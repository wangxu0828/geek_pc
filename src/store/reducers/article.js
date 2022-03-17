import { GET_ARTICLE, GET_CHANNEL } from '../constants'

let initValue = {
  channelList: [],
  articleList: []
}

export default function article(state = initValue, action) {
  if (action.type === GET_CHANNEL) {
    return {
      ...state,
      channelList: action.payload
    }
  } else if (action.type === GET_ARTICLE) {
    return {
      ...state,
      articleList: action.payload
    }
  }
  return state
}
