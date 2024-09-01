import {Injectable} from '@nestjs/common'
import {PutObjectCommand, PutObjectCommandOutput, S3Client,} from '@aws-sdk/client-s3'
import Configuration from "../../config/Congifuration";
import {IS3StorageAdapterService} from "./s3-storage-adapter-service.interface";

@Injectable()
export class S3StorageAdapter implements IS3StorageAdapterService {
    s3Client: S3Client

    constructor() {
        const REGION = 'ru-central1'
        this.s3Client = new S3Client({
            region: REGION,
            endpoint: Configuration.getConfiguration().YANDEX_S3_ENDPOINT,
            credentials: {
                secretAccessKey:
                Configuration.getConfiguration().YANDEX_S3_SECRET_KEY,
                accessKeyId: Configuration.getConfiguration().YANDEX_S3_KEY_ID,
            },
        })
    }

    async saveReport(
        originalName: string,
        buffer: Buffer
    ) {

        const key = `files/excel/${originalName}`
        const bucketParams = {
            Bucket: Configuration.getConfiguration().YANDEX_S3_BUCKET_NAME,
            Key: key,
            Body: buffer,
            ContentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        }

        const command = new PutObjectCommand(bucketParams)

        try {
            const uploadResult: PutObjectCommandOutput =
                await this.s3Client.send(command)

            return {
                url: key,
            }
        } catch (err) {
            console.error('Error uploading avatar:', err)
            throw err
        }
    }

}
