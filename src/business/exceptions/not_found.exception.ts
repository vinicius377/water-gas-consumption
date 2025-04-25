import { FastifyError } from "fastify";
import { Error as ErrorType } from "../../types/Error";
import { ErrorConstructorType } from "./error.type";

export class NotFoundException {
  constructor(error: ErrorConstructorType) {
    const exception: Partial<FastifyError> = {
      message: error.message,
      statusCode: 404,
      code: error.code
    }

    return exception
  }
}
