import axios from 'axios'
const { VITE_API_BASE_URL, VITE_EXPIRED_REFRESH_TOKEN } = import.meta.env

axios.defaults.withCredentials = true

const localAxios = axios.create({
  baseURL: VITE_API_BASE_URL,
  headers: {
    'Content-Type' : 'application/json;charset=utf-8'
  }
})

localAxios.interceptors.request.use(
  (config) => {
    // 모든 이전 리디렉션 정보를 초기화
    config.maxRedirects = 0; // 리디렉션을 아예 하지 않도록 설정

    // 여기에 추가적인 설정을 할 수 있습니다.
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

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