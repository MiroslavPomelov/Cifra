import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { HttpArgumentsHost } from "@nestjs/common/interfaces";
import { timeStamp } from "console";
import { Response } from "express";

@Catch(HttpException)
export class CustomHttpExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx: HttpArgumentsHost = host.switchToHttp();

        const request: Request = ctx.getRequest();
        const response: Response = ctx.getResponse();
        const status = exception.getStatus();

        response
        .status(status)
        .json({
            statusCode: status,
            timeStamp: new Date().toISOString(),
            path: request.url,
        });
    }
}
