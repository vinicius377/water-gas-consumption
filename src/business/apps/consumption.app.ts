import { Service } from "typedi";
import { UploadDto } from "../../api/schemas/upload.schema";
import { ConsumptionRepository } from "../repositories/consumption.repository";
import { logger } from "../../utils/logger";
import { GeminiService } from "../services/gemini.service";
import { ConflictException } from "../exceptions/conflict.exception";
import { BadRequestException } from "../exceptions/bad_request.exception";
import { ConfirmDto } from "../../api/schemas/confirm.schema";
import { NotFoundException } from "../exceptions/not_found.exception";
import { MeasureType } from "../../types/MeasureType";

@Service()
export class ConsumptionApp {
  constructor(
    private readonly repository: ConsumptionRepository,
    private readonly geminiService: GeminiService
  ) { }

  async upload(dto: UploadDto) {
    const alreadyRegisteredThisMonth = await this.repository.findOnCurrentMonthByMeasureType(dto.customer_code, dto.measure_type)

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

    const createdConsumptionMeasure = await this.repository.create({
      measure_value: measureValue,
      measure_type: dto.measure_type,
      measure_datetime: dto.measure_datetime,
      image_url: "iamgem",
      customer_code: dto.customer_code
    })

    logger.info("Consumption measure registered on db", [ConsumptionApp.name, this.upload.name])
    return createdConsumptionMeasure
  }

  async confirm(dto: ConfirmDto) {
    const consumptionMeasure = await this.repository.findOne({ measure_uuid: dto.measure_uuid })

    if (!consumptionMeasure) {
      throw new NotFoundException({
        message: "Leitura do mês já realizada", code: "MEASURE_NOT_FOUND"
      })
    }

    if (consumptionMeasure.has_confirmed) {
      throw new ConflictException({
        message: "Leitura do mês já realizada", code: "CONFIRMATION_DUPLICATE"
      })
    }

    await this.repository.updateOne(dto.measure_uuid, {
      has_confirmed: true,
      measure_value: dto.confirmed_value
    })
  }

  async list(customer_code: string, measure_type?: MeasureType) {
    const list = await this.repository.groupByCustomerCode(customer_code, measure_type)

    if (!list) {
      throw new NotFoundException({
        code: "MEASURES_NOT_FOUND",
        message: "Nenhuma leitura encontrada"
      })
    }

    return list
  }

}
