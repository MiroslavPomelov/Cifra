import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne } from "typeorm";
import { Product } from "./Product";
import { Order } from "./Order";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    username!: string;
    @Column()
    firstname!: string;
    @Column()
    lastname!: string;
    @Column()
    email!: string;
    @Column()
    age!: number;
    @Column()
    password!: string; 

    @OneToOne(() => Order)
    @JoinColumn()
    order!: Order;
}