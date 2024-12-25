import { IsInt, IsNotEmpty, IsString, Min } from "class-validator";

export class WarehouseDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    address: string;

    @IsInt()
    @IsNotEmpty()
    @Min(0)
    capacity: string;

    @IsInt()
    @IsNotEmpty()
    currentCapacity: number;
}
