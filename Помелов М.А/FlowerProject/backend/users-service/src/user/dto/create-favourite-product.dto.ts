import { IsNumber, IsString, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateFavouriteProductDto {
    @IsNumber()
    productId: number;

    @IsString()
    productName: string;

    @IsOptional()
    @IsString()
    productDescription?: string;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    productPrice?: number;

    @IsOptional()
    @IsString()
    productImage?: string;
} 