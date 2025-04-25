import Fastify, { FastifyBaseLogger, FastifyError, FastifyInstance, RawReplyDefaultExpression, RawRequestDefaultExpression, RawServerDefault } from "fastify"
import { validatorCompiler, serializerCompiler, ZodTypeProvider } from "fastify-type-provider-zod"
import cors from "@fastify/cors"
import { Error } from "./types/Error"
import healthcheck_pl from "fastify-healthcheck"
//@ts-ignore
import list_routes_pl from "fastify-list-routes"
import { logger } from "./utils/logger"
import helmet_pl from "@fastify/helmet"
import mongo_sanitize_pl from "@exortek/fastify-mongo-sanitize"

export type FastifyAppType = FastifyInstance<RawServerDefault, RawRequestDefaultExpression, RawReplyDefaultExpression, FastifyBaseLogger, ZodTypeProvider>

export class FastifyApp {
  private app = Fastify({
    ignoreDuplicateSlashes: true,
    ignoreTrailingSlash: true
  }).withTypeProvider<ZodTypeProvider>() as FastifyAppType

  public setupFastifyServer() {
    this.app.setValidatorCompiler(validatorCompiler)
    this.app.setSerializerCompiler(serializerCompiler)

    this.app.register(cors)

    this.setupErrorHandler()
    this.setupRegistersPlugins()

    return this.app
  }

  private setupRegistersPlugins() {
    this.app.register(healthcheck_pl)

    // TODO: make this work
    this.app.register(list_routes_pl)

    this.app.register(mongo_sanitize_pl)
    this.app.register(helmet_pl)
  }

  private setupErrorHandler() {
    this.app.setErrorHandler((error, _, reply) => {
      const formtatedError = this.formatError(error)

      reply.status(formtatedError.status_code).send(formtatedError.error)
    })
  }

  private formatError(error: FastifyError): Error {
    const isSchemaError = !!error.validation

    if (isSchemaError) {
      const { instancePath, message } = error.validation![0]
      const path = instancePath.replace("/", "")

      return {
        status_code: 400,
        error: {
          error_code: "INVALID_DATA",
          error_description: `${path}: ${message}`
        }
      }
    }

    if (!error.statusCode) {
      logger.error(String(error))
      return {
        status_code: 500,
        error: {
          error_code: "INTERNAL_SERVER_ERROR",
          error_description: "Erro interno no servidor"
        },
      }
    }

    return {
      status_code: error.statusCode,
      error: {
        error_description: error.message,
        error_code: error.code
      },
    }
  }

}

