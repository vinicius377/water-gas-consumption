import { Service } from "typedi";
import { UploadDto } from "../../api/schemas/upload.schema";
import { ConsumptionRepository } from "../repositories/consumption.repository";
import { logger } from "../../utils/logger";
import { GeminiService } from "../services/gemini.service";
import { BadRequestException } from "../exceptions/BadRequestException";

@Service()
export class ConsumptionApp {
  constructor(
    private readonly repository: ConsumptionRepository,
    private readonly geminiService: GeminiService
  ) { }

  async upload(dto: UploadDto) {
    const response = await this.geminiService.extractMeasureFromImage(dto.image)
    const measureValue = Number(response)

    if (isNaN(measureValue)) {
      throw new BadRequestException({ error_code: "INVALID_DATA", error_description: response || "" })
    }

    const createdConsumption = await this.repository.create({
      measure_value: measureValue,
      measure_type: dto.measure_type,
      measure_datetime: dto.measure_datetime,
      image_url: "iamgem",
      customer_code: dto.customer_code
    })

    logger.debug("Consumption registered on db", [ConsumptionApp.name, this.upload.name])
    return createdConsumption
  }

}
