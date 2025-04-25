import { z } from "zod"

export const uploadSchema = z.object({
  image: z.preprocess(
    (x) => {
      if (typeof x === "string") {
        const [typeOrData, data] = x.split("base64,")
        return data ?? typeOrData
      }
    },
    z.string({ required_error: "Obrigatório " })
      .base64("Deve ser uma imagem em base64"),
  ),
  customer_code: z.string({ required_error: "Obrigatório " }),
  measure_datetime: z.string({ required_error: "Obrigatório " }).datetime("Deve ser uma data válida"),
  measure_type: z.string({ required_error: "Obrigatório " })
})

export type UploadDto = z.infer<typeof uploadSchema>
