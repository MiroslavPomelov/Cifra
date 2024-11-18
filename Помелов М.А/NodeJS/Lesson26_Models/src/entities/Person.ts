import { Pet } from "./Pet";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from 'typeorm';

@Entity()
export class Person {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @OneToMany(() => Pet, pet => pet.owner)
    pets!: Pet[];
}