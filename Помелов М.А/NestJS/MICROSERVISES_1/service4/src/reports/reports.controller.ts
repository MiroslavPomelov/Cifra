import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dtos/createReport.dto';
import { ValidateNested } from '@nestjs/class-validator';
import { Type } from '@nestjs/class-transformer';
import { ReviewDto } from './dtos/review.dto';
import { Report } from './interfaces/report.interface';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Post()
  @ValidateNested()
  @Type(() => ReviewDto)
  async create(@Body() createReportDto: CreateReportDto): Promise<Report> {
    return this.reportsService.create(createReportDto);
  }

  @Get()
  async findAll(): Promise<Report[]> {
    return this.reportsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Report> {
    return this.reportsService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateOrderDto: CreateReportDto,
  ): Promise<Report> {
    return this.reportsService.update(id, updateOrderDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<any> {
    return this.reportsService.delete(id);
  }
}
