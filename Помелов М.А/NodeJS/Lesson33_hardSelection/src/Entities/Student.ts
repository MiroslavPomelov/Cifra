import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne } from 'typeorm';
import { Teacher } from './Teacher';
import { University } from './University';

@Entity()
export class Student {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @ManyToMany(() => Teacher, teacher => teacher.students)
    @JoinTable()
    teachers!: Teacher[];

    @ManyToOne(() => University, university => university.students)
    university!: University;
}