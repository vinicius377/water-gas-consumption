import Fastify, { FastifyError, FastifyHttpOptions } from "fastify"
import { validatorCompiler, serializerCompiler, ZodTypeProvider } from "fastify-type-provider-zod"
import cors from "@fastify/cors"
import { Error } from "./types/Error"
import fastify_healthcheck from "fastify-healthcheck"
//@ts-ignore
import fastify_routes from "fastify-list-routes"
import { logger } from "./utils/logger"

export class FastifyApp {
  private app = Fastify({
    ignoreDuplicateSlashes: true,
    ignoreTrailingSlash: true
  }).withTypeProvider<ZodTypeProvider>()

  public setupFastifyServer() {
    this.app.setValidatorCompiler(validatorCompiler)
    this.app.setSerializerCompiler(serializerCompiler)

    this.app.register(cors)

    this.setupErrorHandler()
    this.setupRegistersPlugins()

    return this.app
  }

  private setupRegistersPlugins() {
    this.app.register(fastify_healthcheck)
    // TODO: make this work
    this.app.register(fastify_routes)
  }

  private setupErrorHandler() {
    this.app.setErrorHandler((error, _, reply) => {
      const errorMessage = this.formatError(error)

      reply.status(errorMessage.status_code).send(errorMessage)
    })
  }

  private formatError(error: FastifyError): Error {
    const isSchemaError = !!error.validation
    if (isSchemaError) {
      const { instancePath, message } = error.validation![0]
      const path = instancePath.replace("/", "")

      return {
        error_code: "INVALID_DATA",
        status_code: 400,
        error_description: `${path}: ${message}`
      }
    }

    if (!error.statusCode) {
      logger.error(String(error))
      return {
        status_code: 500,
        error_code: "INTERNAL_SERVER_ERROR",
        error_description: "Erro interno no servidor"
      }
    }

    return {
      status_code: error.statusCode,
      error_description: error.message,
      error_code: error.code
    }
  }

}

