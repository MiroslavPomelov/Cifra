import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";


export class SigninDto {
  @IsEmail({}, { message: 'Email must be a valid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  readonly email: string;

  @IsNotEmpty({ message: 'Password is required' })
  @IsString({ message: 'Password must be a string' })
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  @MaxLength(100, { message: 'Password must not exceed 100 characters' })
  readonly password: string;
}