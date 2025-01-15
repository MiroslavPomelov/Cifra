import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    username: string;
    @Column()
    email: string;
    @Column()
    password: string;
    @Column()
    first_name: string;
    @Column()
    last_name: string;
    @Column()
    phone_number: number;
    @Column()
    address: string;
    @Column()
    city: string;
    @Column()
    state: string;
    @Column()
    zip_code: string;
    @Column()
    country: string;
    @Column()
    created_at: Date;
    @Column()
    updated_at: Date;
}