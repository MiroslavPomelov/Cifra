import { IsNumber, IsString, IsOptional, IsDecimal } from 'class-validator';

export class CreateFavouriteProductDto {
    @IsNumber()
    productId: number;

    @IsString()
    productName: string;

    @IsOptional()
    @IsString()
    productDescription?: string;

    @IsOptional()
    @IsDecimal()
    productPrice?: number;

    @IsOptional()
    @IsString()
    productImage?: string;
} 