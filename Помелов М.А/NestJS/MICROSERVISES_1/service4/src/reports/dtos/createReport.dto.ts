import { IsNumber, ValidateNested } from "@nestjs/class-validator";
import { Review } from "../interfaces/review.interface";
import { Type } from "@nestjs/class-transformer";
import { ReviewDto } from "./review.dto";


export class CreateReportDto {
    
    @IsNumber()
    readonly userId: number;
    
    @IsNumber()
    readonly productId: number;    
    
    @ValidateNested()
    @Type(() => ReviewDto)
    readonly report: Review;     
}