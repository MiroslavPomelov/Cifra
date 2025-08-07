import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, Req, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ServiceAuthGuard } from './guards/service-auth.guard';
import { JwtShopGuard } from './guards/jwt-shop.guard';

@UseGuards(ServiceAuthGuard)
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}


  @Get()
  async findAll() {
    return this.productService.findAll();
  }

  @Get('featured')
  async findFeatured() {
    return this.productService.findFeatured();
  }

  @Get(':id')
  async findById(@Param('id') id: number) {
    return this.productService.findById(id);
  }


  @Get('/shop/:shopId')
  async findByShop(@Param('shopId') shopId: number) {
    return this.productService.findByShop(shopId);
  }


  // @UseGuards(ServiceAuthGuard)
  // @Post('/by-ids')
  // async findByIds(@Body('ids') ids: number[]) {
  //   return this.productService.findByIds(ids);
  // }


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