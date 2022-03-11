import axios from 'axios'
import cache from './storage'

const request = axios.create({
  baseURL: 'http://geek.itheima.net/v1_0/',
  timeout: 5000
})

request.interceptors.request.use(
  (req) => {
    if (cache.getCache('token')) {
      req.headers.Authorization = 'Bearer ' + cache.getCache('token')
    }
    return req
  },
  (err) => {
    return Promise.reject(err)
  }
)

request.interceptors.response.use(
  (res) => {
    return res.data
  },
  (err) => {
    return Promise.reject(err)
  }
)

export default request
