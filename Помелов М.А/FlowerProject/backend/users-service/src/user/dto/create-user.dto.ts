import { Logger } from '@nestjs/common';
import { Type, Transform, plainToClass } from 'class-transformer';
import { IsEmail, IsString, IsNotEmpty, MinLength, MaxLength, IsPhoneNumber, IsBoolean, IsIn, IsDate, IsNumber, Min, IsOptional, IsArray } from 'class-validator';
import { UserBasket } from '../interfaces/user.basket';
import { validateAndTransformDto } from '../utils/dto-validation.util';

export class CreateUserDto {

  private static readonly logger = new Logger(CreateUserDto.name);

  @IsEmail({}, { message: 'Email must be a valid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  @MaxLength(100, { message: 'Password must not exceed 100 characters' })
  password: string;

  @IsString({ message: 'First name must be a string' })
  @IsNotEmpty({ message: 'First name is required' })
  @MaxLength(50, { message: 'First name must not exceed 50 characters' })
  firstName: string;

  @IsString({ message: 'Last name must be a string' })
  @IsNotEmpty({ message: 'Last name is required' })
  @MaxLength(50, { message: 'Last name must not exceed 50 characters' })
  lastName: string;

  @Type(() => Date)
  @IsDate({ message: 'Birth date must be a valid date' })
  @IsNotEmpty({ message: 'Birth date is required' })
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
  birthDate: Date;

  @IsPhoneNumber('RU', { message: 'Phone must be a valid Russian phone number' })
  @IsNotEmpty({ message: 'Phone is required' })
  phone: string;

  @IsString({ message: 'City must be a string' })
  @IsNotEmpty({ message: 'City is required' })
  @MaxLength(30, { message: 'City must not exceed 30 characters' })
  city: string;

  @IsBoolean({ message: 'Consent to personal data processing must be a boolean value' })
  @IsIn([true], { message: 'Consent to personal data processing is required' })
  personalData: boolean;

  @IsOptional()
  @IsArray()
  basket: UserBasket[] | null;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  shopId: number | null;

  @Type(() => Number)
  @IsNumber()
  @Min(0, { message: 'Bonus cannot be negative' })
  bonus: number;

  // Статический метод для валидации и трансформации
  static fromRequest(data: any): CreateUserDto {
    return validateAndTransformDto(CreateUserDto, data, [
      'email', 'password', 'firstName', 'lastName',
      'birthDate', 'phone', 'city', 'personalData', 'bonus', 'basket', 'shopId'
    ], CreateUserDto.logger);
  }
}