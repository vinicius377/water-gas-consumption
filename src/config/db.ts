import mongoose from "mongoose"
import { logger } from "../utils/logger"

export async function connectDB() {
  const MONGO_DB = process.env.MONGO_DB

  if (!MONGO_DB) {
    throw new Error("Missing MONGO_DB env")
  }

  try {
    await mongoose.connect(MONGO_DB)
    logger.info("Success DB connection")
  } catch (err: any) {
    logger.error(err, [connectDB.name])
  }

}
