
interface SignatureType {
  signature: RegExp,
  mimeType: string,
  extension: string
}

// Magic numbers (https://en.wikipedia.org/wiki/Magic_number_(programming))
const signatureTypes: SignatureType[] = [
   {
    signature: /89504E470D0A1A0A/i,
    extension: "png",
    mimeType: "image/png"
  },
    {
    signature: /^FFD8FFE[01E]/i,
    extension: "jpg",
    mimeType: "image/jpg"
  },
  {
    signature: /52494646.{8}57454250/i,
    extension: "webp",
    mimeType: "image/webp"
  },
  {
    signature: /6674797068656963667479706d/i,
    extension: "heic",
    mimeType: "image/heic"
  }, 
]

export function getMetaDataFromBase64(base64: string) {
  const imageInHex = Buffer.from(base64, "base64").toString("hex")

  for (const signatureType of signatureTypes) {
    if (
      signatureType.signature.test(imageInHex)
    ) return signatureType
  }

  return null
}
