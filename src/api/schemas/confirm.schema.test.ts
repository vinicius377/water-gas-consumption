import { mockConfirmPayload } from "../../_mocks_/confirm-route"
import { confirmSchema } from "./confirm.schema"

describe("confirmSchema", () => {
  it("should throw error if id it is not a uuid", () => {
    const payload = {
      ...mockConfirmPayload,
      measure_uuid: "teste"
    }
    expect(() => confirmSchema.parse(payload)).toThrowError()
  })

  it("should throw error if confirmed value is not a integer ", () => {
    const payload = {
      ...mockConfirmPayload,
      confirmed_value: 2.3
    }

    expect(() => confirmSchema.parse(payload)).toThrowError()
  })
})
