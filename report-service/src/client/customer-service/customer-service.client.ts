import {firstValueFrom} from "rxjs";
import {HttpService} from "@nestjs/axios";
import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {ICustomerServiceClient} from "./customer-service.client.interface";

@Injectable()
export class CustomerServiceClient implements ICustomerServiceClient {
    constructor(private readonly httpService: HttpService) {
    }
    async getData<T>(url: string, limit: number, offset: number): Promise<T> {
        try {
            const response = await firstValueFrom(
                this.httpService.get(url, {
                    params: {
                        limit,
                        offset,
                    },
                })
            );
            return response.data;
        } catch (error) {
            throw new HttpException(
                {
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Ошибка при выполнении запроса',
                },
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
}
