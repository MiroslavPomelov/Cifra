import { Injectable, NotFoundException, ConflictException, Logger, BadRequestException, ForbiddenException, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Cache } from 'cache-manager';

@Injectable()
export class ProductService {
  private readonly logger = new Logger(ProductService.name);

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @Inject('CACHE_MANAGER')
    private cacheManager: Cache,
  ) {}

  async create(createProductDto: CreateProductDto, shopId: number): Promise<Product> {
    this.logger.log('DTO на входе:', JSON.stringify(createProductDto));
    const product = this.productRepository.create({ ...createProductDto, shopId });
    this.logger.log(`Создан новый продукт: ${product.name} (shopId: ${shopId})`);
    const saved = await this.productRepository.save(product);
    this.logger.log('Сохранённый продукт:', JSON.stringify(saved));
    // npm install cache-manager @nestjs/cache-manager cache-manager-redis-store redis
    await this.cacheManager.del('products:all');
    return saved;
  }

  async findAll(): Promise<Product[]> {
    const cacheKey = 'products:all';
    let products = await this.cacheManager.get<Product[]>(cacheKey);
    if (products) {
      this.logger.log(`Список продуктов получен из кэша: ${cacheKey}`);
      return products;
    }
    products = await this.productRepository.find();
    this.logger.log(`Получено продуктов: ${products.length}`);
    await this.cacheManager.set(cacheKey, products, 60);
    return products;
  }

  async findByShop(shopId: number): Promise<Product[]> {
    return this.productRepository.find({ where: { shopId } });
  }

  async findById(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      this.logger.warn(`Продукт с ID ${id} не найден`);
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto, shopId: number): Promise<Product> {
    const product = await this.findById(id);
    if (product.shopId !== shopId) {
      throw new ForbiddenException('Нет доступа к изменению этого продукта');
    }
    Object.assign(product, updateProductDto);
    this.logger.log(`Обновлён продукт: ${product.name} (ID: ${id})`);
    await this.cacheManager.del('products:all');
    return this.productRepository.save(product);
  }

  async remove(id: number, shopId: number): Promise<void> {
    const product = await this.findById(id);
    if (product.shopId !== shopId) {
      throw new ForbiddenException('Нет доступа к удалению этого продукта');
    }
    await this.productRepository.remove(product);
    this.logger.log(`Удалён продукт: ${product.name} (ID: ${id})`);
    await this.cacheManager.del('products:all');
  }

  // async findByIds(ids: number[]): Promise<Product[]> {
  //   return this.productRepository.findByIds(ids);
  // }
} 