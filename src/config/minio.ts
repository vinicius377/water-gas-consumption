import * as minIo from "minio"

export const minIoClient = new minIo.Client({
  endPoint: "minio",
  useSSL: false,
  port: 9000,
  secretKey: process.env.MINIO_ROOT_PASSWORD,
  accessKey: process.env.MINIO_ROOT_PASSWORD,
})
