import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    firstname!: string;
    @Column()
    lastname!: string;
    @Column()
    age!: number;
    @Column()
    isActive!: boolean;
}