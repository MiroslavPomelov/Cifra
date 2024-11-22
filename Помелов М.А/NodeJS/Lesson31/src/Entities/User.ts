import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    username!: string;
    @Column()
    email!: string;
    @Column()
    password!: string;
    @Column()
    firstName!: string;
    @Column()
    lastName!: string;
    @Column()
    age!: number;
    @Column()
    isActive!: boolean;
    @Column()
    registrationDate!: Date;
    @Column()
    lastLogin!: Date;
}