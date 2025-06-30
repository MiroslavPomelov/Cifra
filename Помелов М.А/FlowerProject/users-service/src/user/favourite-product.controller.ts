import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    ParseIntPipe,
    HttpCode,
    HttpStatus,
} from '@nestjs/common';
import { FavouriteProductService } from './favourite-product.service';
import { CreateFavouriteProductDto } from './dto/create-favourite-product.dto';
import { UpdateFavouriteProductDto } from './dto/update-favourite-product.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('favourite-products')
@Controller('users/:userId/favourites')
export class FavouriteProductController {
    constructor(private readonly favouriteProductService: FavouriteProductService) {}

    @Post()
    @ApiOperation({ summary: 'Добавить товар в избранное' })
    @ApiResponse({ status: 201, description: 'Товар добавлен в избранное' })
    async create(
        @Param('userId', ParseIntPipe) userId: number,
        @Body() createFavouriteProductDto: CreateFavouriteProductDto,
    ) {
        return await this.favouriteProductService.create(userId, createFavouriteProductDto);
    }

    @Get()
    @ApiOperation({ summary: 'Получить все избранные товары пользователя' })
    @ApiResponse({ status: 200, description: 'Список избранных товаров' })
    async findAll(@Param('userId', ParseIntPipe) userId: number) {
        return await this.favouriteProductService.findAllByUserId(userId);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Получить избранный товар по ID' })
    @ApiResponse({ status: 200, description: 'Избранный товар найден' })
    @ApiResponse({ status: 404, description: 'Избранный товар не найден' })
    async findOne(
        @Param('userId', ParseIntPipe) userId: number,
        @Param('id', ParseIntPipe) id: number,
    ) {
        return await this.favouriteProductService.findOne(id, userId);
    }

    @Get('check/:productId')
    @ApiOperation({ summary: 'Проверить, добавлен ли товар в избранное' })
    @ApiResponse({ status: 200, description: 'Результат проверки' })
    async checkIfFavourite(
        @Param('userId', ParseIntPipe) userId: number,
        @Param('productId', ParseIntPipe) productId: number,
    ) {
        return await this.favouriteProductService.checkIfFavourite(userId, productId);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Обновить избранный товар' })
    @ApiResponse({ status: 200, description: 'Избранный товар обновлён' })
    async update(
        @Param('userId', ParseIntPipe) userId: number,
        @Param('id', ParseIntPipe) id: number,
        @Body() updateFavouriteProductDto: UpdateFavouriteProductDto,
    ) {
        return await this.favouriteProductService.update(id, userId, updateFavouriteProductDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Удалить избранный товар по ID' })
    @ApiResponse({ status: 204, description: 'Избранный товар удалён' })
    async remove(
        @Param('userId', ParseIntPipe) userId: number,
        @Param('id', ParseIntPipe) id: number,
    ) {
        return await this.favouriteProductService.remove(id, userId);
    }

    @Delete('product/:productId')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Удалить избранный товар по productId' })
    @ApiResponse({ status: 204, description: 'Избранный товар удалён' })
    async removeByProductId(
        @Param('userId', ParseIntPipe) userId: number,
        @Param('productId', ParseIntPipe) productId: number,
    ) {
        return await this.favouriteProductService.removeByProductId(userId, productId);
    }
} 