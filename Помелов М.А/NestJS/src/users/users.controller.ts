import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  public async doSome(): Promise<{ message: string }> {
    return { message: "success" }
  }
}
