import { Product } from "@/app/model/entities/Product";
import { User } from "@/app/model/entities/User";
import { Worker } from "@/app/model/entities/Worker";
import { faker } from "@faker-js/faker";

export function userDataGenerator(quantity: number): User[] {
    let listOfUsers: User[] = [];
    const listOfCities: string[] = [];
    const numberOfCities: number = 5;
    let j: number = 0;
    while (j < numberOfCities) {
        listOfCities.push(faker.location.city());
        j++;
    }
    for (let i = 1; i <= quantity; i++) {
        const age: number = faker.number.int({ min: 18, max: 99 });
        const birthYear: number = 2025 - age;
        let newUser: User = new User(i, faker.person.firstName(), age, faker.phone.number(), faker.internet.email(), listOfCities[getRandomInt(0, 4)], birthYear);
        listOfUsers.push(newUser);
    }
    return listOfUsers;
}

export function productDataGenerator(quantity: number): Product[] {
    let listOfProducts: Product[] = [];

    for (let i = 1; i <= quantity; i++) {
        let newProduct: Product = new Product(i, faker.commerce.productName(), faker.number.int({ min: 10, max: 100000 }), faker.commerce.productAdjective(), faker.number.int({ min: 1, max: 10000 }), faker.commerce.product());
        listOfProducts.push(newProduct);
    }
    return listOfProducts;
}

export function workerDataGenerator(quantity: number): Worker[] {
    let listOfWorkers: Worker[] = [];

    for (let i = 1; i <= quantity; i++) {
        let newWorker: Worker = new Worker(i, faker.person.jobTitle(), faker.person.firstName(), faker.phone.number());
        listOfWorkers.push(newWorker);
    }
    return listOfWorkers;
}

function getRandomInt(min: number, max: number): number {
    min = Math.ceil(min); // округляем до ближайшего большего целого
    max = Math.floor(max); // округляем до ближайшего меньшего целого
    return Math.floor(Math.random() * (max - min + 1)) + min; // генерируем случайное целое число
}
