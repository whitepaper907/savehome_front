import axios from 'axios'

axios.defaults.withCredentials = true

const tokenAxios = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type' : 'application/json;charset=utf-8'
  }
})

function getUserInfo(success) {
  tokenAxios.get('/member/info')
    .then(success)
}

export {
  getUserInfo
}