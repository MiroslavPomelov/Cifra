import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
@ApiProperty({ example: 'Ivanov Valeryy', description: 'Имя пользователя' })
name: string;


@ApiProperty({ example: 'ivanov@example.com', description: 'Email пользователя' })
email: string;


@ApiProperty({ example: 30, description: 'Возраст пользователя' })
age: number;
}