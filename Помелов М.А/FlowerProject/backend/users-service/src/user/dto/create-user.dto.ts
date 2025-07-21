import { Logger } from '@nestjs/common';
import { Type, Transform, plainToClass } from 'class-transformer';
import { IsEmail, IsString, IsNotEmpty, MinLength, MaxLength, IsPhoneNumber, IsBoolean, IsIn, IsDate, IsNumber, Min, IsOptional, IsArray, Matches } from 'class-validator';
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
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,100}$/, { message: 'Password must contain only Latin letters and digits, at least one letter and one digit, no spaces' })
  password: string;

  @IsString({ message: 'First name must be a string' })
  @IsNotEmpty({ message: 'First name is required' })
  @MaxLength(50, { message: 'First name must not exceed 50 characters' })
  @Matches(/^[A-Za-zА-Яа-яЁё\- ]+$/, { message: 'First name must contain only letters, hyphen or space' })
  firstName: string;

  @IsString({ message: 'Last name must be a string' })
  @IsNotEmpty({ message: 'Last name is required' })
  @MaxLength(50, { message: 'Last name must not exceed 50 characters' })
  @Matches(/^[A-Za-zА-Яа-яЁё\- ]+$/, { message: 'Last name must contain only letters, hyphen or space' })
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
  @Matches(/^[A-Za-zА-Яа-яЁё\- ]+$/, { message: 'City must contain only letters, hyphen or space' })
  city: string;

  @IsBoolean({ message: 'Consent to personal data processing must be a boolean value' })
  @IsIn([true], { message: 'Consent to personal data processing is required' })
  personalData: boolean;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

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

  // метод для валидации
  static fromRequest(data: any): CreateUserDto {
    return validateAndTransformDto(CreateUserDto, data, [
      'email', 'password', 'firstName', 'lastName',
      'birthDate', 'phone', 'city', 'personalData', 'bonus', 'basket', 'shopId', 'isActive'
    ], CreateUserDto.logger);
  }
}