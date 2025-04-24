import "reflect-metadata"
import { logger } from "./utils/logger"
import { connectDB } from "./config/db";
import { loadRoutes } from "./api/controllers";
import { FastifyApp } from "./app";

async function bootstrap() {
  await connectDB()

  const server = new FastifyApp().setupFastifyServer()

  loadRoutes(server)

  server.listen({ port: 3000, host: "0.0.0.0" }, (err, address) => {
    if (err) {
      logger.error(err, [bootstrap.name])
      process.exit(1)
    }
    logger.info(`Server listening at ${address}`, [bootstrap.name])
  })
}

bootstrap()

