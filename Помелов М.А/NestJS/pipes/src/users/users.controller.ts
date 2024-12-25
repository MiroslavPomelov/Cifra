import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/createUser.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }


  @UsePipes(new ValidationPipe())
  @Post('create')
  public async createUser(@Body() CreateUserDto: CreateUserDto): Promise<CreateUserDto> {

    return CreateUserDto;
  }
}
