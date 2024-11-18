import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    goodName!: string;

    @Column()
    goodDescription!: string;
    @Column()
    goodPrice!: string;
}