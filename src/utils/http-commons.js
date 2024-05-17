import axios from 'axios'

axios.defaults.withCredentials = true

const localAxios = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type' : 'application/json;charset=utf-8'
  }
})

const loginAxios = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type' : 'multipart/form-data'
  }
})

export {localAxios, loginAxios}