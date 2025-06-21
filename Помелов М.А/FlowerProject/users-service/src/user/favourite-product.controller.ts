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

@Controller('users/:userId/favourites')
export class FavouriteProductController {
    constructor(private readonly favouriteProductService: FavouriteProductService) {}

    @Post()
    create(
        @Param('userId', ParseIntPipe) userId: number,
        @Body() createFavouriteProductDto: CreateFavouriteProductDto,
    ) {
        return this.favouriteProductService.create(userId, createFavouriteProductDto);
    }

    @Get()
    findAll(@Param('userId', ParseIntPipe) userId: number) {
        return this.favouriteProductService.findAllByUserId(userId);
    }

    @Get(':id')
    findOne(
        @Param('userId', ParseIntPipe) userId: number,
        @Param('id', ParseIntPipe) id: number,
    ) {
        return this.favouriteProductService.findOne(id, userId);
    }

    @Get('check/:productId')
    checkIfFavourite(
        @Param('userId', ParseIntPipe) userId: number,
        @Param('productId', ParseIntPipe) productId: number,
    ) {
        return this.favouriteProductService.checkIfFavourite(userId, productId);
    }

    @Patch(':id')
    update(
        @Param('userId', ParseIntPipe) userId: number,
        @Param('id', ParseIntPipe) id: number,
        @Body() updateFavouriteProductDto: UpdateFavouriteProductDto,
    ) {
        return this.favouriteProductService.update(id, userId, updateFavouriteProductDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(
        @Param('userId', ParseIntPipe) userId: number,
        @Param('id', ParseIntPipe) id: number,
    ) {
        return this.favouriteProductService.remove(id, userId);
    }

    @Delete('product/:productId')
    @HttpCode(HttpStatus.NO_CONTENT)
    removeByProductId(
        @Param('userId', ParseIntPipe) userId: number,
        @Param('productId', ParseIntPipe) productId: number,
    ) {
        return this.favouriteProductService.removeByProductId(userId, productId);
    }
} 