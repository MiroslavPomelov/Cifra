import { Product } from '@/model/entities/Product';
import { User } from '@/model/entities/User';
import { Worker } from '@/model/entities/Worker';
import { faker } from '@faker-js/faker';


export function userDataGenerator(quantity: number): User[] {

    let listOfUsers: User[] = [];

    for (let i = 1; i <= quantity; i++) {
        const user: User = new User(i, faker.person.firstName(), faker.number.int({ min: 18, max: 80 }), faker.phone.number(), faker.internet.email());

        listOfUsers.push(user);
    }

    return listOfUsers;
}

export function productsDataGenerator(quantity: number): Product[] {

    let listOfProducts: Product[] = [];

    for (let i = 1; i <= quantity; i++) {
        const product: Product = new Product(i, faker.commerce.productName(), faker.number.int({ min: 1000, max: 500000 }), faker.commerce.productAdjective(), faker.number.int({ min: 1, max: 200 }), faker.commerce.product());

        listOfProducts.push(product);
    }

    return listOfProducts;
}

export function workerDataGenerator(quantity: number) {

    let listOfWorkers: Worker[] = [];

    for (let i = 1; i <= quantity; i++) {
        const worker: Worker = new Worker(i, faker.person.jobTitle(), faker.person.firstName(), faker.phone.number(), faker.internet.email());

        listOfWorkers.push(worker);
    }

    return listOfWorkers;
}