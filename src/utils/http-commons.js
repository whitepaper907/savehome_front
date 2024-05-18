import axios from 'axios'
import { reissueToken } from '@/utils/token.js'
import { eventBus } from "@/utils/eventBus"

axios.defaults.withCredentials = true

const localAxios = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type' : 'application/json;charset=utf-8'
  }
})

let retry = false;

localAxios.interceptors.request.use(
  (config) => {
    const accessToken = sessionStorage.getItem('access_token')
    const refreshToken = sessionStorage.getItem('refresh_token')

    // console.log(config)
    // config.data.access_token = accessToken;
    // config.data.refresh_token = refreshToken;
    if (config.method === 'get') {
      if (!config.params) {
        config.params = {};
      }
      config.params.access_token = accessToken;
      config.params.refresh_token = refreshToken;
    } else {
      config.data.access_token = accessToken;
      config.data.refresh_token = refreshToken;
    }

    console.log('access_token >>',sessionStorage.getItem('access_token'))

    console.log("config >>",config)

    return config
  },
  (err) => {
    console.log("request err >>",err)
    return Promise.reject(err)
  }
)

localAxios.interceptors.response.use(
  (response) => {
    console.log("localAxios.interceptors.response")
    return response
  },
  async (err) => {
    console.log("err >> ", err)
    if (retry) {
      console.log("retry = true")
      retry = false;
      sessionStorage.clear()
      eventBus.value.updateUserId()
      return
    }

    console.log("retry = false")
    retry = true

    const originalRequest = err.config
    console.log(err.config)
    
    if (err.response && err.response.status === 401) {
      try {
        console.log("reissuToken processing...")
        const tokens = await reissueToken(sessionStorage.getItem('refresh_token'))
        
        if (tokens != null) {
          sessionStorage.setItem('access_token', tokens.access_token)
          sessionStorage.setItem('refresh_token', tokens.refresh_token)

          if (originalRequest.method === 'get') {
            originalRequest.params.access_token = tokens.access_token
            originalRequest.params.refresh_token = tokens.refresh_token
          }
          else {
            const originalData = JSON.parse(originalRequest.data)
            originalData.access_token = tokens.access_token
            originalData.refresh_token = tokens.refresh_token
            originalRequest.data = originalData
          }

          return localAxios(originalRequest)
        }

        sessionStorage.clear()
        eventBus.value.updateUserId()
      } catch (err) {
        console.log('reissue err >>', err)
        sessionStorage.clear()
        eventBus.value.updateUserId()
      }
    }
    return Promise.reject(err)
  }
)

const loginAxios = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type' : 'multipart/form-data'
  }
})

export {localAxios, loginAxios}