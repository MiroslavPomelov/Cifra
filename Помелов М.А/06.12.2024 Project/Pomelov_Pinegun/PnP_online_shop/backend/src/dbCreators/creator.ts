import { faker } from "@faker-js/faker";
import { User } from "../entities/User";
import { Product } from "../entities/Product";


export function usersCreator(): User[] {

    const users: User[] = [];
    for (let i = 0; i < 5; i++) {
        let user: User = new User();
        user.username = faker.internet.username();
        user.firstname = faker.person.firstName();
        user.lastname = faker.person.lastName();
        user.email = faker.internet.email();
        user.age = faker.number.int({ min: 18, max: 100 });
        user.password = faker.internet.password();
        user.goods = [];

        users.push(user);
    }
    return users;
}

export function productsCreator(): Product[] {

    const products: Product[] = [];
    for (let i = 0; i < 5; i++) {
        let product: Product = new Product();
        product.name = faker.vehicle.manufacturer();
        product.description = faker.string.sample();
        product.price = faker.number.int();

        products.push(product);
    }
    return products;
}