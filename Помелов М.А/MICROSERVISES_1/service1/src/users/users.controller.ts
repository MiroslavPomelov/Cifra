import { Body, Controller, Get, HttpException, HttpStatus, Param, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import UserDto from './dto/user.dto';
import { User } from './entities/user.entity';
import UserRole from './shared/userRole.enum';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('all')  
  public async findAll(): Promise<User[]> {
    try { return await this.usersService.findALL() }
    catch (error){ throw error }   
  }

  @Post('new')
  @UsePipes(new ValidationPipe())
  public async create(@Body() user: UserDto): Promise<User> {
    try { return await this.usersService.create(user)}    
    catch (error){ throw error }     
  } 
  
  @Get()
  public async getOneByUsernameAndPassword(@Query('username') username: string, @Query('password') password: string ): Promise<User>{
    try { return this.usersService.getOneByUsernameAndPassword(username, password)}
    catch (error){ throw error } 
  }

  @Get(':id')  
  public async getOneById(@Param('id') id: number): Promise<User> {
    try { return await this.usersService.getOneById(id) }    
    catch (error){ throw error }    
  } 

  @Get('role/:id')  
  public async getRoleById(@Param('id') id: number): Promise<UserRole> {
    try { return await this.usersService.getRoleById(id) }     
    catch (error){ throw error }      
  } 

  @Patch('update/:id')
  @UsePipes(new ValidationPipe())
  public async updateUser( @Param('id') id: number, @Body() userData: UserDto ): Promise<User> {
    try {  return await this.usersService.updateUser(id, userData) }    
    catch (error){ throw error }       
  }

  @Get('create/:number')
  public async createUsersWithFaker(@Param('number') number: number): Promise<User[]> {
    try { return await this.usersService.fillDbWithFaker(number) }      
    catch (error){ throw error }      
  } 
}
