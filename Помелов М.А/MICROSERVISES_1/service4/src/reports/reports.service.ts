import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateReportDto } from './dtos/createReport.dto';
import { Report } from './interfaces/report.interface';
import { getCallerInfo, logger } from 'src/logging/logger';
import { UpdateReportDto } from './dtos/updateReport.dto';

@Injectable()
export class ReportsService {
    constructor(
        @InjectModel('Report') private readonly reportModel: Model<Report>
    ){}

   public checkingCreateReportDto(reportData: CreateReportDto): void {    
        const reportKeys: string[] = ['userId', 'productId', 'title', 'reportInfo', 'rating'];
        console.log(reportKeys);
        const incomingKeys: string[] = Object.keys(reportData);
        console.log(incomingKeys);

        incomingKeys.forEach(function (value) {
          if (!reportKeys.find((key) => key == value) || reportKeys.length != incomingKeys.length) {            
            logger.info(`Некорректные входные данные!`);
            throw new BadRequestException();
          }
        });        
    }

    public checkingUpdateReportDto(updateData: UpdateReportDto): void {
        const reviewKeys: string[] = ['title', 'reportInfo', 'rating'];
        console.log(reviewKeys);
        const incomingKeys: string[] = Object.keys(updateData);
        console.log(incomingKeys);

        incomingKeys.forEach(function (value) {
          if (!reviewKeys.find((key) => key == value) || reviewKeys.length != incomingKeys.length) {
            logger.info(`Некорректные входные данные!`);
            throw new BadRequestException();
          }
        });
    }

    public async create(createReportData: CreateReportDto): Promise<Report> {
        try {
            this.checkingCreateReportDto(createReportData);

            const report: Report = await this.reportModel.findOne({ userId: createReportData.userId, productId: createReportData.productId}).exec(); 
            
            if (report) {
              logger.error(`Отзыв о товаре с userId:${createReportData.userId} и productId:${createReportData.productId} уже существует. Его можно тоолько обновить!`);
              throw new NotFoundException(`Отзыв о товаре с userId:${createReportData.userId} и productId:${createReportData.productId} уже существует. Его можно тоолько обновить!`);;
            }

            const newReport: Report = new this.reportModel({
              userId : createReportData.userId,
              productId : createReportData.productId,
              review: {
                title: createReportData.title,
                reportInfo: createReportData.reportInfo,
                rating: createReportData.rating,
              },
            });         
            
            console.log(newReport);
            const createReport: Report = await newReport.save();
            
            if (createReport) {
                logger.info('Отзыв о товаре создан!');
                return createReport; 
              }
              else {
                logger.error('Ошибка сохранения отзыва!');
                throw new NotFoundException();
              }  

        }
        catch (error) {
            logger.error(`${getCallerInfo(error)} Ошибка создания отзыва!`);
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
          }   
    }
   
    public async findAll(): Promise<Report[]> {
        try {
            const reports: Report[] = await this.reportModel.find();
            if (reports) {
              logger.info('Отзывы найдены!');
              return reports;
            }
            else {
              throw new NotFoundException();
            }       
          }
          catch (error) {
            logger.error(`${getCallerInfo(error)} Ошибка выборки всех пользовательских отзывов из БД!`);
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
          }       
    }

    public async findAllReportsByUserId(userId: number): Promise<Report[]> {
        try {
            const reports: Report[] = await this.reportModel.find({ userId: userId }).exec();
            if (reports) {
              logger.info(`Отзывы пользователя с id: ${userId}  найдены!`);
              return reports;
            }
            else {
              throw new NotFoundException();
            }       
        }
          catch (error) {
            logger.error(`${getCallerInfo(error)} Ошибка поиска отзывов пользователя с id: ${userId}!`);
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }    
        
    }

    public async updateReportByUserIdAndProductId(id: number, productId : number, payload: UpdateReportDto): Promise<Report> {
        try {
            this.checkingUpdateReportDto(payload);
      
            const report: Report = await this.reportModel.findOne({ userId: id, productId: productId}).exec();     
      
            if (report) {
            logger.info(`Отзыв пользователя с id: ${id} о товаре с id: ${productId} найден!`); 

              const updatedReport = await this.reportModel
            .findOneAndUpdate({ userId: id, productId: productId}, { $set: { "review" : payload }} , { new: true });

            if (updatedReport) {
              logger.info(`Отзыв по id пользователя:${id} о товаре с id: ${productId} обновлен!`);
              return updatedReport
            }
            else {
              logger.error(`Ошибка обновления отзыва по id пользователя:${id} о товаре с id: ${productId}!`);
              throw new NotFoundException();
            }
            }
            else {
              logger.error(`Отзыв по id пользователя:${id} о товаре с id: ${productId} не найден!`);
              throw new NotFoundException();
            }
        }
          catch (error) {
            logger.error(`${getCallerInfo(error)} Ошибка обновления отзыва по id пользователя:${id} о товаре с id: ${productId}!`);
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }   
        
    }

    public async deleteReportByUserIdAndProductId(userId: number, productId: number): Promise<any> {
        try {
            const report: Report = await this.reportModel.findOneAndDelete({ userId: userId, productId: productId }).exec();
            if (report) {
              logger.info('Отзыв удален!');
              return `Отзыв пользователя с id: ${userId} о товаре с id: ${productId} успешно удален!`;
            }
            else {
              throw new NotFoundException();
            }       
        }
          catch (error) {
            logger.error(`${getCallerInfo(error)} Ошибка удаления отзыва по id пользователя:${userId} о товаре с id: ${productId}!`);
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }      
    }
}
