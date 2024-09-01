import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReportModule } from './report/report.module';
import {PrismaModule} from "../prisma/prisma.module";
import {HttpModule} from "@nestjs/axios";

@Module({
  imports: [ReportModule, PrismaModule, HttpModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
