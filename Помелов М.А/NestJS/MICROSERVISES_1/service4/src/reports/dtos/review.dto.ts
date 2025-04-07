import { IsNumber, IsString, Max, Min } from "@nestjs/class-validator";


export class ReviewDto {
     
    @IsString()
    readonly title: string;  
    
    @IsString()
    readonly reportInfo: string;
    
    @IsNumber()
    @Min(1)
    @Max(5)    
    readonly rating: number;

}