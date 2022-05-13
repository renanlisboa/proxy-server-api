import { Router, Request, Response, NextFunction } from 'express'
import { axiosApi } from './externals'

const routes = Router()

routes.get('/', async (request: Request, response: Response) => {
  try {
    const { data } = await axiosApi.get('/')
    return response.status(200).json(data)
  } catch(error) {
    return response.status(500).json({
      message: 'internal server error'
    })
  }
})

export default routes