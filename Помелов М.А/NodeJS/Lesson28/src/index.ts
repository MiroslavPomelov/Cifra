import { UniversityDataSource } from "./configuration/UniversityDataSource";
import { createStudent, Student } from "./entities/Student";
import { createTeacher, Teacher } from "./entities/Teacher";

UniversityDataSource.initialize().then(async () => {
    const teachers: Teacher[] = [
        createTeacher('John', []),
        createTeacher('Alex', []),
        createTeacher('Bob', []),
        createTeacher('Rap', []),
    ]

    const students: Student[] = [
        createStudent('Anatoliy', [teachers[0], teachers[1]]),
        createStudent('Anatoliy', [teachers[2], teachers[3]]),
        createStudent('Anatoliy', [teachers[1], teachers[3]]),
        createStudent('Anatoliy', [teachers[0], teachers[1]]),
        createStudent('Anatoliy', [teachers[1], teachers[3]]),
        createStudent('Anatoliy', [teachers[0], teachers[1]]),
    ]

    teachers[0].students = [students[3], students[3]];
    teachers[1].students = [students[0], students[2], students[3], students[4], students[5]];
    teachers[2].students = [students[1], students[4], students[5]];
    teachers[3].students = [students[1], students[2], students[4], students[5]];

    await UniversityDataSource.manager.save(teachers);
    await UniversityDataSource.manager.save(students);

    console.log('Data saved');
});