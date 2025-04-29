import { ListByCustomerCode } from "../../business/repositories/dtos/list-by-customer_code.dto"
import { MeasureType } from "../../types/MeasureType"

interface Measure {
  measure_uuid: string,
  measure_datetime: string,
  measure_type: MeasureType,
  has_confirmed: boolean,
  image_url: string
}

interface ListViewModel {
  customer_code: string
  measures: Measure[]
} 

export const mapToListMeasures = (obj: ListByCustomerCode): ListViewModel => ({
  customer_code: obj._id,
  measures: obj.measures.map(measure => ({
    measure_type: measure.measure_type,
    measure_uuid: measure.measure_uuid,
    has_confirmed: measure.has_confirmed,
    image_url: measure.image_url,
    measure_datetime: measure.measure_datetime.toString() 
  }))
})
