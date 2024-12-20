import { HttpException } from "@nestjs/common";

export class CustomHttpException extends HttpException {
    constructor() {
        super('This is user Exception', 228);
    }
}
