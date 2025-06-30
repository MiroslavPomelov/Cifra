import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import ProductDto from './dto/products.dto';
import { faker } from "@faker-js/faker";
import { getCallerInfo, logger } from 'src/logging/logger';


@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>
  ) {} 
  
  public checkingDto(productData: ProductDto, product: Product): void {       
    const productKeys: string[] = Object.keys(product);
    console.log(productKeys);
      const incomingKeys: string[] = Object.keys(productData);
      console.log(incomingKeys);

      incomingKeys.forEach(function (value) {
        if (!productKeys.find((key) => key == value)) {
          logger.info(`Некорректные входные данные!`);
          throw new BadRequestException();
        } 
      });     
  }

  public checkingPartialDto(productData: Partial<ProductDto>, product: Product): void {

    const productKeys: string[] = Object.keys(product);
      const incomingKeys: string[] = Object.keys(productData);

      incomingKeys.forEach(function (value) {
        if (!productKeys.find((key) => key == value)) {
          logger.info(`Некорректные входные данные!`);
          throw new BadRequestException();
        } 
      });     
  }


  public async findALL(): Promise<Product[]> {
    try {
      const products: Product[] | null = await this.productRepository.find();
      if (products) {
        logger.info('Пользователи найдены!');
        return products;
      }
      else {
        logger.info('Пользователи не найдены!');
        throw new NotFoundException();
      }       
    }
    catch (error) {
      logger.error(`${getCallerInfo(error)} Ошибка выборки всех товаров из БД!`);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }    
  }
 
  public async create(data: ProductDto): Promise<Product> {
    try {
      const product: Product = this.productRepository.create(data);
      this.checkingDto(data, product);      

      if (product) {
        logger.info('Товар создан!');
        return await this.productRepository.save(product);
      }
      else {
        throw new NotFoundException();
      }      
    }
    catch (error) {
      logger.error(`${getCallerInfo(error)} Ошибка создания товара!`);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }    
  }

  public async searchProductByWord(word: string): Promise<Product[] | null> {
    try{
      const products: Product[] | null = await this.productRepository
      .createQueryBuilder('product')
      .where('name LIKE :word', { word: `%${word}%`})
      .orWhere('description LIKE :word', { word: `%${word}%`})
      .getMany();
      if (products) {
        logger.info(`Товары по заданному слову ${word} найдены!`);
        return products;
      } 
      else {
        logger.info(`Товары по заданному слову ${word} не найдены!`);
        throw new NotFoundException();
      }    
    }
    catch (error){
      logger.error(`${getCallerInfo(error)} Ошибка выборки товара по заданному слову!`);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);      
    }   
  }  

  public async updateProduct(id: number, data: ProductDto): Promise<Product> {
    try {
      let product: Product = await this.productRepository.findOneBy({id: id});

      this.checkingDto(data, product);     
      
      if (product) {
        product = { ...product, ...data };
        logger.info(`Товар по id:${id} обновлен!`);
        return await this.productRepository.save(product);
      }
      else {
        logger.info(`Товар по id:${id} не найден!`);
        throw new NotFoundException();
      }       
    } 
    catch (error) {      
      logger.error(`${getCallerInfo(error)} Ошибка обновления товара по id:${id}!`);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }   
  }

  public async partialUpdateProduct(id: number, data: Partial<ProductDto>): Promise<Product> {
    try {
      let product: Product = await this.productRepository.findOneBy({id: id});

      this.checkingPartialDto(data, product);
      
      if (product) {
        product = { ...product, ...data };
        logger.info(`Товар по id:${id} обновлен!`);
        return await this.productRepository.save(product);
      }
      else {
        logger.info(`Товар по id:${id} не найден!`);
        throw new NotFoundException();
      }  
    }
    catch (error) {
      logger.error(`${getCallerInfo(error)} Ошибка обновления товара по id:${id}!`);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }    
  } 

  public async fillDbWithFaker(number: number): Promise<Product[]> { 
    try {
      for (let i = 0; i < number; i++) {
        const product: ProductDto = new ProductDto();
        
        product.name = faker.commerce.productName(); 
        product.description = faker.commerce.productDescription();
        product.price = faker.commerce.price();      
        
       
        const newProduct: Product = this.productRepository.create(product);
        await this.productRepository.save(newProduct);
      }
      logger.info(`Успешно создано продуктов: ${number}`)
      return await this.productRepository.find();
    }  
    catch (error) {
      logger.error(`${getCallerInfo(error)} Ошибка создания товаров!`);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }      
  }
}