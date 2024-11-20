import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, Join } from 'typeorm';
import { Student } from './Student';

@Entity()
export class Teacher {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    firstname!: string;
    @Column()
    lastname!: string;
    @Column()
    age!: number;

    @OneToMany(() => Student, students => students.teachers)
    students!: Student[]
}