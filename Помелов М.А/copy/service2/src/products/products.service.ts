import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import ProductDto from './dto/product.dto';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>
    ) { }

    public async findAll(): Promise<Product[]> {
        return this.productRepository.find();
    }

    public async create(data: Product): Promise<Product> {
        const product: Product = this.productRepository.create(data);

        return this.productRepository.save(product);
    }



}