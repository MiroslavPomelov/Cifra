import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Like, Repository } from 'typeorm';
import ProductDto from './dto/products.dto';
import { faker } from "@faker-js/faker";

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>
  ) {} 

  public async findALL(): Promise<Product[]> {
    return this.productRepository.find();
  }

  public async create(data: ProductDto): Promise<Product> {
    const product: Product = this.productRepository.create(data);
    return this.productRepository.save(product);
  }  

  public async searchProduct(word: string): Promise<Product[] | null> {
    const products: Product[] | null = await this.productRepository.find({
      where: { name: Like(`%${word}%`) }
    });
    return products;
  }  

  public async updateProduct(id: number, data: ProductDto): Promise<Product> {
    this.productRepository[id] = { ...this.productRepository[id], ...data };
    return this.productRepository.save(this.productRepository[id]);
  } 

  public async partialUpdateProduct(id: number, data: Partial<ProductDto>): Promise<Product> {
    this.productRepository[id] = { ...this.productRepository[id], ...data };
    return this.productRepository.save(this.productRepository[id]);
  } 

  public async fillDbWithFaker(number: number): Promise<Product[]> {    

    for (let i = 0; i < number; i++) {
      const product: ProductDto = new ProductDto();
      
      product.name = faker.commerce.productName(); 
      product.description = faker.commerce.productDescription();
      product.price = faker.commerce.price();      
      
     
      const newProduct: Product = this.productRepository.create(product);
      await this.productRepository.save(newProduct);
    }

    return await this.productRepository.find(); 
  }


}