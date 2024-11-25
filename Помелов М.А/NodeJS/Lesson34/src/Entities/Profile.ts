import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";



@Entity()
export class Profile {
    @PrimaryGeneratedColumn()
    id!: number;
    
    @OneToOne(() => User)
    @JoinColumn()
    user!: User;
    @Column()
    bio!: string;
}