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
    const types = {
        'Диваны': [
            'угловые',
            'прямые',
            'раскладные',
            'выдвижные',
            'раздвижные'
        ],
        'Кровати': [
            'детские',
            'односпальные',
            'полутороспальные',
            'двуспальные'
        ],
        'Кресла': [
            'классические',
            'кресло-стул',
            'раскладные',
            'кресло-реклайнер',
            'кресло-качалка',
            'кресло-понг'
        ],
        'Стулья': [
            'для дома',
            'офисные',
            'специального назначения'
        ],
        'Столы': [
            'прямые',
            'угловые',
            'круглые',
            'обеденные',
            'рабочие',
            'кофейные',
            'компьютерные'
        ],
        'Шкафы': [
            'для гардероба',
            'для прихожих',
            'для спален',
            'для гостинных',
            'для детских',
            'для кухонь',
            'для кабинетов'
        ]
    };
    const categories = [
        'Диваны', 'Кровати', 'Кресла', 'Стулья', 'Столы', 'Шкафы'
    ];
    const products = [];
    for (let i = 0; i < categories.length; i++) {
        for (let j = 0; j < types[categories[i]].length; j++) {
            let product = new Product_1.Product();
            product.category = categories[i];
            product.type = types[categories[i]][j];
            product.price = faker_1.faker.number.int({ min: 5000, max: 500000 });
            product.quantity = faker_1.faker.number.int({ min: 1, max: 100 });
            product.orders = [];
            product.image = `backend/src/images/entitiesImages/${i}.png`;
            products.push(product);
        }
    }
    return products;
}
