import * as dotenv from 'dotenv'

class Configuration {
    private static loadEnv() {
        const environment = [
            'development',
            'test',
            'production',
            'staging',
        ].includes(process.env.NODE_ENV)
            ? process.env.NODE_ENV
            : ''

        const envFilePath = environment ? ['.env', `.env.${environment}`] : ''
        dotenv.config({path: envFilePath, override: true})
    }

    private static readEnvVariableWithDefault(
        variable: string,
        defaultValue: any
    ) {
        return process.env[variable] || defaultValue
    }

    private static getPort(): number {
        return Number(this.readEnvVariableWithDefault('PORT', 3001))
    }


    private static getYandexS3KeyId(): string {
        return String(
            this.readEnvVariableWithDefault('YANDEX_S3_KEY_ID', 'yandex key id')
        )
    }

    private static getYandexS3SecretKey(): string {
        return String(
            this.readEnvVariableWithDefault(
                'YANDEX_S3_SECRET_KEY',
                'yandex secret key'
            )
        )
    }

    private static getYandexS3BucketName(): string {
        return String(
            this.readEnvVariableWithDefault(
                'YANDEX_S3_BUCKET_NAME',
                'yandex secret key'
            )
        )
    }

    private static getYandexS3Endpoint(): string {
        return String(
            this.readEnvVariableWithDefault(
                'YANDEX_S3_ENDPOINT',
                'yandex endpoint'
            )
        )
    }

    private static getYandexS3EndpointWithBucket(): string {
        return String(
            this.readEnvVariableWithDefault(
                'YANDEX_S3_ENDPOINT_WITH_BUCKET',
                'yandex endpoint with bucket'
            )
        )
    }

    static getConfiguration() {
        Configuration.loadEnv()
        return {
            PORT: Configuration.getPort(),
            YANDEX_S3_KEY_ID: Configuration.getYandexS3KeyId(),
            YANDEX_S3_SECRET_KEY: Configuration.getYandexS3SecretKey(),
            YANDEX_S3_BUCKET_NAME: Configuration.getYandexS3BucketName(),
            YANDEX_S3_ENDPOINT: Configuration.getYandexS3Endpoint(),
            YANDEX_S3_ENDPOINT_WITH_BUCKET:
                Configuration.getYandexS3EndpointWithBucket(),
        }
    }
}

export default Configuration
