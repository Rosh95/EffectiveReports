import {Injectable, NotFoundException} from '@nestjs/common';
import {CreateReportDto} from '../dto/create-report.dto';
import {Workbook} from 'exceljs';
import {v4 as uuidv4} from 'uuid';
import {HttpService} from "@nestjs/axios";
import {S3StorageAdapter} from "../../files/adapters/s3-storage-adapter-service";
import {HeaderEnum} from "../enums/headerEnum";
import Configuration from "../../config/Congifuration";
import {CustomerServiceClient} from "../../client/customer-service/customer-service.client";
import {IReportService} from "./report.service.interface";
import {ReportRepository} from "../repository/report.repository";
import {ReportStatus} from "../enums/statusEnums";

@Injectable()
export class ReportService implements IReportService {
    constructor(
        private readonly httpService: HttpService,
        private readonly s3StorageAdapter: S3StorageAdapter,
        private readonly customerServiceClient: CustomerServiceClient,
        private readonly reportRepository: ReportRepository,
    ) {
    }

    async createReportTask(createReportDto: CreateReportDto): Promise<string> {
        const {endpoint, headers, limit = 20, offset = 0} = createReportDto;


        const reportTask = await this.reportRepository.createReport(createReportDto)

        await this.generateReport(reportTask.id, endpoint, headers, limit, offset);

        return reportTask.id.toString();
    }

    async generateReport(taskId: number, endpoint: string, headers: HeaderEnum[], limit: number, offset: number) {
        try {
            await this.reportRepository.updateReportStatus(taskId, ReportStatus.IN_PROGRESS)

            let data;
            try {
                data = await this.customerServiceClient.getData(endpoint, limit, offset)
            } catch (e) {
                throw new Error(e)
            }

            const workbook = new Workbook();
            const worksheet = workbook.addWorksheet('Report');

            worksheet.columns = headers.map((header) => ({header, key: header, width: 15}));

            data.forEach((item) => {
                const filteredItem = headers.reduce((acc, header) => {
                    acc[header] = item[header.toLowerCase()];
                    return acc;
                }, {});
                worksheet.addRow(filteredItem);
            });

            const buffer = await workbook.xlsx.writeBuffer();
            const fileName = `report-${taskId}${uuidv4()}.xlsx`;
            if (!Buffer.isBuffer(buffer)) {
                throw new Error('Ошибка при создании буфера Excel файла.');
            }

            const addFiletToStorage = await this.s3StorageAdapter.saveReport(fileName, Buffer.from(buffer))

            await this.reportRepository.updateReportStatusAndDocumentUrl(taskId, ReportStatus.COMPLETED, addFiletToStorage.url)
        } catch (error) {
            await this.reportRepository.updateReportStatus(taskId, ReportStatus.FAILED)

            console.error('Ошибка при генерации отчета:', error);
        }
    }

    async getReportStatus(taskId: number): Promise<{ status: string; documentUrl?: string }> {
        const reportTask = await this.reportRepository.findReportById(taskId)

        if (!reportTask) {
            throw new NotFoundException('Задача отчета не найдена');
        }
        if (reportTask.status !== ReportStatus.COMPLETED) {
            return {
                status: reportTask.status,
            }
        }

        return {
            status: reportTask.status,
            documentUrl: reportTask.documentUrl ? `${Configuration.getConfiguration().YANDEX_S3_ENDPOINT_WITH_BUCKET}${reportTask.documentUrl}` : null,
        };
    }
}
