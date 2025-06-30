import { IsArray, IsInt, IsNumber, Min, MIN } from "class-validator";

export class CreateOrderDto {
    @IsInt()
    @Min(0)   
    readonly userid: number;
    @IsArray()
    readonly productsids: number[];    
    date?: Date;       
}