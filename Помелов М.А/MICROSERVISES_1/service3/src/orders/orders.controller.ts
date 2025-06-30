import { Body, Controller, Delete, Get, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dtos/createOrder.dto';
import { Order } from './interfaces/order.interface';
import { UpdateOrderDto } from './dtos/updateOrder.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('new')
  @UsePipes(new ValidationPipe())
  async create(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    try { return this.ordersService.create(createOrderDto) }    
    catch (error){ throw error }   
  }  

  @Get('all')
  async findAll(): Promise<Order[]> {
   try { return this.ordersService.findAll() }
   catch (error){ throw error }
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Order> {
   try { return this.ordersService.findOne(id) }
   catch (error){ throw error }
  }

  @Patch('update/:id')
  @UsePipes(new ValidationPipe())
  async update(@Param('id') id: number, @Body() updateOrderDto:
  UpdateOrderDto): Promise<Order> {
    try { return this.ordersService.update(id, updateOrderDto) }
    catch (error){ throw error }
  }

  @Delete('/:id')
  async delete(@Param('id') id: number): Promise<string> {
   try { return this.ordersService.delete(id) }
   catch (error){ throw error }
  }


}
