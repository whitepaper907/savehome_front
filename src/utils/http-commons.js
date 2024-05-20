import axios from 'axios'
const { VITE_API_BASE_URL, VITE_EXPIRED_REFRESH_TOKEN } = import.meta.env

axios.defaults.withCredentials = true

const localAxios = axios.create({
  baseURL: VITE_API_BASE_URL,
  headers: {
    'Content-Type' : 'application/json;charset=utf-8'
  }
})

localAxios.interceptors.response.use(
  (res) => {
    return res
  },
  async (err) => {
    console.log('reissue')
    return Promise.reject(VITE_EXPIRED_REFRESH_TOKEN)
  }
)

const loginAxios = axios.create({
  baseURL: VITE_API_BASE_URL,
  headers: {
    'Content-Type' : 'multipart/form-data'
  }
})

export {localAxios, loginAxios}