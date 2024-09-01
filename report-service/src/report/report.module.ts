import {Module} from '@nestjs/common';
import {ReportService} from './service/report.service';
import {ReportController} from './controller/report.controller';
import {HttpModule} from '@nestjs/axios';
import {PrismaModule} from "../../prisma/prisma.module";
import {S3StorageAdapter} from "../files/adapters/s3-storage-adapter-service";
import {CustomerServiceClient} from "../client/customer-service/customer-service.client";
import {ReportRepository} from "./repository/report.repository";

@Module({
    imports: [PrismaModule, HttpModule],
    controllers: [ReportController],
    providers: [ReportService, S3StorageAdapter, CustomerServiceClient, ReportRepository],
})
export class ReportModule {
}
