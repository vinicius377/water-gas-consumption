import Container from "typedi";
import { ConsumptionApp } from "../../business/apps/consumption.app";
import { uploadSchema } from "../schemas/upload.schema";
import { mapToUploadViewModel } from "../mappers/upload.mapper";
import { FastifyAppType } from "../../app";
import { confirmSchema } from "../schemas/confirm.schema";
import { listSchema } from "../schemas/list.schema";

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
      const result = await app.upload(req.body)
      res.code(200).send(mapToUploadViewModel(result))
    })

  server.patch(
    "/confirm",
    {
      schema: {
        body: confirmSchema
      }
    },
    async (req, res) => {
      await app.confirm(req.body)

      res.code(200).send({
        success: true
      })
    })

  server.get(
    "/:costumerCode/list",
    {
      schema: {
        querystring: listSchema
      }
    },
    async (req, res) => {
      res.send(300)
    }
  )

}
