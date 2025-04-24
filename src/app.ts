import Fastify, { FastifyError, FastifyHttpOptions } from "fastify"
import { validatorCompiler, serializerCompiler, ZodTypeProvider } from "fastify-type-provider-zod"
import cors from "@fastify/cors"
import { Error } from "./types/Error"


export class FastifyApp {
  setupFastifyServer() {
    const fastifyConfig: FastifyHttpOptions<any> = {
      logger: false
    }
    const server = Fastify(fastifyConfig).withTypeProvider<ZodTypeProvider>()

    server.setValidatorCompiler(validatorCompiler)
    server.setSerializerCompiler(serializerCompiler)

    server.register(cors)

    server.setErrorHandler((error, _, reply) => {
      const errorMessage = this.formatError(error)

      reply.status(errorMessage.status_code).send(errorMessage)
    })

    return server
  }

  private formatError(error: FastifyError): Error {
    const isSchemaError = !!error.validation
    if (isSchemaError) {
      const firstError = error.validation![0]

      return {
        error_code: "INVALID_DATA",
        status_code: 400,
        error_description: `${firstError.instancePath} ${firstError.message}`
      }
    }

    return {
      status_code: error.statusCode!,
      error_description: error.message,
      error_code: error.code
    }
  }

}

