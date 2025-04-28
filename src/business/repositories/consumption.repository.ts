import { Inject, Service } from "typedi";
import { ConsumptionEntity, ConsumptionModel } from "./models/consumption.model"
import { Model } from "mongoose";
import { MeasureType } from "../../types/MeasureType";
import { CreateConsumptionDto } from "./dtos/create-consumption.dto";

@Service()
export class ConsumptionRepository {
  constructor(@Inject(ConsumptionModel.name) private readonly model: Model<ConsumptionEntity>) { }

  async create(dto: CreateConsumptionDto) {
    return this.model.create({
      image_url: dto.image_url,
      measure_datetime: dto.measure_datetime,
      measure_type: dto.measure_type,
      measure_value: dto.measure_value,
      customer_code: dto.customer_code
    }).then(x => x.toObject())
  }

  async findOnCurrentMonthByMeasureType(customer_code: string, measure_type: MeasureType) {
    const dateStart = new Date()
    dateStart.setDate(1)
    dateStart.setHours(0, 0)

    const dateEnd = new Date()
    dateEnd.setMonth(dateStart.getMonth() + 1, 0)
    dateStart.setHours(23, 0)

    return this.model.findOne({
      customer_code,
      measure_type,
      measure_datetime: {
        $gte: dateStart.toISOString(),
        $lte: dateEnd.toISOString()
      }
    })
  }
}
