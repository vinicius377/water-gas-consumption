import mongoose from "mongoose"
import { MONGO_DB } from "../constants/DB_URL"
import { logger } from "../utils/logger"

export async function connectDB() {
  if (!MONGO_DB) {
    throw new Error("Missing MONGO_DB enviroment")
  }

  try {
    mongoose.connect(MONGO_DB)
    logger.info("Sucess DB connection")
  } catch (err: any) {
    logger.error(err, [connectDB.name])
  }

}
