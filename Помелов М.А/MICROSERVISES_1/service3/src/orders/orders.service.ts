import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from './interfaces/order.interface';
import { CreateOrderDto } from './dtos/createOrder.dto';
import { getCallerInfo, logger } from 'src/logging/logger';
import { UpdateOrderDto } from './dtos/updateOrder.dto';
import { isInstance } from 'class-validator';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel('Order') private readonly orderModel: Model<Order>,
  ) {}

  public checkingCreateOrderDto(orderData: CreateOrderDto): void {    
    const orderKeys: string[] = ['userid', 'productsids'];
    console.log(orderKeys);
    const incomingKeys: string[] = Object.keys(orderData);
    console.log(incomingKeys);

    incomingKeys.forEach(function (value) {
      if (!orderKeys.find((key) => key == value) || orderKeys.length != incomingKeys.length) {
        logger.info(`Некорректные входные данные!`);
        throw new BadRequestException();
      }
    });
  }

  public checkingUpdateOrderDto(orderData: UpdateOrderDto): void {    
    const orderKeys: string[] = ['productsids'];
    console.log(orderKeys);
    const incomingKeys: string[] = Object.keys(orderData);
    console.log(incomingKeys);

    incomingKeys.forEach(function (value) {
      if (!orderKeys.find((key) => key == value) || orderKeys.length != incomingKeys.length) {
        logger.info(`Некорректные входные данные!`);
        throw new BadRequestException();
      }
    });
  }

  public async create(createOrderData: CreateOrderDto): Promise<Order> { 
    try{     

      this.checkingCreateOrderDto(createOrderData);

      createOrderData.date = new Date(Date.now());

      const createdOrder: Order = new this.orderModel(createOrderData);
      console.log(createdOrder);      

      if (createdOrder) {
        logger.info('Корзина создана!');
        return await createdOrder.save();
      }
      else {
        throw new NotFoundException();
      }  
    } 
    catch (error) {
      logger.error(`${getCallerInfo(error)} Ошибка создания корзины!`);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }     
  }
  
  public async findAll(): Promise<Order[]> {    
    try {
      const orders: Order[] = await this.orderModel.find();
      if (orders) {
        logger.info('Корзины найдены!');
        return orders;
      }
      else {
        throw new NotFoundException();
      }       
    }
    catch (error) {
      logger.error(`${getCallerInfo(error)} Ошибка выборки всех пользовательских корзин из БД!`);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async findOne(id: number): Promise<Order> {    
    try {
      const order: Order = await this.orderModel.findOne({ userid: id }).exec();
      if (order) {
        logger.info('Корзина найдена!');
        return order;
      }
      else {
        throw new NotFoundException();
      }       
    }
    catch (error) {
      logger.error(`${getCallerInfo(error)} Ошибка поиска корзины по id пользователя:${id}!`);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }    
  }

  public async update(id: number, payload: UpdateOrderDto): Promise<Order> {
    try {
      this.checkingUpdateOrderDto(payload);

      const order: Order = await this.orderModel.findOne({ userid: id }).exec();     

      if (order) {
        return await this.orderModel
      .findOneAndUpdate({ userid: id }, payload, { new: true });
      }
      else {
        throw new NotFoundException();
      }
    }
    catch (error) {
      logger.error(`${getCallerInfo(error)} Ошибка обновления корзины по id пользователя:${id}!`);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }     
  }

  public async delete(id: number): Promise<string> {
    try {
      const order: Order = await this.orderModel.findOneAndDelete({ userid: id }).exec();
      if (order) {
        logger.info('Корзина удалена!');
        return `Корзина с id:${id} успешно удалена!`;
      }
      else {
        throw new NotFoundException();
      }       
    }
    catch (error) {
      logger.error(`${getCallerInfo(error)} Ошибка поиска корзины по id пользователя:${id}!`);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }      
  }
}
