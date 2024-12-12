import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { ProductInOrder } from "./ProductInOrder";
import { User } from "./User";

enum Status {
    'собирается',
    'в обработке',
    'оплачен'
}

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id!: number;

    @OneToOne(() => User)
    @JoinColumn()
    user!: User;
    @OneToMany(() => ProductInOrder, productInOrder => productInOrder.order)    
    productsInOrder!: ProductInOrder[];
    @Column()
    orderDate!: Date;   
    @Column()
    status!: Status;
}