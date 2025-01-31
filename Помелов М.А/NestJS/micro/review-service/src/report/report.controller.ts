import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ReportService } from './report.service';
import { CreateReportDto } from './dtos/report.dto';
import { Report } from './interfaces/report.interface';

@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) { }

  @Post('reviews')
  public async createReview(@Body() createReportData: CreateReportDto): Promise<Report> {
    return await this.reportService.create(createReportData);
  }

  @Get()
  public async findAllReviews(): Promise<Report[]> {
    return await this.reportService.findAll();
  }

  @Get()
  public async findOneReview(@Param('goodId') goodId: string): Promise<Report> {
    return await this.reportService.findOne(goodId);
  }


  @Patch()
  public async updateReview(@Param('reviewId') reviewId: string, payload: CreateReportDto): Promise<Report> {
    return await this.reportService.update(reviewId, payload);
  }

  @Delete()
  public async deleteReview(@Param('reviewId') reviewId: string): Promise<any> {
    return await this.reportService.delete(reviewId);
  }
}
