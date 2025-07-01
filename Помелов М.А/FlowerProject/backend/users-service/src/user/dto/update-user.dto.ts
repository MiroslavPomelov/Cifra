import { IsOptional, IsString, MinLength, IsNotEmpty, MaxLength, IsDate, IsNumber, IsArray } from 'class-validator';
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
  password?: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  firstName?: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
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

  // Статический метод для валидации и трансформации
  static fromRequest(data: any): UpdateUserDto {
    return validateAndTransformDto(UpdateUserDto, data, [
      'password', 'firstName', 'lastName',
      'birthDate', 'city', 'bonus', 'phone', 'basket', 'shopId'
    ], UpdateUserDto.logger);
  }
}
