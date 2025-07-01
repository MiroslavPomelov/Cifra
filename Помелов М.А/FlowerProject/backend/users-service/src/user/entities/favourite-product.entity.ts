import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class FavouriteProduct {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'user_id' })
    userId: number;

    @Column({ name: 'product_id' })
    productId: number;

    @Column({ length: 255 })
    productName: string;

    @Column({ length: 500, nullable: true })
    productDescription: string;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
    productPrice: number;

    @Column({ length: 255, nullable: true })
    productImage: string;

    @CreateDateColumn({
        name: 'added_date',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    addedDate: Date;

    @ManyToOne(() => User, user => user.favouriteProducts, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: User;
} 