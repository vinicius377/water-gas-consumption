import { Inject, Service } from "typedi";
import { ConsumptionEntity, ConsumptionModel } from "./models/consumption.model"
import { Model } from "mongoose";

interface CreateConsumptionDto {
  measure_datetime: string,
  measure_type: string,
  measure_value: number,
  customer_code: string,
  image_url: string
}

@Service()
export class ConsumptionRepository{
  constructor(@Inject(ConsumptionModel.name) private model: Model<ConsumptionEntity>) {}

  async create(dto: CreateConsumptionDto) {
    this.model.cleanIndexes
    return this.model.create({
      image_url: dto.image_url,
      measure_datetime: dto.measure_datetime,
      measure_type: dto.measure_type,
      measure_value: dto.measure_value,
      customer_code: dto.customer_code
    }).then(x => x.toObject())
  }

}
