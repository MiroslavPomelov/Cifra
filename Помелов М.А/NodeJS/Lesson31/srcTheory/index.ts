// import { Repository } from "typeorm";
// import { AppDataSource } from "./Configuration/AppDataSource";
// import { User } from "./Entities/User0";

import { InsertResult } from "typeorm";
import { AppDataSource } from "./Configuration/AppDataSource";
import { Pet } from "./Entities/Pet";
import { User } from "./Entities/User0";
import { generatePet } from "./generators/generator";
import { faker } from "@faker-js/faker";




// async function addUser() {

//     await AppDataSource.initialize();

//     const userRepo: Repository<User> = AppDataSource.getRepository(User);
//     await userRepo.createQueryBuilder()
//         .insert() // Add
//         .into(User)
//         .values([
//             {
//                 username: 'John',
//                 email: 'example@gmail.com',
//                 password: 'ogurec1996',
//                 firstname: 'Johny',
//                 lastname: 'Doe',
//                 age: 42,
//                 isActive: true,
//                 registrationDate: new Date(),
//                 lastLogin: new Date()
//             }
//         ])
//         .execute();





// }



// async function updateUser(user: User) {
//     await AppDataSource.initialize();

//     const userRepo: Repository<User> = AppDataSource.getRepository(User);

//     await userRepo.createQueryBuilder()
//         .update(User)
//         .set({ email: user.email })
//         .where('id = :id', { id: user.id })
//         .andWhere('firstname LIKE :firstname', { firstname: 'V%' })
//         .execute();
// }









//LESSON 32

seedDataBase().catch(err => console.log(err));

async function seedDataBase() {
    await AppDataSource.initialize();
    await generateUser(20);
}

async function generateUser(count: number) {
    const userRepository = AppDataSource.getRepository(User);
    const petRepository = AppDataSource.getRepository(Pet);


    while (count > 0) {
        const pet: Pet = generatePet();

        const insertedPet = await petRepository.createQueryBuilder()
            .insert()
            .into(Pet)
            .values(pet)
            .execute();


        const petId: number = insertedPet.identifiers[0].id;


        const user = new User(
            faker.internet.username(),
            faker.internet.email(),
            faker.internet.password(),
            faker.person.firstName(),
            faker.person.lastName(),
            faker.number.int({ min: 18, max: 70 }),
            faker.datatype.boolean(),
            faker.date.past({ years: 2 }),
            faker.date.past({ years: 2 }),
            pet
        );

        await userRepository.createQueryBuilder()
            .insert()
            .into(User)
            .values(user)
            .execute();

        count--;
    }
}