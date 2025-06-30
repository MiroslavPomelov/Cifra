import { IsNumber, IsString, Max, Min } from "@nestjs/class-validator";

export class CreateReportDto {
    
    @IsNumber()
    readonly userId: number;
    
    @IsNumber()
    readonly productId: number;    
    
    @IsString()
    readonly title: string;  
        
    @IsString()
    readonly reportInfo: string;
        
    @IsNumber()
    @Min(1)
    @Max(5)    
    readonly rating: number;
}