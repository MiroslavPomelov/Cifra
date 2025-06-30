import { IsNumber, IsString, Max, Min } from "@nestjs/class-validator";

export class UpdateReportDto {
     
    @IsString()
    readonly title: string;  
    
    @IsString()
    readonly reportInfo: string;
        
    @IsNumber()
    @Min(1)
    @Max(5)    
    readonly rating: number;

}