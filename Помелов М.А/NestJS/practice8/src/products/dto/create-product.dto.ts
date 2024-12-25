import {IsInt, IsNotEmpty, IsNumber, IsString, Length, Min } from "class-validator";

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    @IsNotEmpty()
    @Min(0)
    price: number;

    @IsInt()
    @Min(0)
    stock: number

    @IsString()
    @Length(10)
    description: string;
}
