import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Student } from "./Student";

@Entity()
export class Teacher {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @ManyToMany(() => Student, (student: Student) => student.teachers)
    students!: Student[];
}

export function createTeacher(name: string, students: Student[]): Teacher {
    const teaher: Teacher = new Teacher();
    teaher.name = name;
    teaher.students = students;

    return teaher;
}