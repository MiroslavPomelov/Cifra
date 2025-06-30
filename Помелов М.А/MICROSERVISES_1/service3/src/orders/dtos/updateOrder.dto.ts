import { IsArray } from "class-validator";

export class UpdateOrderDto { 
    @IsArray()    
    readonly productsids: number[];    
}