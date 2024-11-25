import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne, OneToMany } from 'typeorm';
import { Student } from './Student';
import { Teacher } from './Teacher';

@Entity()
export class University {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @OneToMany(() => Student, student => student.university)
    students!: Student[];

    @ManyToMany(() => Teacher, teacher => teacher.universities)
    teachers!: Teacher[];
}