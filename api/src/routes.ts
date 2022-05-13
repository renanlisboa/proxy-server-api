import { Router, Request, Response } from 'express'

const routes = Router()

routes.get('/', (request: Request, response: Response) => {
  const data = [
    {
      id: 1,
      item: 'firstItem'
    },
    {
      id: 2,
      item: 'secondItem'
    },
    {
      id: 3,
      item: 'thirdItem'
    }
  ] 
  response.status(200).json(data)
})

export default routes