import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'
import { composeWithDevTools } from 'redux-devtools-extension'
import { TOKEN } from '@/constants'

const store = createStore(
  rootReducer,
  {
    login: {
      token: window.localStorage.getItem(TOKEN) || ''
    }
  },
  composeWithDevTools(applyMiddleware(thunk))
)

export default store
