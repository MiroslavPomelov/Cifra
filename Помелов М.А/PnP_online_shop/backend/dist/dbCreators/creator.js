"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersCreator = usersCreator;
exports.productsCreator = productsCreator;
const faker_1 = require("@faker-js/faker");
const User_1 = require("../entities/User");
const Product_1 = require("../entities/Product");
function usersCreator() {
    const users = [];
    for (let i = 0; i < 5; i++) {
        let user = new User_1.User();
        user.username = faker_1.faker.internet.username();
        user.firstname = faker_1.faker.person.firstName();
        user.lastname = faker_1.faker.person.lastName();
        user.email = faker_1.faker.internet.email();
        user.age = faker_1.faker.number.int({ min: 18, max: 100 });
        user.password = faker_1.faker.internet.password();
        users.push(user);
    }
    return users;
}
function productsCreator() {
    const products = [];
    for (let i = 0; i < 5; i++) {
        let product = new Product_1.Product();
        product.name = faker_1.faker.vehicle.manufacturer();
        product.description = faker_1.faker.string.sample();
        product.price = faker_1.faker.number.int();
        products.push(product);
    }
    return products;
}
