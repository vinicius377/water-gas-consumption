import { listSchema } from "./list.schema"

describe("listSchema", () => {
  it("should be case insensitive", () => {
    expect(() => listSchema.parse({ measure_type: "gas" })).toBeTruthy()
  })

  it("should throw error to another value", () => {
    expect(() => listSchema.parse({ measure_type: "teste" })).toThrowError()
  })

  it("should have measure_type as optional", () => {
    expect(() => listSchema.parse({})).toBeTruthy()
  })
})
