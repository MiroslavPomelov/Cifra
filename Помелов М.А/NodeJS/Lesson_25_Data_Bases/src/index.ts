import { AppDataSource } from "./configuration/data-source";
import { User } from "./entities/User";

AppDataSource.initialize().then(async () => {
    const newUser: User = new User();
    newUser.firstName = "John";
    newUser.lastName = "Doe";
    newUser.age = 25;

    await AppDataSource.manager.save(newUser);
    console.log('Saving new User in DB with id: ' + newUser.id);

    const users: User[] = await AppDataSource.manager.find(User);
    console.log('Uploaded users: ', users);
});