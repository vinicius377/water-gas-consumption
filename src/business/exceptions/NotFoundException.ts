import { FastifyError } from "fastify";
import { Error as ErrorType } from "../../types/Error";

export class NotFoundException {
  constructor(error: Omit<ErrorType, "status_code">) {
    const exception: Partial<FastifyError> = {
      message: error.error_description,
      statusCode: 404,
      code: error.error_code
    }

    return exception
  }
}
