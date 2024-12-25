
import { ArrayMaxSize, ArrayMinSize, ArrayNotEmpty, ArrayUnique, IsAlpha, IsArray, IsBoolean, IsCreditCard, IsDate, IsDefined, IsDivisibleBy, IsEmail, IsEmpty, IsInt, IsIP, IsJSON, IsLowercase, IsNegative, IsNotEmpty, IsNumber, IsOptional, IsPhoneNumber, IsString, IsUppercase, IsUrl, Max, MaxLength, Min, MinLength } from "class-validator";

export class UsersDto {
    @IsString()
    readonly name: string;

    @IsEmail()
    readonly email: string;

    @IsUrl()
    readonly webSite: string;

    @IsPhoneNumber()
    readonly phone: string;

    @IsNumber()
    @IsNumber({ allowNaN: true })
    @IsInt()
    readonly age: number;

    @IsBoolean()
    readonly isAdult: boolean;

    @IsDate()
    readonly isDate: Date;

    @IsArray()
    readonly children: string[];

    @IsAlpha() // Проверяет содержит ли строка только буквы
    @IsUppercase()
    @IsLowercase()
    @IsJSON()
    @IsIP()
    @IsCreditCard()
    @MaxLength(50)
    @MinLength(10)
    readonly shared: string;


    @Min(20)
    @Max(100)
    @IsNegative()
    @IsDivisibleBy(2)
    readonly sharedNum: number;

    @ArrayNotEmpty()
    @ArrayMinSize(5)
    @ArrayMaxSize(20)
    @ArrayUnique()
    @IsDefined() // Должно существовать, не undefined
    readonly shareArr: number[];

    @IsEmpty()
    @IsNotEmpty()
    readonly data: object | undefined | null;

    @IsOptional()
    readonly optionalField?: string;
}
