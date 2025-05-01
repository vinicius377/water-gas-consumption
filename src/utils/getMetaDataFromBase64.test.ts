import { describe, expect, it } from "vitest";
import { getMetaDataFromBase64 } from "./getMetaDataFromBase64";
import { heicImage, jpgImage, pngImage, webpImage } from "../_mocks_/images-base64";

describe(getMetaDataFromBase64.name, () => {
  it("should return image/jpg if base64 is jpg", () => {
    const result = getMetaDataFromBase64(jpgImage)

    expect(result?.mimeType).toBe("image/jpg")
  })

  it("should return image/png if base64 is png", () => {
    const result = getMetaDataFromBase64(pngImage)

    expect(result?.mimeType).toBe("image/png")
  })

  it("should return image/webp if base64 is webp", () => {
    const result = getMetaDataFromBase64(webpImage)

    expect(result?.mimeType).toBe("image/webp")
  })

  it("should return null if its is invalid", () => {
    const result = getMetaDataFromBase64("aaa")

    expect(result).toBeNull()
  })
})
