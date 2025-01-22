import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
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


    public async searchProduct(word: string): Promise<Product[] | null> {
        const products: Product[] | null = await this.productRepository.find({
            where: {name: Like(`%${word}%`)}
        });

        return this.productRepository.save(products);
    }
}