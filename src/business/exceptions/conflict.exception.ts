import { FastifyError } from "fastify";
import { ErrorConstructorType } from "./error.type";

export class ConflictException {
  constructor(error: ErrorConstructorType) {
    const exception: Partial<FastifyError> = {
      message: error.message,
      statusCode: 409,
      code: error.code
    }

    return exception
  }
}
