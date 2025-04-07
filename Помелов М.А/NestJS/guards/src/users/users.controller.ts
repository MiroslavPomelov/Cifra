import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from './guards/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }


  @Get()
  public async getSome(): Promise<string> {
    return 'Hello';
  }

  @Get('secure')
  @UseGuards(AuthGuard)
  public async getSomePrivate(): Promise<string> {
    return 'Hello from secure route';
  }
}
