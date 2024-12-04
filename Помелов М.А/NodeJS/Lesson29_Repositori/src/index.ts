import { Repository } from "typeorm";
import { AppDataSource } from "./Configuration/AppDataSource";
import { User } from "./entities/User";
import { Student } from "./entities/Student";
import { Teacher } from "./entities/Teacher";

async function Example() {

    await AppDataSource.initialize();
    const userRepository: Repository<User> = AppDataSource.getRepository(User);

    let user: User = new User();
    user.firstname = 'John';
    user.lastname = 'Doe';
    user.age = 32;

    await userRepository.save(user);

    //Считать
    const foundUsers: User[] = await userRepository.find();

    console.log('List users: ', foundUsers);
}

Example();

//-------------------------------------------------------------------------------------------------------------------------------------

// async function save(user: User) {

//     await AppDataSource.initialize();
//     const userRepository: Repository<User> = AppDataSource.getRepository(User);
//     await userRepository.save(user);
// }

// async function getAllData(): Promise<User[]> {

//     await AppDataSource.initialize();
//     const userRepository: Repository<User> = AppDataSource.getRepository(User);
//     return await userRepository.find();

//     //FIND
//     userRepository.find({
//         where: {
//             age: 19
//         }
//     });

//FINDone
// userRepository.findOne({where: {
//     name: 'John'
// }});

//UPDATE
// userRepository.update(1, { firstname: "Petr" });
// userRepository.update({age: 34}, { age: 20});

//DELETE
// userRepository.delete(1);
// userRepository.delete({ age: 30});

//FINDandCOUNT
// const [entities, count] = await userRepository.findAndCount();
// const [entities, count] = await userRepository.findAndCount({
//     where: {
//         age: 32
//     }
// });
// }

// save();















//PRACTICE


// async function Example() {

//     await AppDataSource.initialize();
//     const StudentRepository: Repository<Student> = AppDataSource.getRepository(Student);
//     const TeacherRepository: Repository<Teacher> = AppDataSource.getRepository(Teacher);

//     let historyTeacher: Teacher = new Teacher();
//     historyTeacher.firstname = 'Bogdan';
//     historyTeacher.lastname = 'Black';
//     historyTeacher.age = 25;
//     historyTeacher.students = [];

//     let designTeacher: Teacher = new Teacher();
//     designTeacher.firstname = 'Anton';
//     designTeacher.lastname = 'White';
//     designTeacher.age = 28;
//     designTeacher.students = [];

//     let mathTeacher: Teacher = new Teacher();
//     mathTeacher.firstname = 'John';
//     mathTeacher.lastname = 'Doe';
//     mathTeacher.age = 30;
//     mathTeacher.students = [];




//     let student1: Student = new Student();
//     student1.firstname = 'John';
//     student1.lastname = 'Doe';
//     student1.age = 32;
//     student1.teachers = [historyTeacher];

//     let student2: Student = new Student();
//     student2.firstname = 'John';
//     student2.lastname = 'Doe';
//     student2.age = 32;
//     student2.teachers = [historyTeacher];

//     let student3: Student = new Student();
//     student3.firstname = 'John';
//     student3.lastname = 'Doe';
//     student3.age = 32;
//     student3.teachers = [historyTeacher];

//     let student4: Student = new Student();
//     student4.firstname = 'John';
//     student4.lastname = 'Doe';
//     student4.age = 32;
//     student4.teachers = [historyTeacher];

//     let student5: Student = new Student();
//     student5.firstname = 'John';
//     student5.lastname = 'Doe';
//     student5.age = 32;
//     student5.teachers = [historyTeacher];

//     historyTeacher.students = [student1, student2, student3, student4, student5];

//     let student6: Student = new Student();
//     student6.firstname = 'Call';
//     student6.lastname = 'Brown';
//     student6.age = 16;
//     student6.teachers = [designTeacher];

//     let student7: Student = new Student();
//     student7.firstname = 'Call';
//     student7.lastname = 'Brown';
//     student7.age = 16;
//     student7.teachers = [designTeacher];

//     let student8: Student = new Student();
//     student8.firstname = 'Call';
//     student8.lastname = 'Brown';
//     student8.age = 16;
//     student8.teachers = [designTeacher];

//     let student9: Student = new Student();
//     student9.firstname = 'Call';
//     student9.lastname = 'Brown';
//     student9.age = 16;
//     student9.teachers = [designTeacher];

//     let student10: Student = new Student();
//     student10.firstname = 'Call';
//     student10.lastname = 'Brown';
//     student10.age = 16;
//     student10.teachers = [designTeacher];


//     designTeacher.students = [student6, student7, student8, student9, student10];


//     let student11: Student = new Student();
//     student11.firstname = 'Red';
//     student11.lastname = 'Brick';
//     student11.age = 19;
//     student11.teachers = [mathTeacher];

//     let student12: Student = new Student();
//     student12.firstname = 'Red';
//     student12.lastname = 'Brick';
//     student12.age = 19;
//     student12.teachers = [mathTeacher];

//     let student13: Student = new Student();
//     student13.firstname = 'Red';
//     student13.lastname = 'Brick';
//     student13.age = 19;
//     student13.teachers = [mathTeacher];

//     let student14: Student = new Student();
//     student14.firstname = 'Red';
//     student14.lastname = 'Brick';
//     student14.age = 19;
//     student14.teachers = [mathTeacher];

//     let student15: Student = new Student();
//     student15.firstname = 'Red';
//     student15.lastname = 'Brick';
//     student15.age = 19;
//     student15.teachers = [mathTeacher];


//     mathTeacher.students = [student11, student12, student13, student14, student15];

//     // await UniversityRepository.save([historyTeacher, mathTeacher, designTeacher, student1, student2, student3, student4, student5, student6, student7, student8, student9, student10, student11, student12, student13, student14, student15]);
//     await TeacherRepository.save([historyTeacher, mathTeacher, designTeacher]);
//     await StudentRepository.save([student1, student2, student3, student4, student5, student6, student7, student8, student9, student10, student11, student12, student13, student14, student15]);

//     //Считать
//     const foundStudents: Student[] = await StudentRepository.find({
//         where: {
//             id:2
//         }
//     });

//     console.log('List users: ', foundStudents);
// }

// Example();