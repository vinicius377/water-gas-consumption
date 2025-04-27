import { logger } from "./logger"
import { writeFile } from "node:fs"

interface SignatureType {
  signature: RegExp,
  mimeType: string,
  label: string
}

// Magic numbers (https://en.wikipedia.org/wiki/Magic_number_(programming))
const signatureTypes: SignatureType[] = [
   {
    signature: /89504E470D0A1A0A/i,
    label: "PNG",
    mimeType: "image/png"
  },
    {
    signature: /^FFD8FFE[01E]/i,
    label: "JPG",
    mimeType: "image/jpg"
  },
  {
    signature: /52494646.{8}57454250/i,
    label: "WEBP",
    mimeType: "image/webp"
  },
  {
    signature: /6674797068656963667479706d/i,
    label: "HEIC",
    mimeType: "image/heic"
  }, 
]

export function getMimeTypeFromBase64(base64: string) {
  const imageInHex = Buffer.from(base64, "base64").toString("hex")
  // INFO:remove this before
  //writeFile("./test", imageInHex, null, () => {})

  for (const signatureType of signatureTypes) {
    if (
      signatureType.signature.test(imageInHex)
    ) return signatureType
  }

  return null
}
