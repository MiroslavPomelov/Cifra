import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SigninDto } from './dto/signin.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Создать пользователя' })
  @ApiResponse({ status: 201, description: 'Пользователь успешно создан' })
  @ApiResponse({ status: 400, description: 'Ошибка валидации' })
  @ApiResponse({ status: 409, description: 'Пользователь с таким email уже существует' })
  create(@Body() rawData: any) {
    try {
      // Используем строгую валидацию
      const createUserDto = CreateUserDto.fromRequest(rawData);
      return this.userService.create(createUserDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('signin')
  @ApiOperation({ summary: 'Войти в систему' })
  @ApiResponse({ status: 200, description: 'Успешный вход' })
  @ApiResponse({ status: 404, description: 'Неверный логин или пароль' })
  async signin(@Body() signinData: SigninDto) {
    try {
      const user = await this.userService.findByEmailAndPassword(signinData.email, signinData.password);
      return user;
    } catch (error) {
      throw error; // Пробрасываем ошибку как есть, так как она уже правильного типа
    }
  }

  @Get()
  @ApiOperation({ summary: 'Получить всех пользователей' })
  @ApiResponse({ status: 200, description: 'Список пользователей' })
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить пользователя по ID' })
  @ApiResponse({ status: 200, description: 'Пользователь найден' })
  @ApiResponse({ status: 404, description: 'Пользователь не найден' })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Обновить пользователя' })
  @ApiResponse({ status: 200, description: 'Пользователь обновлён' })
  @ApiResponse({ status: 400, description: 'Ошибка валидации' })
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
  @ApiOperation({ summary: 'Удалить пользователя' })
  @ApiResponse({ status: 200, description: 'Пользователь удалён' })
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @Patch(':id/activate')
  @ApiOperation({ summary: 'Активировать пользователя' })
  @ApiResponse({ status: 200, description: 'Пользователь активирован' })
  activate(@Param('id') id: string) {
    return this.userService.activate(+id);
  }

  @Patch(':id/deactivate')
  @ApiOperation({ summary: 'Деактивировать пользователя' })
  @ApiResponse({ status: 200, description: 'Пользователь деактивирован' })
  deactivate(@Param('id') id: string) {
    return this.userService.deactivate(+id);
  }

  @Get(':id/with-favourites')
  @ApiOperation({ summary: 'Получить пользователя с избранными товарами' })
  @ApiResponse({ status: 200, description: 'Пользователь с избранными товарами найден' })
  findOneWithFavourites(@Param('id') id: string) {
    return this.userService.findOneWithFavourites(+id);
  }
}