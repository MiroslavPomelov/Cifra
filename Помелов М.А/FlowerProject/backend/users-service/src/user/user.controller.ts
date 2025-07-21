import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, ParseIntPipe, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SigninDto } from './dto/signin.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserSelfGuard } from './guards/user-self.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  @ApiOperation({ summary: 'Создать пользователя' })
  @ApiResponse({ status: 201, description: 'Пользователь успешно создан' })
  @ApiResponse({ status: 400, description: 'Ошибка валидации' })
  @ApiResponse({ status: 409, description: 'Пользователь с таким email уже существует' })
  async create(@Body() rawData: any) {
    try {
      const createUserDto = CreateUserDto.fromRequest(rawData);
      return await this.userService.create(createUserDto);
    } catch (error) {
      // Если пользователь существует
      if (error.status === 409) {
        throw error;
      }
      // Наверх
      throw new BadRequestException(error.message);
    }
  }

  @Post('signin')
  @ApiOperation({ summary: 'Войти в систему' })
  @ApiResponse({ status: 200, description: 'Успешный вход' })
  @ApiResponse({ status: 404, description: 'Неверный логин или пароль' })
  async signin(@Body() signinData: SigninDto) {
    return await this.userService.findByEmailAndPassword(signinData.email, signinData.password);
  }



  @Get()
  @ApiOperation({ summary: 'Получить всех пользователей' })
  @ApiResponse({ status: 200, description: 'Список пользователей' })
  async findAll() {
    return await this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard, UserSelfGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Получить пользователя по ID' })
  @ApiResponse({ status: 200, description: 'Пользователь найден' })
  @ApiResponse({ status: 404, description: 'Пользователь не найден' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, UserSelfGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Обновить пользователя' })
  @ApiResponse({ status: 200, description: 'Пользователь обновлён' })
  @ApiResponse({ status: 400, description: 'Ошибка валидации' })
  async update(@Param('id', ParseIntPipe) id: number, @Body() rawData: any) {
    try {
      const updateUserDto = UpdateUserDto.fromRequest(rawData);
      return await this.userService.update(id, updateUserDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @UseGuards(JwtAuthGuard, UserSelfGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Удалить пользователя' })
  @ApiResponse({ status: 200, description: 'Пользователь удалён' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.remove(id);
  }

  @UseGuards(JwtAuthGuard, UserSelfGuard)
  @Patch(':id/activate')
  @ApiOperation({ summary: 'Активировать пользователя' })
  @ApiResponse({ status: 200, description: 'Пользователь активирован' })
  async activate(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.activate(id);
  }

  @UseGuards(JwtAuthGuard, UserSelfGuard)
  @Patch(':id/deactivate')
  @ApiOperation({ summary: 'Деактивировать пользователя' })
  @ApiResponse({ status: 200, description: 'Пользователь деактивирован' })
  async deactivate(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.deactivate(id);
  }

  @Get(':id/with-favourites')
  @ApiOperation({ summary: 'Получить пользователя с избранными товарами' })
  @ApiResponse({ status: 200, description: 'Пользователь с избранными товарами найден' })
  async findOneWithFavourites(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.findOneWithFavourites(id);
  }
}