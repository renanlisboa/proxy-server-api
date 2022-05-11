import { config as envConfig } from 'dotenv'
import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import routes from './routes'

envConfig()
const server = express()

server.use(morgan('dev'))
server.use(helmet())
server.use(cors())
server.use(express.json())
server.use('/api', routes)

server.listen(process.env.PORT, () => {
  console.log(`app running on http://localhost:${process.env.PORT ?? 3333}/api`)
})