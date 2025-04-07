import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrdersModule } from './orders.module';
import { Order } from './interfaces/order.interface';
import { CreateOrderDto } from './dtos/order.dto';

@Injectable()
export class OrdersService {
    constructor(
        @InjectModel('Order') private readonly orderModel: Model<Order>
   ){}

public async create(createOrderData: CreateOrderDto): Promise<Order> {
    const createdOrder: Order = new this.orderModel(createOrderData);
    return await createdOrder.save();
}

public async findAll(): Promise<Order[]> {
    return await this.orderModel.find().exec();
}

public async findOne(id: string): Promise<Order> {
    return await this.orderModel.findById(id).exec();
}

public async update(id: string, payload: CreateOrderDto): Promise<Order> {
    return await this.orderModel.findByIdAndUpdate(id, payload, {new: true}).exec();
}

public async delete(id: string): Promise<any> {
    return await this.orderModel.findByIdAndDelete(id).exec();
}
}
