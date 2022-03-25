import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'
import { composeWithDevTools } from 'redux-devtools-extension'
import { TOKEN } from '@/constants'
let middlewares

if (process.env.NODE_ENV === 'production') {
  // 生产环境, 只启用thunk中间件
  middlewares = applyMiddleware(thunk)
} else {
  middlewares = composeWithDevTools(applyMiddleware(thunk))
}

const store = createStore(
  rootReducer,
  {
    login: {
      token: window.localStorage.getItem(TOKEN) || ''
    }
  },
  middlewares
)

export default store
