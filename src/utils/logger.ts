import pino from "pino"

class Logger {
  private pinoLogger = pino({
    transport: {
      target: "pino-pretty",
      options: {
        colorize: true
      }
    }
  })

  info(message: string, paths = [] as string[]) {
    const tracePath = this.createTracePath(paths)
    return this.pinoLogger.info(`${tracePath}${message}`)
  }

  error(message: string | Error, paths = [] as string[]) {
    const tracePath = this.createTracePath(paths)
    return this.pinoLogger.error(`${tracePath}${message}`)
  }

  debug(message: string | Error, paths = [] as string[]) {
    const tracePath = this.createTracePath(paths)
    return this.pinoLogger.debug(`${tracePath}${message}`)

  }

  private createTracePath(paths: string[]) {
    return paths.reduce((acc, path) => acc += `${path} >> `, "")
  }
}
export const logger = new Logger()
