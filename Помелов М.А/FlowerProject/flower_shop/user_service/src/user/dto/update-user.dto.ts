import { IsOptional, IsString, MinLength, IsNotEmpty } from 'class-validator';

export class UpdateUserDto {
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