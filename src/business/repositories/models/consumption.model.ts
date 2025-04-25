import { model, Schema, InferSchemaType } from "mongoose"
import { randomUUID } from "node:crypto"

const ConsumptionSchema = new Schema({
  measure_uuid: { default: () => randomUUID(), type: String },
  customer_code: { type: String, required: true },
  measure_datetime: { type: Date, required: true },
  measure_type: { type: String, required: true },
  measure_value: { type: Number, required: true },
  has_confirmed: { type: Boolean, default: false },
  image_url: { type: String, required: true },
}, { timestamps: true })

export const ConsumptionModel = model("consumption", ConsumptionSchema)
export type ConsumptionEntity = InferSchemaType<typeof ConsumptionSchema>
