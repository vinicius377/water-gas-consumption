import { Service } from "typedi";
import { UploadDto } from "../../api/schemas/upload.schema";
import { ConsumptionRepository } from "../repositories/consumption.repository";
import { logger } from "../../utils/logger";
import { GeminiService } from "../services/gemini.service";
import { ConflictException } from "../exceptions/conflict.exception";
import { BadRequestException } from "../exceptions/bad_request.exception";

@Service()
export class ConsumptionApp {
  constructor(
    private readonly repository: ConsumptionRepository,
    private readonly geminiService: GeminiService
  ) { }

  async upload(dto: UploadDto) {
    const alreadyRegisteredThisMonth = await this.repository.findOnCurrentMonthByCustomerCode(dto.customer_code)

    if (alreadyRegisteredThisMonth) {
      throw new ConflictException({
        code: "DOUBLE_REPORT", message: "Leitura do mês já realizada"
      })
    }

    const response = await this.geminiService.extractMeasureFromImage(dto.image)
    const measureValue = Number(response)

    if (isNaN(measureValue)) {
      logger.error("Image not compatible for analysis", [ConsumptionApp.name, this.upload.name])
      throw new BadRequestException({ code: "INVALID_DATA", message: response || "" })
    }

    const createdConsumption = await this.repository.create({
      measure_value: measureValue,
      measure_type: dto.measure_type,
      measure_datetime: dto.measure_datetime,
      image_url: "iamgem",
      customer_code: dto.customer_code
    })

    logger.info("Consumption registered on db", [ConsumptionApp.name, this.upload.name])
    return createdConsumption
  }

}
