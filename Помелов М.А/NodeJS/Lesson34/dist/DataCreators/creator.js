"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUniversities = createUniversities;
exports.createTeachers = createTeachers;
exports.createStudents = createStudents;
const faker_1 = require("@faker-js/faker");
const DataSource_1 = require("../configuration/DataSource");
const University_1 = require("../Entities/University");
const Teacher_1 = require("../Entities/Teacher");
const Student_1 = require("../Entities/Student");
function createUniversities() {
    return __awaiter(this, void 0, void 0, function* () {
        const universityRepository = DataSource_1.AppDataSource.getRepository(University_1.University);
        for (let i = 0; i < 10; i++) {
            yield universityRepository.createQueryBuilder()
                .insert()
                .into(University_1.University)
                .values({
                name: faker_1.faker.company.name(),
            })
                .execute();
        }
    });
}
function createTeachers() {
    return __awaiter(this, void 0, void 0, function* () {
        const teacherRepository = DataSource_1.AppDataSource.getRepository(Teacher_1.Teacher);
        const universityRepository = DataSource_1.AppDataSource.getRepository(University_1.University);
        const universities = yield universityRepository
            .createQueryBuilder("university").getMany();
        for (let i = 0; i < 20; i++) {
            const teacher = yield teacherRepository.createQueryBuilder()
                .insert()
                .into(Teacher_1.Teacher)
                .values({
                name: faker_1.faker.person.fullName(),
            })
                .execute();
            const teacherId = teacher.identifiers[0].id;
            const randomUniversities = faker_1.faker.helpers
                .arrayElements(universities, faker_1.faker.number.int({ min: 1, max: 3 }));
            yield teacherRepository.createQueryBuilder()
                .relation(Teacher_1.Teacher, "universities")
                .of(teacherId)
                .add(randomUniversities.map(university => university.id));
        }
    });
}
function createStudents() {
    return __awaiter(this, void 0, void 0, function* () {
        const studentRepository = DataSource_1.AppDataSource.getRepository(Student_1.Student);
        const teacherRepository = DataSource_1.AppDataSource.getRepository(Teacher_1.Teacher);
        const universityRepository = DataSource_1.AppDataSource.getRepository(University_1.University);
        const universities = yield universityRepository
            .createQueryBuilder("university").getMany();
        const teachers = yield teacherRepository
            .createQueryBuilder("teacher").getMany();
        for (let i = 0; i < 50; i++) {
            const randomUniversity = faker_1.faker.helpers.arrayElement(universities);
            const student = yield studentRepository.createQueryBuilder()
                .insert()
                .into(Student_1.Student)
                .values({
                name: faker_1.faker.person.fullName(),
                university: randomUniversity,
            })
                .execute();
            const studentId = student.identifiers[0].id;
            const randomTeachers = faker_1.faker.helpers
                .arrayElements(teachers, faker_1.faker.number.int({ min: 1, max: 3 }));
            yield studentRepository.createQueryBuilder()
                .relation(Student_1.Student, "teachers")
                .of(studentId)
                .add(randomTeachers.map(teacher => teacher.id));
        }
    });
}
