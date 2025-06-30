import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dtos/createReport.dto';
import { Report } from './interfaces/report.interface';
import { UpdateReportDto } from './dtos/updateReport.dto';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Post('new') 
  @UsePipes(new ValidationPipe())
  public async create(@Body() createReportDto: CreateReportDto): Promise<Report> {
    try { return this.reportsService.create(createReportDto) }    
    catch (error){ throw error }     
  }

  @Get('all')
  public async findAll(): Promise<Report[]> {
    try{return this.reportsService.findAll() }
    catch (error){ throw error }
  }

  @Get(':id')
  public async findOne(@Param('id') id: number): Promise<Report[]> {
    try{ return this.reportsService.findAllReportsByUserId(id) }
    catch (error){ throw error }
  }

  @Patch('update')
  @UsePipes(new ValidationPipe())
  public async update(
    @Query('userId', ParseIntPipe) userId: number, @Query('productId', ParseIntPipe) productId: number,
    @Body() updateReview: UpdateReportDto
  ): Promise<Report> {
    try{ return this.reportsService.updateReportByUserIdAndProductId(userId, productId, updateReview) }
    catch (error){ throw error }
  }

  @Delete('delete')
  public async delete(@Query('userId', ParseIntPipe) userId: number, @Query('productId', ParseIntPipe) productId: number): Promise<any> {
    try { return this.reportsService.deleteReportByUserIdAndProductId(userId, productId) }
    catch (error){ throw error }
  }
}
