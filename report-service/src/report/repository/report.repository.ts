import {Injectable} from "@nestjs/common";
import {PrismaService} from "../../../prisma/prisma.service";
import {IReportRepository} from "./report.repository.interface";
import {CreateReportDto} from "../dto/create-report.dto";
import {ReportStatus} from "../enums/statusEnums";

@Injectable()
export class ReportRepository implements IReportRepository {
    constructor(private readonly prisma: PrismaService) {
    }

    async createReport(createReportDto: CreateReportDto) {
        return this.prisma.reportTask.create({
            data: {
                serviceName: createReportDto.serviceName,
                endpoint: createReportDto.endpoint,
                headers: createReportDto.headers,
                status: 'PENDING',
            },
        });
    }

    async updateReportStatus(reportId: number, status: ReportStatus) {
        return this.prisma.reportTask.update({
            where: {id: reportId},
            data: {status: status},
        });
    }

    async updateReportStatusAndDocumentUrl(reportId: number, status: ReportStatus, documentUrl: string) {
        return this.prisma.reportTask.update({
            where: {id: reportId},
            data: {status: status, documentUrl: documentUrl},
        });
    }

    async findReportById(reportId: number) {
        return this.prisma.reportTask.findUnique({where: {id: reportId}});
    }


}