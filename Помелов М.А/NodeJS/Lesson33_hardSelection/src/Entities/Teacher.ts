import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne } from 'typeorm';
import { Student } from './Student';
import { University } from './University';

@Entity()
export class Teacher {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @ManyToMany(() => Student, student => student.teachers)
    students!: Student[];

    @ManyToMany(() => University, university => university.teachers)
    @JoinTable()
    universities!: University[];
}