import axios from 'axios'

const request = axios.create({
  baseURL: 'http://geek.itheima.net/v1_0/',
  timeout: 5000
})

request.interceptors.request.use(
  (req) => {
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
