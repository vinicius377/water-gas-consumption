import { Service } from "typedi";
import { UploadDto } from "../../api/schemas/upload.schema";
import { ConsumptionRepository } from "../repositories/consumption.repository";
import { logger } from "../../utils/logger";

@Service()
export class ConsumptionApp {
  constructor(private repository: ConsumptionRepository) {  }

  async upload(dto: UploadDto) {
    const createdConsumption = await this.repository.create({
      measure_value: 1,
      measure_type: dto.measure_type,
      measure_datetime: dto.measure_datetime,
      image_url: ""
    })

    logger.debug("Registro de consumo salvo no banco de dados",  [ConsumptionApp.name, this.upload.name])
    return createdConsumption
  }

}
