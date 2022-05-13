import fs from "fs"
import path from "path"
import { promisify } from "util"
import { Request, Response, NextFunction } from "express"
import { Plugin } from './plugin-interface'

type Blacklist = {
  ip: string
  date: Date
}

class Blacklisting implements Plugin {
  run(
    request: Request, 
    response: Response, 
    next: NextFunction
  ): Response | void {
    try {
      const data = fs.readFileSync(path.join(__dirname, "data/blacklist.json"))
      const blacklist = JSON.parse(data.toString())
      const ipInBlacklist = blacklist.find(
        (item: Blacklist) => item.ip === request.ip
      )
      if (!ipInBlacklist) return next()
      return response.status(403).json({ message: "forbidden" })
    } catch (error: any) {
      if (error.code === "ENOENT") {
        const writeFile = promisify(fs.writeFile)
        writeFile(
          path.join(__dirname, "data/blacklist.json"),
          JSON.stringify([], null, 2)
        )
        return next()
      }
      return response.status(500).json({
        message: "internal server error",
      })
    }
  }
}

export default Blacklisting
