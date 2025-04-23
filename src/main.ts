import Fastify from "fastify"
import { logger } from "./utils/logger"
import { FastifyHttpOptions } from "fastify";
import cors from "@fastify/cors"

const fastifyConfig: FastifyHttpOptions<any> = {
  logger: false
}

async function boostrap() {
  const server = Fastify(fastifyConfig)
  server.register(cors)

  server.get("/", () => {
    logger.info("teste")
    return "helloworld"
  })

  server.listen({ port: 3000, host: "0.0.0.0" }, (err, address) => {
    if (err) {
      logger.error(err, [boostrap.name])
      process.exit(1)
    }
    logger.info(`Server listening at ${address}`, [boostrap.name])
  })
}

boostrap()
