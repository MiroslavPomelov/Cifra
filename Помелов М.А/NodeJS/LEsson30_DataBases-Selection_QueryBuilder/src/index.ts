import { Entity, Repository } from "typeorm";
import { AppDataSource } from "./Configuration/AppDataSource";
import { User } from "./entities/User";



//ПРОСТОЙ ПРИМЕР

// async function operator() {
//     await AppDataSource.initialize();
//     const userRepo: Repository<User> = AppDataSource.getRepository(User);

//     const queryBuilder = userRepo.createQueryBuilder('user');

//     const users: User[] = await queryBuilder
//         .select(
//             [
//                 'user.id', 'user.firstname',
//                 'user.age'
//             ]
//         )
//         .where('user.isActive = :isActive', { isActive: true })
//         .orderBy('user.firstname', "ASC")
//         .getMany();
// }

// operator();


//СЛОЖНЫЙ ПРИМЕР


// async function operator() {
//     await AppDataSource.initialize();
//     const userRepo: Repository<User> = AppDataSource.getRepository(User);

//     const queryBuilder = userRepo.createQueryBuilder('user');

//     const users: User[] = await queryBuilder
//         .select(
//             [
//                 'user.id', 'user.firstname',
//                 'user.age'
//             ]
//         )
//         .where('user.isActive = :isActive', { isActive: true })
//         //&&
//         .andWhere('user.age > :age', { age: 25 })
//         //||
//         .orWhere('user.firstname = :name', {name: 'Valeriy'})
//         .orderBy('user.firstname', "ASC")
//         .getMany();
// }

// operator();



//ВЫБОРКА СРЕДНЕЙ СЛОЖНОСТИ


async function operator() {
    await AppDataSource.initialize();
    const userRepo: Repository<User> = AppDataSource.getRepository(User);

    const queryBuilder = userRepo.createQueryBuilder('user');

    // const users: User[] = await queryBuilder
    //     .select(
    //         [
    //             'user.id', 'user.firstname',
    //             'user.age'
    //         ]
    //     )
    //     .where('(user.age > :age OR user.isActive > :isActive)', {
    //         age: 18,
    //         isActive: true
    //     })
    //     .orderBy('user.firstname', "ASC")
    //     .getMany();




    //ВЫБОРКА С ПОСТРОЕНИЕМ КОМБИНИРОВАННОГ ЗАПРОСА
    // const usernameCondition: string = 'Valeriy';

    // const users: User[] = await queryBuilder
    //     .select(
    //         [
    //             'user.id', 'user.firstname',
    //             'user.age'
    //         ]
    //     )
    //     .where('user.isActive = :isActive', {
    //         isActive: true
    //     })
    //     .andWhere('LOWER(user.username) = LOWER(:username)', {username: usernameCondition})
    //     .orderBy('user.firstname', "ASC")
    //     .getMany()
    // .getOneOrFail() // Сам бросит исключение
    // .getRawOne() // Object | undefiend
    // .getRawMany() //  Object[] | undefiend
    // .getCount() // кол-во найденных записей





    // АГРЕГАТНЫЕ ФУНКЦИИ QueryBuilder

    const userQueryBuilder: any = await queryBuilder
        .select('SUM(user.age)', 'total')
        .getRawOne();

    console.log(userQueryBuilder.total);
}

operator();




