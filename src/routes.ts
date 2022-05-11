import { Router, Response } from 'express'

const routes = Router()

routes.get('/', (_, response: Response) => {
  // make a request to api server
  // response to this request with data from api server
  response.json({
    message: 'Hello world'
  })
})

export default routes