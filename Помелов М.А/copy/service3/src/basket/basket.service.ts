import { Injectable } from '@nestjs/common';
import { Basket } from './interfaces/basket.interface';
import { CreateBasketDto } from './dtos/basket.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class BasketService {
    constructor(
        @InjectModel('Basket') private readonly BasketModel: Model<Basket>
    ) { }

    public async create(createBasketData: CreateBasketDto): Promise<Basket> {
        const createdBasket: Basket = new this.BasketModel(createBasketData); 
        return await createdBasket.save();
    }

    public async findAll(): Promise<Basket[]> {
        return await this.BasketModel.find().exec();
    }

    public async findOne(id: string): Promise<Basket> {
        return await this.BasketModel.findById(id).exec();
    }

    public async update(id: string, payload: CreateBasketDto): Promise<Basket> {
        return await this.BasketModel.findByIdAndUpdate(id, payload, { new: true }).exec();
    }

    public async delete(id: string): Promise<any> {
        return await this.BasketModel.findByIdAndDelete(id).exec();
    }
}
