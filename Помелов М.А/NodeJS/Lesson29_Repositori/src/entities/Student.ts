import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, Join } from 'typeorm';
import { Teacher } from './Teacher';

@Entity()
export class Student {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    firstname!: string;
    @Column()
    lastname!: string;
    @Column()
    age!: number;

    @ManyToOne(() => Teacher, teacher => teacher.students)
    teachers!: Teacher[];
}