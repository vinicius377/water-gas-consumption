import { ConsumptionRepository } from "../repositories/consumption.repository"
import { ConsumptionApp } from "./consumption.app"
import { ConsumptionModel } from "../repositories/models/consumption.model"
import { GeminiService } from "../services/gemini.service"
import { mockUploadAppResponse, mockUploadPayload } from "../../_mocks_/upload-route"
import { ConflictException } from "../exceptions/conflict.exception"
import { BadRequestException } from "../exceptions/bad_request.exception"
import { mockConfirmPayload } from "../../_mocks_/confirm-route"
import { NotFoundException } from "../exceptions/not_found.exception"

vi.mock("../repositories/consumption.repository")
vi.mock("../services/gemini.service")

describe(ConsumptionApp.name, () => {
  let app!: ConsumptionApp

  beforeEach(() => {
    app = new ConsumptionApp(
      new ConsumptionRepository(ConsumptionModel),
      new GeminiService()
    )
  })

  describe(ConsumptionApp.prototype.upload.name, () => {
    it("should throw error if already has registered consumption in this month with type", async () => {
      vi.mocked(
        ConsumptionRepository.prototype.findOnCurrentMonthByMeasureType
      ).mockReturnValueOnce(Promise.resolve(mockUploadAppResponse as any))

      await expect(app.upload(mockUploadPayload)).rejects.toThrowError(
        expect.objectContaining(new ConflictException({
          code: "DOUBLE_REPORT", message: "Leitura do mês já realizada"
        }))
      )
    })

    it("should throw error if geminiService return a NaN", async () => {
      const geminiMockedMessage = "Não foi possível extrair o valor da imagem"
      vi.mocked(
        GeminiService.prototype.extractMeasureFromImage
      ).mockReturnValueOnce(Promise.resolve(geminiMockedMessage))

      await expect(app.upload(mockUploadPayload)).rejects.toThrowError(
        expect.objectContaining(new BadRequestException({
          code: "INVALID_DATA", message: geminiMockedMessage
        }))
      )
    })

    it("should create a new consumption", async () => {
      const geminiMockedMessage = "10"
      vi.mocked(
        GeminiService.prototype.extractMeasureFromImage
      ).mockReturnValueOnce(Promise.resolve(geminiMockedMessage))

      await app.upload(mockUploadPayload)
      const measureValue = Number(geminiMockedMessage)

      expect(ConsumptionRepository.prototype.create).toHaveBeenCalledWith({
        measure_value: measureValue,
        measure_type: mockUploadPayload.measure_type,
        measure_datetime: mockUploadPayload.measure_datetime,
        image_url: "iamgem",
        customer_code: mockUploadPayload.customer_code
      })
    })

  })

  describe(ConsumptionApp.prototype.confirm, () => {
    it("should throw error if no has consumption reading", async () => {
      await expect(app.confirm(mockConfirmPayload)).rejects.toThrowError(
        expect.objectContaining(new NotFoundException({
          message: "Leitura do mês já realizada", code: "MEASURE_NOT_FOUND"
        })
        )
      )
    })

    it("should throw error if measure was be confirmed", async () => {
      vi.mocked(
        ConsumptionRepository.prototype.findOne
      ).mockReturnValueOnce(Promise.resolve({
        ...mockUploadAppResponse,
        has_confirmed: true
      } as any))


      await expect(app.confirm(mockConfirmPayload)).rejects.toThrowError(
        expect.objectContaining(new ConflictException({
          message: "Leitura do mês já realizada", code: "CONFIRMATION_DUPLICATE"
        })
        )
      )
    })

    it("should update consumption to confirmed", async () => {
      vi.mocked(
        ConsumptionRepository.prototype.findOne
      ).mockReturnValueOnce(Promise.resolve(mockUploadAppResponse as any))

      await app.confirm(mockConfirmPayload)

      expect(ConsumptionRepository.prototype.updateOne).toHaveBeenCalledWith(
        mockConfirmPayload.measure_uuid,
        {
          measure_value: mockConfirmPayload.confirmed_value,
          has_confirmed: true
        }
      )
    })
  })

  describe(ConsumptionApp.prototype.list, () => {
    it("should throw error if not found measures", async () => {
      vi.mocked(
        ConsumptionRepository.prototype.groupByCustomerCode
      ).mockReturnValueOnce(Promise.resolve(null))

      await expect(app.list("teste")).rejects.toThrowError(
        expect.objectContaining(new NotFoundException({
          code: "MEASURES_NOT_FOUND",
          message: "Nenhuma leitura encontrada"
        }))
      )
    })
  })

})
