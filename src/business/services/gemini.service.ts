import {  GoogleGenAI, ContentListUnion } from "@google/genai";
import { Service } from "typedi";
import { logger } from "../../utils/logger";
import { getMetaDataFromBase64 } from "../../utils/getMetaDataFromBase64";

@Service()
export class GeminiService {
  private API_KEY = process.env.GEMINI_API_KEY || ""
  private EXTRACT_MEASURE_PROMPT = process.env.EXTRACT_MEASURE_PROMPT || ""
  private ai: GoogleGenAI

  constructor() {
    if (!this.API_KEY) {
      throw new Error("Missing GEMINI_API_KEY env")
    }

    this.ai = new GoogleGenAI({ apiKey: this.API_KEY })
  }

  async extractMeasureFromImage(image: string) {
    const mimeType = getMetaDataFromBase64(image)
    logger.info(`Image will be analyzed in ${mimeType?.extension}`, [GeminiService.name, this.extractMeasureFromImage.name])

    const contents: ContentListUnion = [
      {
        inlineData: {
          mimeType: mimeType?.mimeType, 
          data: image
        }
      },
      { text: `${this.EXTRACT_MEASURE_PROMPT} (retornar so o valor em inteiro)` }
    ]

    const response = await this.ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: contents
    })

    logger.info(`Image sucessfull analyzed with result: ${response.text}`, [GeminiService.name, this.extractMeasureFromImage.name])

    return response.text
  }
}
