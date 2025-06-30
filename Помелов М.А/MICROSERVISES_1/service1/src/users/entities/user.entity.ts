import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import UserRole from "../shared/userRole.enum";

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
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    phoneNumber: string;

    @Column()
    address: string;

    @Column()
    city: string;

    @Column()
    state: string;

    @Column()
    zipCode: string;

    @Column()
    country: string;

    @Column()
    createdAt: Date;

    @Column()
    updatedAt: Date;

    @Column()
    role: UserRole;
}