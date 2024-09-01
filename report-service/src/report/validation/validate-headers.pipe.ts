import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import {HeaderEnum} from "../enums/headerEnum";

@Injectable()
export class ValidateHeadersPipe implements PipeTransform {
    transform(value: any) {
        const headers: any[] = value.headers;

        if (!Array.isArray(headers)) {
            throw new BadRequestException('Поле headers должно быть массивом.');
        }

        const validHeaders = Object.values(HeaderEnum);

        for (const header of headers) {
            if (!validHeaders.includes(header)) {
                throw new BadRequestException(
                    `Недопустимый заголовок "${header}". Ожидалось одно из: ${validHeaders.join(', ')}`
                );
            }
        }

        return value;
    }
}
