import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, Req, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ServiceAuthGuard } from './guards/service-auth.guard';
import { JwtShopGuard } from './guards/jwt-shop.guard';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // Публичный каталог
  @Get()
  async findAll() {
    return this.productService.findAll();
  }

  // Публично: получить продукт по id
  @Get(':id')
  async findById(@Param('id') id: number) {
    return this.productService.findById(id);
  }

  // Публично: получить все продукты магазина
  @Get('/shop/:shopId')
  async findByShop(@Param('shopId') shopId: number) {
    return this.productService.findByShop(shopId);
  }

  // Межсервисно: получить продукты по массиву id (например, для избранного)
  @UseGuards(ServiceAuthGuard)
  @Post('/by-ids')
  async findByIds(@Body('ids') ids: number[]) {
    return this.productService.findByIds(ids);
  }

  // Защищённые методы (только для магазинов, shopId из JWT)
  @UseGuards(JwtShopGuard)
  @Post()
  async create(@Body() dto: CreateProductDto, @Req() req) {
    return this.productService.create(dto, req.shopId);
  }

  @UseGuards(JwtShopGuard)
  @Put(':id')
  async update(@Param('id') id: number, @Body() dto: UpdateProductDto, @Req() req) {
    return this.productService.update(id, dto, req.shopId);
  }

  @UseGuards(JwtShopGuard)
  @Delete(':id')
  async remove(@Param('id') id: number, @Req() req) {
    return this.productService.remove(id, req.shopId);
  }
} 