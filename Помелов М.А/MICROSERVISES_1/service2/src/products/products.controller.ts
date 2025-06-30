import { Body, Controller, Get, Param, Patch, Post, Put, Query, SetMetadata, UseGuards, UsePipes, ValidationPipe} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import ProductDto from './dto/products.dto';
import { ProductsRoleGuard } from './guards/products.roleGuard';

@Controller('products')
@UseGuards(ProductsRoleGuard)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('all')
  public async findAll(): Promise<Product[]> | null {
    try { return await this.productsService.findALL() }     
    catch (error){ throw error }      
  }

  @Post('new/:id')
  @SetMetadata('roles', ['manager', 'operator'])
  @UsePipes(new ValidationPipe())  
  public async createNew(@Body() product: ProductDto): Promise<Product> {    
    try { return this.productsService.create(product) }
    catch (error){ throw error } 
  }

  @Get('search')
  public async searchProductByWord(@Query('searchWord') searchWord: string): Promise<Product[] | null>{
    try { return this.productsService.searchProductByWord(searchWord) }
    catch (error){ throw error } 
  }

  @Patch('update/:id')
  @UsePipes(new ValidationPipe())
  public async updateProduct(@Param('id') id: number, @Body() product: ProductDto): Promise<Product> {
    try { return this.productsService.updateProduct(id, product) }
    catch (error){ throw error } 
  }

  @Put('partialUpdate/:id')
  @UsePipes(new ValidationPipe())
  public async partialUpdateProduct(@Param('id') id: number, @Body() product: Partial<ProductDto>): Promise<Product> {
    try { return this.productsService.partialUpdateProduct(id, product) }
    catch (error){ throw error } 
  }

  @Get('create/:number')
  public async createProductsWithFaker(@Param('number') number: number): Promise<Product[]> {
    try { return this.productsService.fillDbWithFaker(number) }
    catch (error){ throw error } 
  } 
}