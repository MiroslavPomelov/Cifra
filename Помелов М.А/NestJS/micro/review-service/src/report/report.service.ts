import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateReportDto } from './dtos/report.dto';
import { Report } from './interfaces/report.interface';

@Injectable()
export class ReportService {
    constructor(
        @InjectModel('Report') private readonly ReportModel: Model<Report>
    ) { }

      public async create(createReportData: CreateReportDto): Promise<Report> {
        const createdReview: Report = new this.ReportModel(createReportData);
        return await createdReview.save();
      }
    
      public async findAll(): Promise<Report[]> {
        return await this.ReportModel.find().exec();
      }
    
      public async findOne(goodId: string): Promise<Report> {
        return await this.ReportModel.findById(goodId).exec();
      }
    
    
      public async update(reviewId: string, payload: CreateReportDto): Promise<Report> {
        return await this.ReportModel.findByIdAndUpdate(reviewId, payload, { new: true }).exec();
      }
    
      public async delete(reviewId: string): Promise<any> {
        return await this.ReportModel.findByIdAndDelete(reviewId).exec();
      }
}
