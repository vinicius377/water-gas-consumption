iport { GeminiService } from "./gemini.service"

describe(GeminiService.name, () => {
  it("should throw error if missing GEMINI_API_KEY env", () => {
    expect(() => new GeminiService()).toThrowError()
  })

})
