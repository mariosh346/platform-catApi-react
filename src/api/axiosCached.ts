import axios from 'axios'
import { setupCache } from 'axios-cache-interceptor'

const BASE_URL = 'https://api.thecatapi.com/v1'
const axiosInstance = axios.create({ baseURL: BASE_URL })

export const getAxios = () => setupCache(axiosInstance, { ttl: 60 * 60 * 1000 })