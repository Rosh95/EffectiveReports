import {ArrayNotEmpty, IsArray, IsInt, IsNotEmpty, IsOptional, IsString, Min} from 'class-validator';
import {HeaderEnum} from "../enums/headerEnum";
import {DefaultValuePipe} from "@nestjs/common";

export class CreateReportDto {
    @IsNotEmpty()
    @IsString()
    serviceName: string;

    @IsNotEmpty()
    @IsString()
    endpoint: string;

    @IsNotEmpty()
    @IsArray()
    @ArrayNotEmpty()
    headers: HeaderEnum[];

    @IsOptional()
    @IsInt()
    @Min(1)
    limit?: number;

    @IsOptional()
    @IsInt()
    @Min(0)
    offset?: number;
}