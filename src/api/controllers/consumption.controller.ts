import Container from "typedi";
import { ConsumptionApp } from "../../business/apps/consumption.app";
import { uploadSchema } from "../schemas/upload.schema";
import { mapToUploadViewModel } from "../mappers/upload.mapper";
import { FastifyAppType } from "../../app";
import { confirmSchema } from "../schemas/confirm.schema";
import { ListDto, listSchema } from "../schemas/list.schema";
import { FastifyRequest } from "fastify";
import { mapToListMeasures } from "../mappers/list-measures.mapper";

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
    async (
      req: FastifyRequest<{ Params: { costumerCode: string }, Querystring: ListDto }>,
      res
    ) => {
      console.log(req.params, req.query)
      const costumerCode = req.params.costumerCode
      const measureType = req.query.measure_type

      const list = await app.list(costumerCode, measureType)

      res.code(200).send(mapToListMeasures(list))
    }
  )

}
