import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Person } from './Person';

@Entity()
export class Pet {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    type!: string;


    @ManyToOne(() => Person, person => person.pets)
    owner!: Person
}