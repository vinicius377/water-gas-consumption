import { FastifyError } from "fastify";
import { ErrorConstructorType } from "./error.type";

export class BadRequestException {
  constructor(error: ErrorConstructorType) {
    const exception: Partial<FastifyError> = {
      message: error.message,
      statusCode: 400,
      code: error.code
    }

    return exception 
  }
}
