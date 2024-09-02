import * as dotenv from 'dotenv'

class ConfigExpress {
    private static loadEnv() {
        const environment = [
            'development',
            'test',
            'production',
            'staging',
        ].includes(process.env.NODE_ENV ?? '')
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
        return Number(this.readEnvVariableWithDefault('PORT', 3005))
    }

    private static getDatabaseUrl(): number {
        return Number(this.readEnvVariableWithDefault('DATABASE_URL', 'baseUrl'))
    }


    static getConfiguration() {
        ConfigExpress.loadEnv()
        return {
            PORT: ConfigExpress.getPort(),
            DATABASE_URL: ConfigExpress.getDatabaseUrl(),
        }
    }
}

export default ConfigExpress
