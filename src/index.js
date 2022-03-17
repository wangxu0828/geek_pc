import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from '@/store'

import './index.scss'

import App from './App'
import zhCN from 'antd/lib/locale/zh_CN'
import { ConfigProvider } from 'antd'

ReactDOM.render(
  <ConfigProvider locale={zhCN}>
    <Provider store={store}>
      <App />
    </Provider>
  </ConfigProvider>,
  document.getElementById('root')
)
