import { ListByCustomerCode } from "../business/repositories/dtos/list-by-customer_code.dto";
import { MeasureType } from "../types/MeasureType";

export const mockList: ListByCustomerCode = {
  _id: "id",
  measures: [
    {
      createdAt: new Date(),
      updatedAt: new Date(),
      customer_code: "id",
      has_confirmed: true,
      image_url: "image",
      measure_datetime: new Date(),
      measure_type: MeasureType.GAS,
      measure_uuid: "uuid",
      measure_value: 233
    }
  ]
} 
