import "reflect-metadata"
import { describe, expect, it, vi } from "vitest";
import { ConsumptionController } from "./consumption.controller";
import { FastifyApp } from "../../app";
import Container from "typedi";
import { mockUploadAppResponse, mockUploadPayload, mockUploadResponse } from "../../_mocks_/upload-route";

const mockConsumptionApp = {
  upload: () => (mockUploadAppResponse)
}

describe(ConsumptionController.name, () => {
  vi.spyOn(Container, "get").mockReturnValue(mockConsumptionApp)
  const app = new FastifyApp().setupFastifyServer()

  it("/upload should send 200 code and data when successfull", () => {
    app.inject({
      method: "POST",
      url: "/upload",
      body: mockUploadPayload
    }, (_, response) => {
      expect(response?.statusCode).toBe(200)
      expect(JSON.parse(response?.payload || "")).toEqual(mockUploadResponse)
    })
  })

  it("/upload should send 400 code when payload error", () => {
    app.inject({
      method: "POST",
      url: "/upload",
    }, (_, response) => {
      expect(response?.statusCode).toBe(400)
    })
  })
})
