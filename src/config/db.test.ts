import { describe, expect, it, vi } from 'vitest'
import { connectDB } from './db'

vi.mock("mongoose", { spy: true })

describe(connectDB.name, () => {
  it("should throw error if missing MONGO_DB env", async () => {
    await expect(connectDB()).rejects.toThrowError()
  })

  it("should be sucess if missing MONGO_DB env", async () => {
    vi.stubEnv("MONGO_DB", "98012hbasdibaasdadaskdhjgb")

    await expect(connectDB()).resolves.toBeUndefined()
  })
})
