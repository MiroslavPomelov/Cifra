import { Type } from "class-transformer";
import UserRole from "../shared/userRole.enum";
import { IsArray, IsDateString, IsEmail, IsInt, IsISO8601, IsNotEmpty, IsNumber, IsPhoneNumber, IsString, Min, ValidateNested } from "class-validator";

class UserDto {    
  @IsString({ message: 'Имя пользователя должно быть строкой' })
  @IsNotEmpty()
  readonly username: string; 

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;  
  
  @IsNotEmpty()
  readonly password: string;
  
  @IsString()
  @IsNotEmpty()
  readonly firstName: string;
  
  @IsString()
  @IsNotEmpty()
  readonly lastName: string;

  @IsPhoneNumber()
  @IsNotEmpty()
  readonly phoneNumber:string;
  
  @IsString()
  readonly address: string;
  
  @IsString()
  readonly city: string;
  
  @IsString()
  readonly state: string;
  
  @IsString()
  readonly zipCode: string;
  
  @IsString()
  readonly country: string;
  
  @IsISO8601()
  readonly createdAt: Date;

  @IsISO8601()
  readonly updatedAt: Date;

  @IsNumber()  
  readonly role: UserRole;
}

export default UserDto;


