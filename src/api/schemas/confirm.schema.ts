import { z } from "zod";

export const confirmSchema = z.object({
  measure_uuid: z.string({ required_error: "Id é obrigatório" }).uuid("O id deve ser um UUID válido"),
  confirmed_value: z.number({ required_error: "Valor confirmado obrigatório" }).int("O valor confirmado deve ser inteiro")
})

export type ConfirmDto = z.infer<typeof confirmSchema>
