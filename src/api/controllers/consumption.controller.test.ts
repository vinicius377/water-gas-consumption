import "reflect-metadata"
import { ConsumptionController } from "./consumption.controller";
import { FastifyApp } from "../../app";
import Container from "typedi";
import { mockUploadAppResponse, mockUploadPayload, mockUploadResponse } from "../../_mocks_/upload-route";
import { mockConfirmPayload } from "../../_mocks_/confirm-route";

const mockConsumptionApp = {
  upload: () => (mockUploadAppResponse)
}

describe(ConsumptionController.name, () => {
  vi.spyOn(Container, "get").mockReturnValue(mockConsumptionApp)
  const app = new FastifyApp().setupFastifyServer()

  it("should send 404 code if url is not found", () => {
    app.inject({
      method: "POST",
      url: "/test",
    }, (_, response) => {
      expect(response?.statusCode).toBe(404)
    })
  })

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

  it("/upload should send 400 code when a payload error occurs", () => {
    app.inject({
      method: "POST",
      url: "/upload",
    }, (_, response) => {
      expect(response?.statusCode).toBe(400)
    })
  })

  it("/confirm should send 400 code a when payload error occurs", () => {
    app.inject({
      method: "PATCH",
      url: "/confirm"
    }, (_, response) => {
      expect(response?.statusCode).toBe(400)
    })
  })

  it("/confirm should send 200 code and data when successfull", () => {
    app.inject({
      method: "PATCH",
      url: "/confirm",
      body: mockConfirmPayload
    }, (_, response) => {
      expect(response?.statusCode).toBe(200)
      expect(JSON.parse(response?.payload || "")).toEqual({
        success: true
      })
    })
  })
})
