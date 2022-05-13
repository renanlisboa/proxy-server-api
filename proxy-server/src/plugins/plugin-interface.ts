import { Request, Response, NextFunction } from "express"

export interface Plugin {
  run: (request: Request, response: Response, next: NextFunction) => Response | void
}