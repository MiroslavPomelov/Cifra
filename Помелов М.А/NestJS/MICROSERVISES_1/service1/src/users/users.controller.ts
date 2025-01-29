import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import UserDto from './dto/user.dto';
import { User } from './entities/user.entity';
import UserRole from './shared/userRole.enum';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('all')
  public async findAll(): Promise<User[]> {
    return this.usersService.findALL();
  }

  @Post('new')
  public async create(@Body() user: UserDto): Promise<User> {
    return this.usersService.create(user);
  }  

  @Get(':id')
  public async getOneById(@Param('id') id: number): Promise<User> {
    return this.usersService.getOneById(id);
  } 

  @Get('role/:id')
  public async getRoleById(@Param('id') id: number): Promise<UserRole> {
    return this.usersService.getRoleById(id);
  } 

  @Patch('update/:id')
  public async updateUser(
    @Param('id') id: number,
    @Body() userData: UserDto,
  ): Promise<User> {
    return this.usersService.updateUser(id, userData);
  }

  @Get('create/:number')
  public async createUsersWithFaker(@Param('number') number: number): Promise<User[]> {
    return this.usersService.fillDbWithFaker(number);
  } 
}
