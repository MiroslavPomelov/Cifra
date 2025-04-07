import { ApiProperty } from '@nestjs/swagger';


export class User {
    @ApiProperty({ example: 1, description: 'ID пользователя' })
    id: number;


    @ApiProperty({ example: 'Ivanov Valeryy', description: 'Имя пользователя' })
    name: string;


    @ApiProperty({ example: 'ivanov@example.com', description: 'Email пользователя' })
    email: string;
}