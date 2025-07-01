import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    Index,
    OneToMany,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { FavouriteProduct } from './favourite-product.entity';
import { UserBasket } from '../interfaces/user.basket';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100, unique: true })
    @Index({ unique: true })
    email: string;

    @Column({ length: 255 })
    @Exclude() // Исключаем из ответов API
    password_hash: string;

    @Column({ length: 50, name: 'first_name' })
    firstName: string;

    @Column({ length: 50, name: 'last_name' })
    lastName: string;

    @Column()
    birthDate: Date;

    @Column({ length: 20 })
    phone: string;

    @Column({ length: 30 })
    city: string;

    @CreateDateColumn({
        name: 'registration_date',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    registrationDate: Date;

    @Column({ name: 'last_login', type: 'timestamp', nullable: true })
    lastLogin: Date | null;

    @Column({ name: 'is_active', default: true })
    isActive: boolean;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updatedAt: Date;

    @Column()
    personalData: boolean;

    @Column({ type: 'jsonb', default: null })
    basket: UserBasket[] | null;

    @Column({ type: 'jsonb', default: null })
    shopId: number | null;

    @Column({default: 0})
    bonus: number;

    @OneToMany(() => FavouriteProduct, favouriteProduct => favouriteProduct.user)
    favouriteProducts: FavouriteProduct[];
}