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
const data_source_1 = require("./Configuration/data-source");
const User_1 = require("./Entities/User");
const faker_1 = require("@faker-js/faker");
function addUser() {
    return __awaiter(this, void 0, void 0, function* () {
        yield data_source_1.PracticeDataSource.initialize();
        addRandomUsers(10);
        const userRepo = data_source_1.PracticeDataSource.getRepository(User_1.User);
        yield userRepo.createQueryBuilder()
            .insert() // Add
            .into(User_1.User)
            .values([
            // {
            //     username: 'Innokentiy1999,',
            //     email: 'innokentiy@example.com',
            //     password: 'qwerty123456',
            //     firstName: 'Innokentiy',
            //     lastName: 'Slavsky',
            //     age: 25,
            //     isActive: true,
            //     registrationDate: new Date(2024, 11, 20),
            //     lastLogin: new Date(2024, 11, 21)
            // },
            // {
            //     username: 'Svetlana,',
            //     email: 'Ivanova1@example.com',
            //     password: 'qwerty123456',
            //     firstName: 'Svetlana',
            //     lastName: 'Ivanova',
            //     age: 25,
            //     isActive: true,
            //     registrationDate: new Date(2024, 11, 20),
            //     lastLogin: new Date(2024, 11, 21)
            // },
            {}
        ])
            .execute();
        console.log("ADDED");
    });
}
addUser();
function addRandomUsers(number) {
    return __awaiter(this, void 0, void 0, function* () {
        const users = [];
        yield data_source_1.PracticeDataSource.initialize();
        const userRepo = data_source_1.PracticeDataSource.getRepository(User_1.User);
        for (let i = 0; i <= number; i++) {
            const newUser = new User_1.User();
            newUser.username = faker_1.faker.internet.username();
            newUser.email = faker_1.faker.internet.email();
            newUser.password = faker_1.faker.internet.password();
            newUser.firstName = faker_1.faker.person.firstName();
            newUser.lastName = faker_1.faker.person.lastName();
            newUser.age = faker_1.faker.number.int(18);
            newUser.isActive = false;
            newUser.registrationDate = new Date(2024, 11, 22);
            newUser.lastLogin = new Date();
            users.push(newUser);
        }
    });
}
