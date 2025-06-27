import { Transform, Type } from "class-transformer";
import { IsDate, IsEmail, IsNotEmpty, IsPhoneNumber, IsString, MaxLength, MinLength } from "class-validator";


export class SignupDto {
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
}