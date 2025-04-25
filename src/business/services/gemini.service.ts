import { createPartFromUri, createUserContent, GoogleGenAI, File, ContentListUnion } from "@google/genai";
import { Service } from "typedi";
import { logger } from "../../utils/logger";

@Service()
export class GeminiService {
  private API_KEY = process.env.GEMINI_API_KEY || ""
  private EXTRACT_MEASURE_PROMPT = process.env.EXTRACT_MEASURE_PROMPT || ""
  private ai: GoogleGenAI

  constructor() {
    if (!this.API_KEY) {
      throw new Error("Missing GEMINI_API_KEY enviroment")
    }

    this.ai = new GoogleGenAI({ apiKey: this.API_KEY })
  }
/* 
  async uploadImage(image_base64: string) {
    const byteCharacters = Buffer.from(image_base64, "base64");
    const byteArray = new Uint8Array(byteCharacters)
    const blob = new Blob([byteArray], { type: "image/jpg"})

    this.ai.files.upload({
      file: blob,
      config: { mimeType: "image/jpg", }
    })
  } */

  async extractMeasureFromImage(image: string) {
    logger.info("Image will be analyzed", [GeminiService.name, this.extractMeasureFromImage.name])
    const contents: ContentListUnion = [{
      inlineData: {
        data: image,
        mimeType: "image/jpeg"
      }
    },
    { text: `${this.EXTRACT_MEASURE_PROMPT} (retornar somente o valor em inteiro)` }
    ]

    const response = await this.ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: contents,
    })

    return response.text
  }
}
