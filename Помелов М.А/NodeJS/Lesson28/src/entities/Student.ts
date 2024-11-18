import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Teacher } from "./Teacher";

@Entity()
export class Student {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @ManyToMany(() => Teacher, (teacher: Teacher) => teacher.students)
    @JoinTable()
    teachers!: Teacher[];
}

export function createStudent(name: string, teachers: Teacher[]): Student {
    const student: Student = new Student();
    student.name = name;
    student.teachers = teachers;

    return student;
}