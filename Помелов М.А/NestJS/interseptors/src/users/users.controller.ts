import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { LoggingInterceptor } from 'src/logging.interceptor';

@Controller('users')
@UseInterceptors(LoggingInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()

  public async findUsers() {
    const users: Array<{ name: string, age: number }> = [
      { name: 'Valeriy', age: 25 },
      { name: 'Innkentiy', age: 25 },
      { name: 'Alex', age: 25 },
      { name: 'Kirill', age: 25 },
      { name: 'Ilya', age: 25 },
    ];

    return users;
  }
}
