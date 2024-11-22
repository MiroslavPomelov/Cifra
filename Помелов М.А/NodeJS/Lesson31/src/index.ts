import { DataSource, Repository } from "typeorm";
import { PracticeDataSource } from "./Configuration/data-source";
import { User } from "./Entities/User";
import { faker } from '@faker-js/faker'

async function addUser() {
    

    await PracticeDataSource.initialize();

    addRandomUsers(10);

    const userRepo: Repository<User> = PracticeDataSource.getRepository(User);
    await userRepo.createQueryBuilder()
        .insert() // Add
        .into(User)
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
            {
                
            }
        ])
        .execute();
    console.log("ADDED")
}

addUser();



async function addRandomUsers(number: number) {

    const users: User[] = [];
    await PracticeDataSource.initialize();

    const userRepo: Repository<User> = PracticeDataSource.getRepository(User);

   
    for (let i = 0; i <= number; i++) {
        const newUser: User = new User();

        newUser.username = faker.internet.username();
        newUser.email = faker.internet.email();
        newUser.password = faker.internet.password();
        newUser.firstName = faker.person.firstName();
        newUser.lastName = faker.person.lastName();
        newUser.age = faker.number.int(18);
        newUser.isActive = false;
        newUser.registrationDate = new Date(2024, 11, 22);
        newUser.lastLogin = new Date();

        users.push(newUser);
    }


}