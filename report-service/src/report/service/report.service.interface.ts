import {CreateReportDto} from '../dto/create-report.dto';
import {HeaderEnum} from "../enums/headerEnum";

export interface IReportService {

    createReportTask(createReportDto: CreateReportDto): Promise<string>;

    generateReport(taskId: number, endpoint: string, headers: HeaderEnum[], limit: number, offset: number): Promise<void>;

    getReportStatus(taskId: number): Promise<{ status: string; documentUrl?: string }>;
}
