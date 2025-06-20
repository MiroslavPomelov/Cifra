import { Type } from 'class-transformer';
import { IsEmail, IsString, IsNotEmpty, MinLength, MaxLength, IsPhoneNumber, IsEnum, IsNumber, Min, Max, IsBoolean, IsIn, IsDate } from 'class-validator';


export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(100)
  password: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  @Min(14)
  @Max(120)
  birthDate: Date;

  @IsPhoneNumber()
  phone: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsBoolean()
  @IsIn([true])
  personalData: boolean;
}