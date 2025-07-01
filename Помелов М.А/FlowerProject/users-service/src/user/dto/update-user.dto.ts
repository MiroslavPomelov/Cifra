import { IsOptional, IsString, MinLength, IsNotEmpty, MaxLength, IsDate, IsNumber } from 'class-validator';
import { Type, Transform, plainToClass } from 'class-transformer';
import { CreateUserDto } from './create-user.dto';
import { PartialType } from '@nestjs/mapped-types';
import { Logger } from '@nestjs/common';
import { UserBasket } from '../interfaces/user.basket';



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

  @IsString()
  @IsNotEmpty()
  @MaxLength(12)
  phone: string;

  basket: UserBasket[] | null;

  shopId: number | null;

  @IsNumber()
  bonus: number;

  // Статический метод для валидации и трансформации
  static fromRequest(data: any): UpdateUserDto {

    // Проверяем на дополнительные поля
    const allowedFields = [
      'password', 'firstName', 'lastName',
      'birthDate', 'city', 'bonus', 'phone'
    ];

    const receivedFields = Object.keys(data);
    const extraFields = receivedFields.filter(field => !allowedFields.includes(field));

    if (extraFields.length > 0) {
      this.logger.warn(`Попытка обновить недопустимые поля: ${extraFields.join(', ')}`);
      throw new Error(`Недопустимые поля: ${extraFields.join(', ')}`);
    }

    return plainToClass(UpdateUserDto, data);
  }
}