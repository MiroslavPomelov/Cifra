import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Product } from "./Product";
import { Order } from "./Order";

@Entity()
export class ProductInOrder {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Product, product => product.orders)
    product!: Product;    
    @Column()
    quantity!: number;
    @ManyToOne(() => Order, order => order.productsInOrder)
    order!: Order;

}