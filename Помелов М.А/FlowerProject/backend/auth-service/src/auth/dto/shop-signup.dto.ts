import { IsEmail, IsNotEmpty, IsString, MinLength, MaxLength, IsOptional } from 'class-validator';

export class ShopSignupDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(100)
  password: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsOptional()
  code?: string;
} 