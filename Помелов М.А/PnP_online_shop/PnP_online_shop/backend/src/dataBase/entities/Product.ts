import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Table, JoinColumn } from "typeorm";
import { ProductInOrder } from "./ProductInOrder";


@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column()
    category!: string;
    @Column()    
    type!: string;
    @Column()
    price!: number; 
    @Column()
    quantity!: number;
    @OneToMany(() => ProductInOrder, order => order.product)
    orders!: ProductInOrder[];
    @Column()
    image!: string;

}