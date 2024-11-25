import { AppDataSource } from "./configuration/DataSource";
import { createStudents, createTeachers, createUniversities } from "./DataCreators/creator";
import { Student } from "./Entities/Student";
import { Teacher } from "./Entities/Teacher";
import { University } from "./Entities/University";


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

async function getStudentsWithDetails() {
    // Инициализируем подключение к БД
    await AppDataSource.initialize();
    // Получаем репозиторий студента



    const universutyRepository = AppDataSource.getRepository(University);
    const university: University | null = await universutyRepository.findOne(
        {
            where: { name: 'Marquardt Inc' },
        });


    const studentRepository = AppDataSource.getRepository(Student);
    let students: Student[] | null;
    if (university) {
        students = await studentRepository.find({
            where: { university: university }
        })
    }






    //==============================================-=================================



    // const data: [Student[], number] = await studentRepository
    //     .createQueryBuilder('student')
    //     .leftJoinAndSelect("student.university", "university")
    //     .leftJoinAndSelect("student.teachers", "teacher")
    //     .where('university.name = :universityName', { universityName: 'Stamm LLC' })
    //     .getManyAndCount();

    // const students: Student[] = data[0];
    // const stidentsAmount: number = data[1];

    // console.log(`Количество студентов: ${stidentsAmount}`);
    // students.forEach(function(student: Student) {
    //     console.log("****************************************")
    //     console.log(`Студент: ${student.name}`)


    //     console.log('Учителя:')
    //     student.teachers.forEach(function(teacher: Teacher) {
    //         console.log('Учитель студента: ', teacher.name)
    //     });


    //     console.log('Университет студента', student.university.name);
    // });




    //==============================================-=================================





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
}