import { IsString, IsNotEmpty, MaxLength, IsOptional, IsNumber, Min, IsPositive } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  description?: string;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  imageUrl?: string;

  // Подумать нужно или нет?
  @IsNumber()
  @IsPositive()
  @IsOptional()
  shopId?: number;
} 