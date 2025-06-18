import { IsOptional, IsString, MinLength, IsNotEmpty } from 'class-validator';
import { CreateUserDto } from './create-user.dto';
import {PartialType} from '@nestjs/mapped-types'

export class UpdateUserDto extends PartialType(CreateUserDto) {

    @IsOptional()
    @IsString()
    @MinLength(6)
    password_hash?: string;

    @IsOptional()
    @IsString()
    @MinLength(3)
    firstName?: string;

    @IsOptional()
    @IsString()
    @MinLength(3)
    lastName?: string;

    @IsOptional()
    @IsString()
    birthDate?: Date;

    @IsString()
    @IsNotEmpty()
    city: string;
}