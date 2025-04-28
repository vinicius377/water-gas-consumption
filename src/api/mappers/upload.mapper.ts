import { ConsumptionEntity } from "../../business/repositories/models/consumption.model"

export interface UploadViewModel {
  image_url: string,
  measure_value: number,
  measure_uuid: string
}

export const mapToUploadViewModel = (obj: ConsumptionEntity): UploadViewModel => ({
  image_url: obj.image_url,
  measure_uuid: obj.measure_uuid,
  measure_value: obj.measure_value
})
