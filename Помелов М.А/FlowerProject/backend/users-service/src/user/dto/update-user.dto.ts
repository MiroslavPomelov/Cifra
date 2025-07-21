import { IsOptional, IsString, MinLength, IsNotEmpty, MaxLength, IsDate, IsNumber, IsArray, Matches } from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { CreateUserDto } from './create-user.dto';
import { PartialType } from '@nestjs/mapped-types';
import { Logger } from '@nestjs/common';
import { UserBasket } from '../interfaces/user.basket';
import { validateAndTransformDto } from '../utils/dto-validation.util';



export class UpdateUserDto extends PartialType(CreateUserDto) {
  private static readonly logger = new Logger(UpdateUserDto.name);

  @IsOptional()
  @IsString()
  @MinLength(6)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,100}$/, { message: 'Пароль должен содержать только латинские буквы и цифры, минимум одну букву и одну цифру, без пробелов' })
  password?: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  @Matches(/^[A-Za-zА-Яа-яЁё\- ]+$/, { message: 'Имя должно содержать только буквы, дефис или пробел' })
  firstName?: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  @Matches(/^[A-Za-zА-Яа-яЁё\- ]+$/, { message: 'Фамилия должна содержать только буквы, дефис или пробел' })
  lastName?: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      const date = new Date(value);
      if (isNaN(date.getTime())) {
        throw new Error('Неверный формат даты');
      }
      return date;
    }
    return value;
  })
  birthDate?: Date;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  @Matches(/^[A-Za-zА-Яа-яЁё\- ]+$/, { message: 'Город должен содержать только буквы, дефис или пробел' })
  city?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(12)
  phone?: string;

  @IsOptional()
  @IsArray()
  basket?: UserBasket[] | null;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  shopId?: number | null;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  bonus?: number;

  // метод для валидации 
  static fromRequest(data: any): UpdateUserDto {
    return validateAndTransformDto(UpdateUserDto, data, [
      'password', 'firstName', 'lastName',
      'birthDate', 'city', 'bonus', 'phone', 'basket', 'shopId'
    ], UpdateUserDto.logger);
  }
}
