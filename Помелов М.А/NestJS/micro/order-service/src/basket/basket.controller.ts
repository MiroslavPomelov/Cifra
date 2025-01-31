import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { BasketService } from './basket.service';
import { CreateBasketDto } from './dtos/basket.dto';
import { Basket } from './interfaces/basket.interface';

@Controller('basket')
export class BasketController {
  constructor(private readonly basketService: BasketService) { }

  @Post()
  public async create(@Body() createBasketData: CreateBasketDto): Promise<Basket> {
    return await this.basketService.create(createBasketData);
  }

  @Get()
  public async findAll(): Promise<Basket[]> {
    return await this.basketService.findAll();
  }

  @Get()
  public async findOne(@Param('id') id: string): Promise<Basket> {
    return await this.findOne(id);
  }

  @Patch()
  public async update(@Param('id') id: string, payload: CreateBasketDto): Promise<Basket> {
    return await this.basketService.update(id, payload);
  }

  @Delete()
  public async delete(@Param('id') id: string): Promise<any> {
    return await this.basketService.delete(id);
  }
}
