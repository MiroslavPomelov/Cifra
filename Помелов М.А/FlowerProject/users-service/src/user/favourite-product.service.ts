import { Injectable, NotFoundException, ConflictException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FavouriteProduct } from './entities/favourite-product.entity';
import { CreateFavouriteProductDto } from './dto/create-favourite-product.dto';
import { UpdateFavouriteProductDto } from './dto/update-favourite-product.dto';

@Injectable()
export class FavouriteProductService {
    private readonly logger = new Logger(FavouriteProductService.name);
    constructor(
        @InjectRepository(FavouriteProduct)
        private favouriteProductRepository: Repository<FavouriteProduct>,
    ) {}

    async create(userId: number, createFavouriteProductDto: CreateFavouriteProductDto): Promise<FavouriteProduct> {
        // Проверяем, не добавлен ли уже этот товар в избранное
        const existing = await this.favouriteProductRepository.findOne({
            where: { userId, productId: createFavouriteProductDto.productId }
        });

        if (existing) {
            this.logger.warn(`Попытка добавить уже существующий товар (productId: ${createFavouriteProductDto.productId}) в избранное для пользователя ${userId}`);
            throw new ConflictException('Product already in favourites');
        }

        const favouriteProduct = this.favouriteProductRepository.create({
            ...createFavouriteProductDto,
            userId,
        });

        this.logger.log(`Добавлен товар (productId: ${createFavouriteProductDto.productId}) в избранное для пользователя ${userId}`);
        return this.favouriteProductRepository.save(favouriteProduct);
    }

    async findAllByUserId(userId: number): Promise<FavouriteProduct[]> {
        return this.favouriteProductRepository.find({
            where: { userId },
            order: { addedDate: 'DESC' }
        });
    }

    async findOne(id: number, userId: number): Promise<FavouriteProduct> {
        const favouriteProduct = await this.favouriteProductRepository.findOne({
            where: { id, userId }
        });

        if (!favouriteProduct) {
            throw new NotFoundException('Favourite product not found');
        }

        return favouriteProduct;
    }

    async update(id: number, userId: number, updateFavouriteProductDto: UpdateFavouriteProductDto): Promise<FavouriteProduct> {
        const favouriteProduct = await this.findOne(id, userId);
        Object.assign(favouriteProduct, updateFavouriteProductDto);
        this.logger.log(`Обновлён избранный товар (id: ${id}) для пользователя ${userId}`);
        return this.favouriteProductRepository.save(favouriteProduct);
    }

    async remove(id: number, userId: number): Promise<void> {
        const favouriteProduct = await this.findOne(id, userId);
        await this.favouriteProductRepository.remove(favouriteProduct);
        this.logger.log(`Удалён избранный товар (id: ${id}) для пользователя ${userId}`);
    }

    async removeByProductId(userId: number, productId: number): Promise<void> {
        const favouriteProduct = await this.favouriteProductRepository.findOne({
            where: { userId, productId }
        });

        if (!favouriteProduct) {
            this.logger.warn(`Попытка удалить несуществующий избранный товар (productId: ${productId}) для пользователя ${userId}`);
            throw new NotFoundException('Favourite product not found');
        }

        await this.favouriteProductRepository.remove(favouriteProduct);
        this.logger.log(`Удалён избранный товар (productId: ${productId}) для пользователя ${userId}`);
    }

    async checkIfFavourite(userId: number, productId: number): Promise<boolean> {
        const favouriteProduct = await this.favouriteProductRepository.findOne({
            where: { userId, productId }
        });

        return !!favouriteProduct;
    }
} 