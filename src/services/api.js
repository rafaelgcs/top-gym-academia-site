import axios from "axios"
import { getToken, logout, refresh } from './admin/auth'

const URL = process.env.REACT_APP_URL_API


const apiInsta = axios.create({
  baseURL: "https://graph.instagram.com"
})

const api = axios.create({
  baseURL: URL,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  }
})

const apiAuth = axios.create({
  baseURL: URL,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "Authorization": `Bearer ${getToken()}`
  }
})

const refreshToken = async () => {
  await apiAuth.post('auth/refresh/admin').then((response) => {
    if (response.status === 200) {
      refresh(response.data.data.access_token, response.data.data.expires_in)
    }
  }).catch(error => {
    if (logout()) {
      window.location.href = "/admin"
    }
  })
}

export { apiInsta, api, apiAuth, refreshToken }