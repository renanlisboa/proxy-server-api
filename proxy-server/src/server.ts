import { config as envConfig } from 'dotenv'
import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import routes from './routes'
import { Plugins } from './plugins'

envConfig()
const server = express()
const plugins = new Plugins()

server.use(helmet())
server.use(cors())
server.use(express.json())
server.use(plugins.runPlugins)
server.use('/api', routes)

server.listen(process.env.PORT, () => {
  console.log(`app running on http://localhost:${process.env.PORT ?? 3333}/api`)
})