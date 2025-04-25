import Container from "typedi";
import { ConsumptionApp } from "../../business/apps/consumption.app";
import { uploadSchema } from "../schemas/upload.schema";
import { mapToUploadViewModel } from "../mappers/upload.mapper";
import { FastifyAppType } from "../../app";

export function ConsumptionController(server: FastifyAppType) {
  const app = Container.get(ConsumptionApp)

  server.post(
    "/upload",
    {
      schema: {
        body: uploadSchema
      },
    },
    async (req, res) => {
      const body = req.body

      const result = await app.upload(body)
      res.code(200).send(mapToUploadViewModel(result))
    })

  server.get("/", () => {
  })

}
