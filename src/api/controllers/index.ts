import { ConsumptionController } from "./consumption.controller"
import { FastifyAppType } from "../../app"

export function loadRoutes(app: FastifyAppType) {
  ConsumptionController(app)
}
