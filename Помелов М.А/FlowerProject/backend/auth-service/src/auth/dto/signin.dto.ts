import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";


export class SigninDto {
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6, { message: 'Пароль должен содержать минимум 6 символов' })
  @MaxLength(100, { message: 'Пароль не должен превышать 100 символов' })
  readonly password: string;
}