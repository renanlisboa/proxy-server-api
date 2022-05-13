import fs from "fs"
import path from "path"
import { promisify } from "util"
import { Request, Response, NextFunction } from "express"
import { Plugin } from './plugin-interface'

class HttpLogger implements Plugin {
  run(
    request: Request, 
    response: Response, 
    next: NextFunction
  ): Response | void {
    const httpLog = `${request.method} ${request.path} ${request.res?.statusCode}\r\n`
    const appendFile = promisify(fs.appendFile)
    appendFile(path.join(__dirname, 'data/http.log'), httpLog)
  }
}

export default HttpLogger
