import { faker } from "@faker-js/faker";
import { User } from "../entities/User";
import { Product } from "../entities/Product";
import { Order } from "../entities/Order";

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

        users.push(user);
    }
    return users;
}

export function productsCreator(): Product[] { 
    
    const types: Record<string, string[]> = {
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
    }

    const categories: string[] = [
        'Диваны', 'Кровати', 'Кресла', 'Стулья', 'Столы', 'Шкафы'
    ]

    const products: Product[] = [];

    for (let i = 0; i < categories.length; i++) {
        for (let j = 0; j < types[categories[i]].length; j++) {
            let product: Product = new Product();        
            product.category = categories[i];
            product.type = types[categories[i]][j];
            product.price = faker.number.int({ min: 5000, max: 500000}); 
            product.quantity = faker.number.int({ min: 1, max: 100 });
            product.orders = [];
            product.image = `backend/src/images/entitiesImages/${i}.png`
            
            products.push(product);
        }        
    }

    return products;    
}




