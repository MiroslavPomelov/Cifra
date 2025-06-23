import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() rawData: any) {
    try {
      // Используем строгую валидацию
      const createUserDto = CreateUserDto.fromRequest(rawData);
      return this.userService.create(createUserDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() rawData: any) {
    try {
      // Используем строгую валидацию
      const updateUserDto = UpdateUserDto.fromRequest(rawData);
      return this.userService.update(+id, updateUserDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.deactivate(+id);
  }

  @Patch(':id/activate')
  activate(@Param('id') id: string) {
    return this.userService.activate(+id);
  }

  @Get(':id/with-favourites')
  findOneWithFavourites(@Param('id') id: string) {
    return this.userService.findOneWithFavourites(+id);
  }
}