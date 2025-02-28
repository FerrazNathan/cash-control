import axios from 'axios'
import { auth } from '../lib/firebase'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

// Interceptor para adicionar token de autenticação
api.interceptors.request.use(async (config) => {
  if (auth.currentUser) {
    const token = await auth.currentUser.getIdToken()
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}) 