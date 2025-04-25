import { FastifyInstance } from "fastify";
import Container from "typedi";
import { ConsumptionApp } from "../../business/apps/consumption.app";
import { UploadDto, uploadSchema } from "../schemas/upload.schema";

export function ConsumptionController(server: FastifyInstance<any>) {
  const app = Container.get(ConsumptionApp)

  server.post(
    "/upload",
    {
      schema: {
        body: uploadSchema
      },
    },
    async (req, res) => {
      const body = req.body as UploadDto
      const result = await app.upload(body)
    })

  server.get("/", () => {
  })

}
