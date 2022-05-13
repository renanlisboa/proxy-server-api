import fs from 'fs'
import path from 'path'
import { promisify } from'util'
import { Request, Response, NextFunction } from 'express'
import { Plugin } from './plugin-interface'

type PluginData = {
  name: string
  path: string
  enabled: boolean
}

export class Plugins {
  private pluginsList: Plugin[] = []

  constructor() {
    this.loadPlugins()
  }

  runPlugins = async (
    request: Request, 
    response: Response, 
    next: NextFunction
  ) => {
    if (this.pluginsList.length > 0) {
      this.pluginsList.forEach(async (plugin) => {
        plugin.run(request, response, next)
      })
    } else {
      next()
    }
  }

  async loadPlugins(pluginPath = './plugins.json') {
    const readFile = promisify(fs.readFile)
    const data = await readFile(path.join(__dirname, pluginPath))
    const plugins = JSON.parse(data.toString())
    plugins.forEach((plugin: PluginData) => {
      if (plugin.enabled) {
        this.load(plugin)
      }
    })
  }

  async load(plugin: PluginData) {
    const path = plugin.path
    try {
      import(path).then(async object => {
        const PluginModule = object.default
        const pluginModule = new PluginModule()
        this.pluginsList.push(pluginModule)
      })
    } catch (error) {
      console.error(`Failed to load '${plugin.name}'`)
      process.exit()
    }
  }
}