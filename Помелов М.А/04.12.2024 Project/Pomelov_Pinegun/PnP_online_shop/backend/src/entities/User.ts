import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { Product } from "./Product";

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
    @Column()
    goods!: Product[];
}