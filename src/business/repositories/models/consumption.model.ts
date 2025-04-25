import { model, Schema, InferSchemaType } from "mongoose"
import { randomUUID } from "node:crypto"

const ConsumptionSchema = new Schema({
  measure_uuid: { default: () => randomUUID(), type: String },
  customer_code: { type: String },
  measure_datetime: { type: Date },
  measure_type: { type: String },
  measure_value: { type: Number },
  has_confirmed: { type: Boolean, default: false },
  image_url: { type: String },
}, { timestamps: true })

export const ConsumptionModel = model("consumption", ConsumptionSchema)
export type ConsumptionEntity = InferSchemaType<typeof ConsumptionSchema>
