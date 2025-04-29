import { ConsumptionEntity } from "../models/consumption.model";

export interface ListByCustomerCode {
  _id: string,
  measures: ConsumptionEntity[]
}
