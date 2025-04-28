import { describe, expect, it } from "vitest";
import { getMimeTypeFromBase64 } from "./getMimeTypeFromBase64";
import { heicImage, jpgImage, pngImage, webpImage } from "../_mocks_/images-base64";

describe(getMimeTypeFromBase64.name, () => {
  it("should return image/jpg if base64 is jpg", () => {
    const result = getMimeTypeFromBase64(jpgImage)

    expect(result?.mimeType).toBe("image/jpg")
  })

  it("should return image/png if base64 is png", () => {
    const result = getMimeTypeFromBase64(pngImage)

    expect(result?.mimeType).toBe("image/png")
  })

  it("should return image/webp if base64 is webp", () => {
    const result = getMimeTypeFromBase64(webpImage)

    expect(result?.mimeType).toBe("image/webp")
  })

  it("should return null if its is invalid", () => {
    const result = getMimeTypeFromBase64("aaa")

    expect(result).toBeNull()
  })

/* 
 * FIX: not working
  it("should return image/heic if base64 is heic", () => {
    const result = getMimeTypeFromBase64(heicImage)

    expect(result?.mimeType).toBe("image/heic")
  }) */
})
