import { FastifyInstance } from "fastify"
import { ConsumptionController } from "./consumption.controller"

export function loadRoutes(app: FastifyInstance<any>) {
  ConsumptionController(app)
}
