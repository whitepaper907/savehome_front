import axios from 'axios'

axios.defaults.withCredentials = true

const reissueToken = async (refresToken) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/reissue`, {
      refresh_token: refresToken
    });
    return response.data
  } catch (err) {
    console.log("reissueToken err >> ", err.response.data.message)
    sessionStorage.clear()
    return
  }
}

export {
  reissueToken
}