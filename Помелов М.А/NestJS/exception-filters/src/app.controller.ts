import { Controller, Get, HttpException, HttpStatus, InternalServerErrorException, UseFilters } from '@nestjs/common';
import { AppService } from './app.service';
import { error } from 'console';
import { CustomHttpException } from './exception/custom-http-exception';
import { CustomHttpExceptionFilter } from './exception/filters/custom-http-exception-filter';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseFilters(new CustomHttpExceptionFilter())
  @Get('err')
  public async getError(): Promise<never> {
    // throw new HttpException('Server error', HttpStatus.BAD_GATEWAY);

    // throw new HttpException({
    //   status: 'Ban',
    //   error: 'Servredasdasd'
    // }, HttpStatus.BAD_GATEWAY)

    throw new HttpException('AOAOAOAOAO', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
