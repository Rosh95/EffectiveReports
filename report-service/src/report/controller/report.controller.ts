import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {ReportService} from '../service/report.service';
import {CreateReportDto} from '../dto/create-report.dto';
import {ValidateHeadersPipe} from "../validation/validate-headers.pipe";

@Controller('reports')
export class ReportController {
    constructor(private readonly reportService: ReportService) {
    }

    @Post()
    async createReport(@Body(ValidateHeadersPipe) createReportDto: CreateReportDto): Promise<{ taskId: string }> {
        const taskId = await this.reportService.createReportTask(createReportDto);
        return {taskId};
    }

    @Get(':id/status')
    async getReportStatus(@Param('id') id: string): Promise<{ status: string; documentUrl?: string  }> {
        return await this.reportService.getReportStatus(Number(id));
    }
}
