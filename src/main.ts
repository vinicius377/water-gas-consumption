import Fastify from "fastify"
import { logger } from "./utils/logger"
import { FastifyHttpOptions } from "fastify";
import cors from "@fastify/cors"
import { connectDB } from "./config/db";

const fastifyConfig: FastifyHttpOptions<any> = {
  logger: false
}

async function bootstrap() {
  await connectDB() 

  const server = Fastify(fastifyConfig)
  server.register(cors)

  server.listen({ port: 3000, host: "0.0.0.0" }, (err, address) => {
    if (err) {
      logger.error(err, [bootstrap.name])
      process.exit(1)
    }
    logger.info(`Server listening at ${address}`, [bootstrap.name])
  })
}

bootstrap()
