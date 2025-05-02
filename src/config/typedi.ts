import { Container } from "typedi";
import { ConsumptionModel } from "../business/repositories/models/consumption.model";

export function injectDependencies() {
  Container.set(ConsumptionModel.name, ConsumptionModel)
}
