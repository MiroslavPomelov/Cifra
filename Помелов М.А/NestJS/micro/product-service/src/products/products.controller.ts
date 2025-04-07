import { Body, Controller, Get, Param, Patch, Post, Put, Query, SetMetadata, UseGuards } from '@nestjs/common';

import { Product } from './entities/product.entity';
import ProductDto from './dto/product.dto';
import { ProductsRoleGuard } from './products.roleGuard';
import { ProductsService } from './products.service';

@Controller('products')
@UseGuards(ProductsRoleGuard)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('all')
  public async findAll(): Promise<Product[]> {
    return this.productsService.findALL();
  }

  @Post('new/:id')
  @SetMetadata('roles', ['manager', 'operator'])  
  public async createNew(@Param('id') id: number, @Body() product: ProductDto): Promise<Product> {
    
    return this.productsService.create(product);
  }

  @Get('search')
  public async searchProduct(@Query('searchWord') searchWord: string): Promise<Product[] | null>{
    return this.productsService.searchProduct(searchWord);
  }

  @Patch('update/:id')
  public async updateProduct(@Param('id') id: number, @Body() product: ProductDto): Promise<Product> {
    return this.productsService.updateProduct(id, product);
  }

  @Put('partialUpdate/:id')
  public async partialUpdateProduct(@Param('id') id: number, @Body() product: ProductDto): Promise<Product> {
    return this.productsService.updateProduct(id, product);
  }

  @Get('create/:number')
  public async createProductsWithFaker(@Param('number') number: number): Promise<Product[]> {
    return this.productsService.fillDbWithFaker(number);
  } 
}
