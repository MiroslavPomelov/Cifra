import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateReportDto } from './dtos/createReport.dto';
import { Report } from './interfaces/report.interface';

@Injectable()
export class ReportsService {
    constructor(
        @InjectModel('Report') private readonly reportModel: Model<Report>
   ){}

   public async create(createReportData: CreateReportDto): Promise<Report> {
    const createdReport: Report = new this.reportModel(createReportData);
    return await createdReport.save();
}

public async findAll(): Promise<Report[]> {
    return await this.reportModel.find().exec();
}

public async findOne(goodId: number): Promise<Report> {
    return await this.reportModel.findOne({
        where: { productId : goodId}}).exec();
}

public async update(id: number, payload: CreateReportDto): Promise<Report> {
    return await this.reportModel.findByIdAndUpdate(id, payload, {new: true}).exec();
}

public async delete(id: number): Promise<any> {
    return await this.reportModel.findByIdAndDelete(id).exec();
}
}
