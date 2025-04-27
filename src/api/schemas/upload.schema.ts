import { z } from "zod"
import { MeasureType } from "../../types/MeasureType"
import { getMimeTypeFromBase64 } from "../../utils/getMimeTypeFromBase64"

export const uploadSchema = z.object({
  image: z.preprocess(
    x => {
      if (typeof x === "string") {
        const [typeOrData, data] = x.split("base64,")
        return data ?? typeOrData
      }
    },
    z.string({ required_error: "Imagem obrigatória" })
      .base64("Deve ser uma imagem em base64")
      .refine(x => !!getMimeTypeFromBase64(x), "Só são permitidos imagems em JPG, PNG, WEBP ou HEIC")
    ,
  ),
  customer_code: z.string({ required_error: "Código do cliente obrigatório " }),
  measure_datetime: z.string({ required_error: "Data obrigatória" }).datetime("A data deve ser uma data válida"),
  measure_type: z.preprocess(
    x => typeof x === "string" && x.toUpperCase(),
    z.nativeEnum(MeasureType, { message: 'O tipo deve ser "WATER" ou "gas"' })
  )
})

export type UploadDto = z.infer<typeof uploadSchema>
