import { IsNumber, ValidateNested } from "@nestjs/class-validator";
import { ReviewDto } from "./review.dto";
import { Type } from "@nestjs/class-transformer";


export class CreateReportDto {

    @IsNumber()
    readonly userId: string;

    @IsNumber()
    readonly goodId: string;

    @ValidateNested()
    @Type(() => ReviewDto)
    readonly report: ReviewDto;
}