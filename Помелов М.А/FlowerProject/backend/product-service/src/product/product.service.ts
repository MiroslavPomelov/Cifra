import { Injectable, NotFoundException, ConflictException, Logger, BadRequestException, ForbiddenException, Inject, UnauthorizedException } from '@nestjs/common';
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
  ) { }

  // async create(createProductDto: CreateProductDto, shopId: number): Promise<Product> {
  //   this.logger.log('DTO на входе:', JSON.stringify(createProductDto));
  //   const product = this.productRepository.create({ ...createProductDto, shopId });
  //   this.logger.log(`Создан новый продукт: ${product.name} (shopId: ${shopId})`);
  //   const saved = await this.productRepository.save(product);
  //   this.logger.log('Сохранённый продукт:', JSON.stringify(saved));
  //   // npm install cache-manager @nestjs/cache-manager cache-manager-redis-store redis
  //   await this.cacheManager.del('products:all');
  //   return saved;
  // }

  async create(createProductDto: CreateProductDto, shopId: number): Promise<Product> {
    try {
      this.logger.log(`Создание продукта для магазина ${shopId}`, JSON.stringify(createProductDto));

      const product = this.productRepository.create({ ...createProductDto, shopId });
      const savedProduct = await this.productRepository.save(product);

      this.logger.log(`Продукт "${savedProduct.name}" успешно создан (ID: ${savedProduct.id})`);

      // Инвалидируем кэш, чтобы при следующем запросе данные обновились
      await this.clearProductsCache();
      await this.clearProductCache(savedProduct.id);
      await this.clearProductsByShopCache(shopId);

      return savedProduct;
    } catch (error) {
      this.logger.error(`Ошибка при создании продукта: ${error.message}`, error.stack);
      throw error;
    }
  }

  // async findAll(): Promise<Product[]> {
  //   const cacheKey = 'products:all';
  //   let products = await this.cacheManager.get<Product[]>(cacheKey);


  //   if (products) {
  //     this.logger.log(`Список продуктов получен из кэша: ${cacheKey}`);
  //     return products;
  //   }
  //   products = await this.productRepository.find();
  //   this.logger.log(`Получено продуктов: ${products.length}`);
  //   await this.cacheManager.set(cacheKey, products, 60);
  //   return products;
  // }

  async findAll(): Promise<Product[]> {
    const cacheKey = 'products:all';

    try {
      // Проверяем кэш
      const cachedProducts = await this.cacheManager.get<Product[]>(cacheKey);
      if (cachedProducts) {
        this.logger.log('Данные получены из кэша Redis');
        return cachedProducts;
      }

      // Если в кэше нет, запрашиваем из БД
      const products = await this.productRepository.find();
      this.logger.log(`Получено ${products.length} продуктов из базы данных`);

      // Сохраняем в кэш на 600 секунд
      await this.cacheManager.set(cacheKey, products, 60 * 60 * 1000);

      return products;
    } catch (error) {
      this.logger.error(`Ошибка при получении продуктов: ${error.message}`, error.stack);
      throw error;
    }
  }

  async findByShop(shopId: number): Promise<Product[]> {
    const cacheKey = `products:shop:${shopId}`;
    let products: Product[] | undefined;
    try {
      products = await this.cacheManager.get<Product[]>(cacheKey);
      if (products) {
        this.logger.log(`Products for shop ${shopId} retrieved from cache`);
        return products;
      }
    } catch (error) {
      this.logger.warn(`Redis get error for ${cacheKey}: ${error.message}`);
    }
    products = await this.productRepository.find({ where: { shopId } });
    try {
      await this.cacheManager.set(cacheKey, products, 60 * 10);
      this.logger.log(`Products for shop ${shopId} cached`);
    } catch (error) {
      this.logger.warn(`Redis set error for ${cacheKey}: ${error.message}`);
    }
    return products;
  }

  async findById(id: number): Promise<Product> {
    const cacheKey = `product:${id}`;
    let product: Product | undefined;
    try {
      product = await this.cacheManager.get<Product>(cacheKey);
      if (product) {
        this.logger.log(`Product retrieved from cache: ${cacheKey}`);
        return product;
      }
    } catch (error) {
      this.logger.warn(`Redis get error for ${cacheKey}: ${error.message}`);
    }
    product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      this.logger.warn(`Product with ID ${id} not found`);
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    try {
      await this.cacheManager.set(cacheKey, product, 60 * 60);
      this.logger.log(`Product cached: ${cacheKey}`);
    } catch (error) {
      this.logger.warn(`Redis set error for ${cacheKey}: ${error.message}`);
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
    await this.clearProductsCache();
    await this.clearProductCache(id);
    await this.clearProductsByShopCache(shopId);
    return this.productRepository.save(product);
  }

  async remove(id: number, shopId: number): Promise<void> {
    const product = await this.findById(id);
    if (product.shopId !== shopId) {
      throw new UnauthorizedException('You can only delete your own products');
    }
    await this.productRepository.remove(product);
    this.logger.log(`Удалён продукт: ${product.name} (ID: ${id})`);
    await this.clearProductsCache();
    await this.clearProductCache(id);
    await this.clearProductsByShopCache(shopId);
  }

  async findFeatured(): Promise<Product[]> {
    // Возвращаем первые 8 продуктов как избранные
    const products = await this.productRepository.find({
      take: 8,
      order: {
        createdAt: 'DESC'
      }
    });
    
    this.logger.log(`Found ${products.length} featured products`);
    return products;
  }

  // async findByIds(ids: number[]): Promise<Product[]> {
  //   return this.productRepository.findByIds(ids);
  // }

   private async clearProductsCache(): Promise<void> {
    try {
      await this.cacheManager.del('products:all');
      this.logger.log('Кэш продуктов успешно очищен');
    } catch (error) {
      this.logger.error(`Ошибка при очистке кэша: ${error.message}`, error.stack);
    }
  }

  private async clearProductCache(productId: number): Promise<void> {
    try {
      await this.cacheManager.del(`product:${productId}`);
    } catch (error) {
      this.logger.warn(`Failed to clear cache for product ${productId}: ${error.message}`);
    }
  }

  private async clearProductsByShopCache(shopId: number): Promise<void> {
    try {
      await this.cacheManager.del(`products:shop:${shopId}`);
    } catch (error) {
      this.logger.warn(`Failed to clear products cache for shop ${shopId}: ${error.message}`);
    }
  }
} 