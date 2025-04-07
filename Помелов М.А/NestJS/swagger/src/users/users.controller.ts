import { Body, Controller, Get, Head, Param, Patch, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './classes/user';
import { CreateUserDto } from './dto/createUser.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  @Get()
  @ApiOperation({ summary: 'Получение списка пользователей' })
  @ApiResponse({ status: 200, description: 'Список успешно получен.' })
  @ApiResponse({ status: 404, description: 'Пользователи не найдены.' })
  public async getUsers() {
  }


  @Post()
  @ApiOperation({ summary: 'Создание нового пользователя' }) // Описание операции
  @ApiResponse({
    status: 201, description: 'Пользователь успешно создан.',
    type: User
  }) // Ответ на успешное создание
  @ApiResponse({ status: 400, description: 'Некорректные данные.' }) // Ответ на ошибку
  @ApiBody({ type: CreateUserDto }) // Описание тела запроса
  public async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    // Логика создания пользователя
    return {
      id: 1,
      name: createUserDto.name,
      email: createUserDto.email,
    };
  }



  @Get(':id')
  @ApiOperation({ summary: 'Получить информацию о пользователе по ID' }) //Описание операции
  @ApiResponse({ status: 200, description: 'Данные пользователя', type: User }) // Ответ при успешном запросе
  @ApiResponse({ status: 404, description: 'Пользователь не найден' }) //Ответ на ошибку(например, пользователь не найден)
  @ApiParam({ name: 'id', type: 'number', description: 'ID пользователя' })
  // Описание параметра пути (path parameter)
  public async getUserById(@Param('id') id: number): Promise<User> {
    // Логика получения пользователя
    return {
      id,
      name: 'Ivanov Valeryy',
      email: 'ivanov@example.com',
    };
  }


  @Get(':name')
  @ApiOperation({ summary: 'Получить информацию о пользователе по Name' }) //Описание операции
  @ApiResponse({ status: 200, description: 'Данные пользователя', type: User }) // Ответ при успешном запросе
  @ApiResponse({ status: 404, description: 'Пользователь не найден' }) //Ответ на ошибку(например, пользователь не найден)
  @ApiParam({ name: 'name', type: 'string', description: 'Name пользователя' })
  // Описание параметра пути (path parameter)
  public async getUserByName(@Param('name') name: string): Promise<User> {
    // Логика получения пользователя
    return {
      id: 1,
      name: name,
      email: 'ivanov@example.com',
    };
  }


  @Put(':id')
  @ApiOperation({ summary: 'Обновить информацию о пользователе по ID' }) //Описание операции
  @ApiResponse({ status: 200, description: 'Данные пользователя', type: User }) // Ответ при успешном запросе
  @ApiResponse({ status: 404, description: 'Пользователь не найден' }) //Ответ на ошибку(например, пользователь не найден)
  @ApiParam({ name: 'id', type: 'number', description: 'ID пользователя' })
  // Описание параметра пути (path parameter)
  public async putUserById(@Param('id') id: number): Promise<User> {
    // Логика обновления пользователя
    return {
      id,
      name: 'Ivanov Valeryy',
      email: 'ivanov@example.com',
    };
  }

  @Head()
  @ApiOperation({ summary: 'Вывести инфу о заголовках' }) //Описание операции
  @ApiResponse({ status: 200, description: 'Заголовки', type: Headers }) // Ответ при успешном запросе
  @ApiResponse({ status: 404, description: 'Заголовки не найдены' }) //
  // Описание параметра пути (path parameter)
  public async head(): Promise<{ headerName: string; headerValue: string; }> {
    // Логика обновления пользователя
    return;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Вывести инфу о заголовках' }) //Описание операции
  @ApiResponse({ status: 200, description: 'Заголовки', type: Headers }) // Ответ при успешном запросе
  @ApiResponse({ status: 404, description: 'Заголовки не найдены' }) //
  // Описание параметра пути (path parameter)
  public async updateUserById(@Param('id') id: number): Promise<User> {
    // Логика обновления пользователя
    return {
      id,
      name: 'Ivanov Valeryy',
      email: 'ivanov@example.com',
    };
  }
}
