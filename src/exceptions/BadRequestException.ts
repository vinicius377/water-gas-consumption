import { FastifyError } from "fastify";
import { Error as ErrorType } from "../types/Error";

export class BadRequestException {
  constructor(error: Omit<ErrorType, "status_code">) {
    const exception: Partial<FastifyError> = {
      message: error.error_description,
      statusCode: 400,
      code: error.error_code
    }

    return exception 
  }
}
