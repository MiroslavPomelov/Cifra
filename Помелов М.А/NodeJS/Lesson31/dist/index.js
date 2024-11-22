"use strict";
// import { Repository } from "typeorm";
// import { AppDataSource } from "./Configuration/AppDataSource";
// import { User } from "./Entities/User0";
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
const AppDataSource_1 = require("./Configuration/AppDataSource");
const Pet_1 = require("./Entities/Pet");
const User0_1 = require("./Entities/User0");
const generator_1 = require("./generators/generator");
const faker_1 = require("@faker-js/faker");
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
function seedDataBase() {
    return __awaiter(this, void 0, void 0, function* () {
        yield AppDataSource_1.AppDataSource.initialize();
        yield generateUser(20);
    });
}
function generateUser(count) {
    return __awaiter(this, void 0, void 0, function* () {
        const userRepository = AppDataSource_1.AppDataSource.getRepository(User0_1.User);
        const petRepository = AppDataSource_1.AppDataSource.getRepository(Pet_1.Pet);
        while (count > 0) {
            const pet = (0, generator_1.generatePet)();
            const insertedPet = yield petRepository.createQueryBuilder()
                .insert()
                .into(Pet_1.Pet)
                .values(pet)
                .execute();
            const petId = insertedPet.identifiers[0].id;
            const user = new User0_1.User(faker_1.faker.internet.username(), faker_1.faker.internet.email(), faker_1.faker.internet.password(), faker_1.faker.person.firstName(), faker_1.faker.person.lastName(), faker_1.faker.number.int({ min: 18, max: 70 }), faker_1.faker.datatype.boolean(), faker_1.faker.date.past({ years: 2 }), faker_1.faker.date.past({ years: 2 }), pet);
            yield userRepository.createQueryBuilder()
                .insert()
                .into(User0_1.User)
                .values(user)
                .execute();
            count--;
        }
    });
}
