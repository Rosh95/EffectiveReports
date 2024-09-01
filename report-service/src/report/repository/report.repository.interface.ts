import {CreateReportDto} from "../dto/create-report.dto";
import {ReportStatus} from "../enums/statusEnums";

export interface IReportRepository {

    createReport(createReportDto: CreateReportDto)

    updateReportStatus(reportId: number, status: ReportStatus)

    updateReportStatusAndDocumentUrl(reportId: number, status: ReportStatus, documentUrl: string)

    findReportById(reportId: number)

}
