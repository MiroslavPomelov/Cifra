import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FavouriteProduct } from './entities/favourite-product.entity';
import { CreateFavouriteProductDto } from './dto/create-favourite-product.dto';
import { UpdateFavouriteProductDto } from './dto/update-favourite-product.dto';

@Injectable()
export class FavouriteProductService {
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
            throw new ConflictException('Product already in favourites');
        }

        const favouriteProduct = this.favouriteProductRepository.create({
            ...createFavouriteProductDto,
            userId,
        });

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
        return this.favouriteProductRepository.save(favouriteProduct);
    }

    async remove(id: number, userId: number): Promise<void> {
        const favouriteProduct = await this.findOne(id, userId);
        await this.favouriteProductRepository.remove(favouriteProduct);
    }

    async removeByProductId(userId: number, productId: number): Promise<void> {
        const favouriteProduct = await this.favouriteProductRepository.findOne({
            where: { userId, productId }
        });

        if (!favouriteProduct) {
            throw new NotFoundException('Favourite product not found');
        }

        await this.favouriteProductRepository.remove(favouriteProduct);
    }

    async checkIfFavourite(userId: number, productId: number): Promise<boolean> {
        const favouriteProduct = await this.favouriteProductRepository.findOne({
            where: { userId, productId }
        });

        return !!favouriteProduct;
    }
} 