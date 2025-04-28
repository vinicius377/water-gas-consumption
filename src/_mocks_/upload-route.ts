import { UploadDto } from "../api/schemas/upload.schema"
import { MeasureType } from "../types/MeasureType"
import { jpgImage } from "./images-base64"
import { UploadViewModel } from "../api/mappers/upload.mapper"
import { ConsumptionEntity } from "../business/repositories/models/consumption.model"

export const mockUploadPayload: UploadDto = {
  customer_code: "teste",
  image: jpgImage,
  measure_datetime: new Date().toISOString(),
  measure_type: MeasureType.GAS
} 

export const mockUploadResponse: UploadViewModel = {
  image_url: "",
  measure_uuid: "asd123",
  measure_value: 233
}

export const mockUploadAppResponse:ConsumptionEntity = {
  measure_value: mockUploadResponse.measure_value,
  measure_uuid: mockUploadResponse.measure_uuid,
  image_url: mockUploadResponse.image_url,
  createdAt: new Date(),
  updatedAt: new Date(),
  customer_code: mockUploadPayload.customer_code,
  has_confirmed: false,
  measure_datetime: new Date(),
  measure_type: mockUploadPayload.measure_type

}
