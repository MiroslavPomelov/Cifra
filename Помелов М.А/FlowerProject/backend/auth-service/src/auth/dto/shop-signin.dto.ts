import { IsEmail, IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';

export class ShopSigninDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(100)
  password: string;
} 