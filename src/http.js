import axios from 'axios'
export const JWT_TOKEN = 'USER_TOKEN'
export const USERNAME = 'USERNAME';
export const SERVER_URL = process.env.NODE_ENV === 'production' ? '' : `http://localhost:4000`;
const authedRequest = axios.create()
authedRequest.interceptors.request.use(function (config) {
  config.url = SERVER_URL + config.url
  config.headers = {
    Authorization: `Bearer ${localStorage.getItem(JWT_TOKEN)}`,
  }
  return config
}, function (err) {
  return Promise.reject(err)
})

export {
  authedRequest
}
