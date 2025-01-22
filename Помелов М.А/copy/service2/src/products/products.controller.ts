import { Controller, Get, Query } from '@nestjs/common';
import { ProductService } from './products.service';
import { Product } from './entities/product.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductService) { }


  @Get('search')
  public async searchProduct(@Query('searchWord') searchWord: string) : Promise<Product[] | null>{
    return this.productsService.searchProduct(searchWord);
  }
}
