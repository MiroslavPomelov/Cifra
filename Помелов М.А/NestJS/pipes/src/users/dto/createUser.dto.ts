import { Type } from "class-transformer";
import { IsDefined, IsEmail, IsInt, IsNotEmpty, IsString, Length, Min, ValidateNested } from "class-validator";


class AddresDto {
    @IsString()
    city: string;

    @IsString()
    street: string;
}


export class CreateUserDto {
    @IsString({message: 'Имя пользователя должно быть строкой!'})
    @Length(3, 20, {message: 'Имя пользователя должно быть от 3х до 20 символов!'})
    username: string;

    @IsString()
    @Length(6)
    password: string;

    @IsEmail()
    email: string;

    @IsInt()
    @Min(18)
    age: number;

    @ValidateNested()
    @Type(() => AddresDto)
    @IsDefined()
    @IsNotEmpty()
    address: AddresDto;
}



