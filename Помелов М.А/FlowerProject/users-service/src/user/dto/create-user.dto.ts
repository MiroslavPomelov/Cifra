import { Logger } from '@nestjs/common';
import { Type, Transform, plainToClass } from 'class-transformer';
import { IsEmail, IsString, IsNotEmpty, MinLength, MaxLength, IsPhoneNumber, IsBoolean, IsIn, IsDate } from 'class-validator';

export class CreateUserDto {

  private static readonly logger = new Logger(CreateUserDto.name);

  @IsEmail({}, { message: 'Email должен быть валидным email адресом' })
  @IsNotEmpty({ message: 'Email обязателен' })
  email: string;

  @IsString({ message: 'Пароль должен быть строкой' })
  @IsNotEmpty({ message: 'Пароль обязателен' })
  @MinLength(6, { message: 'Пароль должен содержать минимум 6 символов' })
  @MaxLength(100, { message: 'Пароль не должен превышать 100 символов' })
  password: string;

  @IsString({ message: 'Имя должно быть строкой' })
  @IsNotEmpty({ message: 'Имя обязательно' })
  @MaxLength(50, { message: 'Имя не должно превышать 50 символов' })
  firstName: string;

  @IsString({ message: 'Фамилия должна быть строкой' })
  @IsNotEmpty({ message: 'Фамилия обязательна' })
  @MaxLength(50, { message: 'Фамилия не должна превышать 50 символов' })
  lastName: string;

  @Type(() => Date)
  @IsDate({ message: 'Дата рождения должна быть валидной датой' })
  @IsNotEmpty({ message: 'Дата рождения обязательна' })
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

  @IsPhoneNumber('RU', { message: 'Телефон должен быть валидным российским номером' })
  @IsNotEmpty({ message: 'Телефон обязателен' })
  phone: string;

  @IsString({ message: 'Город должен быть строкой' })
  @IsNotEmpty({ message: 'Город обязателен' })
  @MaxLength(30, { message: 'Город не должен превышать 30 символов' })
  city: string;

  @IsBoolean({ message: 'Согласие с обработкой персональных данных должно быть булевым значением' })
  @IsIn([true], { message: 'Необходимо согласие с обработкой персональных данных' })
  personalData: boolean;

  // Статический метод для валидации и трансформации
  static fromRequest(data: any): CreateUserDto {
    // Проверяем на дополнительные поля
    const allowedFields = [
      'email', 'password', 'firstName', 'lastName', 
      'birthDate', 'phone', 'city', 'personalData'
    ];
    
    const receivedFields = Object.keys(data);
    const extraFields = receivedFields.filter(field => !allowedFields.includes(field));
    
    if (extraFields.length > 0) {
      this.logger.warn(`Попытка создания недопустимого поля: ${extraFields.join(', ')}`);
      throw new Error(`Недопустимые поля: ${extraFields.join(', ')}`);
    }
    
    return plainToClass(CreateUserDto, data);
  }
}