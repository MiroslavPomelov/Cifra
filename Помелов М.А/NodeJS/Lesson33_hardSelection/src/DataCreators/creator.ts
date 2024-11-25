import { faker } from "@faker-js/faker";
import { AppDataSource } from "../configuration/DataSource";
import { University } from "../Entities/University";
import { Teacher } from "../Entities/Teacher";
import { Student } from "../Entities/Student";


export async function createUniversities() {
    const universityRepository = AppDataSource.getRepository(University);


    for (let i = 0; i < 10; i++) {
        await universityRepository.createQueryBuilder()
            .insert()
            .into(University)
            .values({
                name: faker.company.name(),
            })
            .execute();
    }
}

export async function createTeachers() {
    const teacherRepository = AppDataSource.getRepository(Teacher);

    const universityRepository = AppDataSource.getRepository(University);

    const universities = await universityRepository
        .createQueryBuilder("university").getMany();


    for (let i = 0; i < 20; i++) {
        const teacher = await teacherRepository.createQueryBuilder()
            .insert()
            .into(Teacher)
            .values({
                name: faker.person.fullName(),
            })
            .execute();


        const teacherId = teacher.identifiers[0].id;
        const randomUniversities = faker.helpers
            .arrayElements(universities, faker.number.int({ min: 1, max: 3 }));


        await teacherRepository.createQueryBuilder()
            .relation(Teacher, "universities")
            .of(teacherId)
            .add(randomUniversities.map(university => university.id));
    }
}

export async function createStudents() {
    const studentRepository = AppDataSource.getRepository(Student);
    const teacherRepository = AppDataSource.getRepository(Teacher);
    const universityRepository = AppDataSource.getRepository(University);


    const universities = await universityRepository
        .createQueryBuilder("university").getMany();
    const teachers = await teacherRepository
        .createQueryBuilder("teacher").getMany();


    for (let i = 0; i < 50; i++) {
        const randomUniversity = faker.helpers.arrayElement(universities);
        const student = await studentRepository.createQueryBuilder()
            .insert()
            .into(Student)
            .values({
                name: faker.person.fullName(),
                university: randomUniversity,
            })
            .execute();


        const studentId = student.identifiers[0].id;
        const randomTeachers = faker.helpers
            .arrayElements(teachers, faker.number.int({ min: 1, max: 3 }));


        await studentRepository.createQueryBuilder()
            .relation(Student, "teachers")
            .of(studentId)
            .add(randomTeachers.map(teacher => teacher.id));
    }
}



