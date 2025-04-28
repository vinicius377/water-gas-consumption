import { describe, expect, it } from "vitest";
import { uploadSchema } from "./upload.schema";
import { mockUploadPayload } from "../../_mocks_/upload-route";
import { pdfImage } from "../../_mocks_/images-base64";

describe("uploadSchema", () => {
  it("should throw error when no provide an payload", () => {
    expect(() => uploadSchema.parse({})).toThrowError()
  })

  it("should throw error when base64 is invalid", () => {
    const payload = {
      ...mockUploadPayload,
      image: "aaa"
    }
    expect(() => uploadSchema.parse(payload)).toThrowError()
  })

  it("should throw error when base64 is invalid mimeType", () => {
    const payload = {
      ...mockUploadPayload,
      image: pdfImage
    }
    expect(() => uploadSchema.parse(payload)).toThrowError()
  })

  it("should throw error if measureType is invalid", () => {
    const payload = {
      ...mockUploadPayload,
      measure_type: "teste"
    }
    expect(() => uploadSchema.parse(payload)).toThrowError()
  })



  it("should resolve if payload is valid", () => {
    expect(uploadSchema.parse(mockUploadPayload)).toBeTruthy()
  })
})
