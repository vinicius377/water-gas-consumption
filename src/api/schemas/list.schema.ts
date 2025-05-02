import { z } from "zod";
import { MeasureType } from "../../types/MeasureType";

export const listSchema = z.object({
  measure_type: z.preprocess(
    x => String(x).toUpperCase(),
    z.nativeEnum(MeasureType, { message: "Tipo de medição não permitida"})
  ).optional()
})

export type ListDto = z.infer<typeof listSchema>
