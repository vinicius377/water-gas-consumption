import { FastifyInstance } from "fastify";
import Container from "typedi";
import { ConsumptionApp } from "../../business/apps/consumption.app";
import { uploadSchema } from "../schemas/upload.schema";
import { BadRequestException } from "../../exceptions/BadRequestException";

export function ConsumptionController(server: FastifyInstance<any>) {
  const app = Container.get(ConsumptionApp)

  server.post(
    "/upload",
    {
      schema: {
        body: uploadSchema
      }
    },
    async (req, res) => {
      const result = await app.upload()
    })

  server.get("/", () => {
    throw new BadRequestException({ error_code: "teste", error_description: "asdasd"})
  })

}
