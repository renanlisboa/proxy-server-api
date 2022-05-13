import { config as envConfig } from 'dotenv'
import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import routes from './routes'

envConfig()
const server = express()

server.use(helmet())
server.use(cors({
  origin: process.env.PROXY_URL
}))
server.use(express.json())
server.use(routes)

server.listen(process.env.PORT, () => {
  console.log(`app running on http://localhost:${process.env.PORT ?? 5000}`)
})