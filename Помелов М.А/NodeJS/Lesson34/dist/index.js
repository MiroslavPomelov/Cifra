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
const DataSource_1 = require("./configuration/DataSource");
const Student_1 = require("./Entities/Student");
// async function seedDatabase() {
//     await AppDataSource.initialize();
//     await createUniversities();
//     await createTeachers();
//     await createStudents();
//     console.log("Database seeded successfully!");
// }
// seedDatabase().catch(error => console.log(error));
//-----------------------------------------------------------------------------------------------------------------------------------------
getStudentsWithDetails();
function getStudentsWithDetails() {
    return __awaiter(this, void 0, void 0, function* () {
        // Инициализируем подключение к БД
        yield DataSource_1.AppDataSource.initialize();
        // Получаем репозиторий студента
        const studentRepository = DataSource_1.AppDataSource.getRepository(Student_1.Student);
        const data = yield studentRepository
            .createQueryBuilder('student')
            .leftJoinAndSelect("student.university", "university")
            .leftJoinAndSelect("student.teachers", "teacher")
            .where('university.name = :universityName', { universityName: 'Stamm LLC' })
            .getManyAndCount();
        const students = data[0];
        const stidentsAmount = data[1];
        console.log(`Количество студентов: ${stidentsAmount}`);
        students.forEach(function (student) {
            console.log("****************************************");
            console.log(`Студент: ${student.name}`);
            console.log('Учителя:');
            student.teachers.forEach(function (teacher) {
                console.log('Учитель студента: ', teacher.name);
            });
            console.log('Университет студента', student.university.name);
        });
        // // Получаем все смежные таблицы
        // const students: Student[] = await
        //     studentRepository.createQueryBuilder("student")
        //         .leftJoinAndSelect("student.university", "university")
        //         .leftJoinAndSelect("student.teachers", "teacher")
        //         .getMany();
        // // Теперь осталось вывести полученную информацию
        // students.forEach(student => {
        //     console.log('\n*******************************************');
        //     console.log('Студент: ' + student.name);
        //     console.log('Учителя:');
        //     student.teachers.forEach(teacher => {
        //         console.log('Учитель студента: ' + teacher.name);
        //     });
        //     console.log('Университет студента: ' + student.university.name);
        //     console.log('*******************************************');
        // });
    });
}
