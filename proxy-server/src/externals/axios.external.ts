import axios from 'axios'
import { config as envConfig } from 'dotenv'
envConfig()

export const axiosApi = axios.create({
  baseURL: process.env.API_URL,
})