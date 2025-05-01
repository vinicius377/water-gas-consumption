import { Service } from "typedi";
import { minIoClient } from "../../config/minio";
import { getMetaDataFromBase64 } from "../../utils/getMetaDataFromBase64";
import { logger } from "../../utils/logger";

@Service()
export class MinIoService {
  private readonly bucketName = "measure-images"
  private checkingPromise!: Promise<void>

  constructor() {
    this.checkingPromise = this.checkBucket()
  }

  async uploadImage(imageBase64: string) {
    logger.info("Image will be upload", [MinIoService.name, this.uploadImage.name])
    await this.checkingPromise

    const imageBuffer = Buffer.from(imageBase64, "base64")
    const imageMetaData = getMetaDataFromBase64(imageBase64)
    const size = imageBuffer.length
    const imageName = this.getImageName(imageMetaData?.extension)

    await minIoClient.putObject(
      this.bucketName,
      imageName,
      imageBuffer,
      size,
      {
        "Content-type": imageMetaData?.mimeType || ""
      }
    )

    return `http://localhost:9000/${this.bucketName}/${imageName}`
  }

  private getImageName(extension = "jpg") {
    return `measure-${Date.now()}.${extension}`
  }

  private async checkBucket() {
    const bucketExist = await minIoClient.bucketExists(this.bucketName)

    if (!bucketExist) {
      await minIoClient.makeBucket(this.bucketName)
    }

    const policy = {
      Version: "2012-10-17",
      Statement: [
        {
          Effect: "Allow",
          Principal: { AWS: ["*"] },
          Action: ["s3:GetObject"],
          Resource: [`arn:aws:s3:::${this.bucketName}/*`]
        }
      ]
    };

    await minIoClient.setBucketPolicy(this.bucketName, JSON.stringify(policy))
  }
}
