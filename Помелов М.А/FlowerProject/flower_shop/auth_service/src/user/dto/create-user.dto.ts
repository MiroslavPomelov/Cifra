// src/users/dto/create-user.dto.ts
import { IsEmail, IsString, IsEnum, IsPhoneNumber, Length } from 'class-validator';
import { UserRole } from '../entities/user.entity';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @Length(8, 100)
  password: string;

  @IsString()
  @Length(2, 50)
  firstName: string;

  @IsString()
  @Length(2, 50)
  lastName: string;

  @IsPhoneNumber()
  phone: string;

  @IsEnum(UserRole)
  role?: UserRole = UserRole.CUSTOMER;
}