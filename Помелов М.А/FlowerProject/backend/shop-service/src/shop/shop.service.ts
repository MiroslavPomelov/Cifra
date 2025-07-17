import { Injectable, NotFoundException, ConflictException, Logger, BadRequestException, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Shop } from './entities/shop.entity';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Cache } from 'cache-manager';

@Injectable()
export class ShopService {
  private readonly logger = new Logger(ShopService.name);

  constructor(
    @InjectRepository(Shop)
    private readonly shopRepository: Repository<Shop>,
    private readonly jwtService: JwtService,
    @Inject('CACHE_MANAGER')
    private cacheManager: Cache,
  ) {}

  async create(createShopDto: CreateShopDto): Promise<Shop> {
    // Проверка на уникальность по имени 
    const existing = await this.shopRepository.findOne({ where: { name: createShopDto.name } });
    if (existing) {
      this.logger.warn(`Попытка создать магазин с уже существующим именем: ${createShopDto.name}`);
      throw new ConflictException('Магазин с таким именем уже существует!');
    }
    const shop = this.shopRepository.create(createShopDto);
    this.logger.log(`Создан новый магазин: ${shop.name}`);
    const saved = await this.shopRepository.save(shop);
    await this.clearShopsCache();
    await this.clearShopCache(saved.id);
    await this.clearShopByEmailCache(saved.email);
    return saved;
  }

  async findAll(): Promise<Shop[]> {
    const cacheKey = 'shops:all';
    let shops = await this.cacheManager.get<Shop[]>(cacheKey);
    if (shops) {
      this.logger.log(`Список магазинов получен из кэша: ${cacheKey}`);
      return shops;
    }
    shops = await this.shopRepository.find();
    this.logger.log(`Получено магазинов: ${shops.length}`);
    await this.cacheManager.set(cacheKey, shops, 60);
    return shops;
  }

  async findOne(id: number): Promise<Shop> {
    const cacheKey = `shop:${id}`;
    let shop: Shop | undefined;
    try {
      shop = await this.cacheManager.get<Shop>(cacheKey);
      if (shop) {
        this.logger.log(`Shop retrieved from cache: ${cacheKey}`);
        return shop;
      }
    } catch (error) {
      this.logger.warn(`Redis get error for ${cacheKey}: ${error.message}`);
    }
    shop = await this.shopRepository.findOne({ where: { id } });
    if (!shop) {
      this.logger.warn(`Shop with ID ${id} not found`);
      throw new NotFoundException(`Shop with ID ${id} not found`);
    }
    try {
      await this.cacheManager.set(cacheKey, shop, 60 * 60);
      this.logger.log(`Shop cached: ${cacheKey}`);
    } catch (error) {
      this.logger.warn(`Redis set error for ${cacheKey}: ${error.message}`);
    }
    return shop;
  }

  async findByEmail(email: string): Promise<Shop | null> {
    const cacheKey = `shop:email:${email}`;
    let shop: Shop | undefined;
    try {
      shop = await this.cacheManager.get<Shop>(cacheKey);
      if (shop) {
        this.logger.log(`Shop with email ${email} retrieved from cache`);
        return shop;
      }
    } catch (error) {
      this.logger.warn(`Redis get error for ${cacheKey}: ${error.message}`);
    }
    shop = await this.shopRepository.findOne({ where: { email } });
    if (shop) {
      try {
        await this.cacheManager.set(cacheKey, shop, 60 * 5);
        this.logger.log(`Shop with email ${email} cached`);
      } catch (error) {
        this.logger.warn(`Redis set error for ${cacheKey}: ${error.message}`);
      }
    }
    return shop;
  }

  async update(id: number, updateShopDto: UpdateShopDto): Promise<Shop> {
    const shop = await this.findOne(id);
    Object.assign(shop, updateShopDto);
    this.logger.log(`Обновлён магазин: ${shop.name} (ID: ${id})`);
    await this.clearShopsCache();
    await this.clearShopCache(id);
    await this.clearShopByEmailCache(shop.email);
    return this.shopRepository.save(shop);
  }

  async remove(id: number): Promise<Shop> {
    const shop = await this.findOne(id);
    await this.shopRepository.remove(shop);
    this.logger.log(`Удалён магазин: ${shop.name} (ID: ${id})`);
    await this.clearShopsCache();
    await this.clearShopCache(id);
    await this.clearShopByEmailCache(shop.email);
    return shop;
  }

  async register(createShopDto: CreateShopDto): Promise<{ accessToken: string; shop: Shop }> {
    const existing = await this.shopRepository.findOne({ where: { email: createShopDto.email } });
    if (existing) {
      throw new ConflictException('Магазин с таким email уже существует!');
    }
    const password_hash = await bcrypt.hash(createShopDto.password, 10);
    const shop = this.shopRepository.create({ ...createShopDto, password_hash });
    const savedShop = await this.shopRepository.save(shop);
    const accessToken = this.generateToken(savedShop);
    return { accessToken, shop: savedShop };
  }

  async login(email: string, password: string): Promise<{ accessToken: string; shop: Shop }> {
    const shop = await this.shopRepository.findOne({ where: { email } });
    if (!shop) throw new NotFoundException('Магазин не найден');
    const valid = await bcrypt.compare(password, shop.password_hash);
    if (!valid) throw new BadRequestException('Неверный пароль');
    const accessToken = this.generateToken(shop);
    return { accessToken, shop };
  }

  private generateToken(shop: Shop): string {
    const payload = { sub: shop.id, email: shop.email, role: 'shop' };
    return this.jwtService.sign(payload);
  }

  private async clearShopCache(shopId: number): Promise<void> {
    try {
      await this.cacheManager.del(`shop:${shopId}`);
    } catch (error) {
      this.logger.warn(`Failed to clear cache for shop ${shopId}: ${error.message}`);
    }
  }

  private async clearShopByEmailCache(email: string): Promise<void> {
    try {
      await this.cacheManager.del(`shop:email:${email}`);
    } catch (error) {
      this.logger.warn(`Failed to clear shop cache by email ${email}: ${error.message}`);
    }
  }

  private async clearShopsCache(): Promise<void> {
    try {
      await this.cacheManager.del('shops:all');
    } catch (error) {
      this.logger.warn('Failed to clear shops cache', error.stack);
    }
  }
} 