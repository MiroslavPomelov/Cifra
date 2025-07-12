import { IsString, IsNotEmpty, MaxLength, IsOptional, IsEmail, MinLength } from 'class-validator';

export class CreateShopDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  description?: string;

  @IsEmail()
  @IsNotEmpty()
  @MaxLength(100)
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(100)
  password: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  address: string;

  @IsString()
  @IsOptional()
  @MaxLength(20)
  phone?: string;
} 