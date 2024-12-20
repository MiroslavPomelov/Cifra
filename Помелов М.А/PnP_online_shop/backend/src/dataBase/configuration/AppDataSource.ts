import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from '../entities/User';
import { Product } from '../entities/Product';
import { Order } from '../entities/Order';
import { ProductInOrder } from '../entities/ProductInOrder';

export const AppDataSource = new DataSource({
    type: 'sqlite',
    database: "users_products.sqlite",
    synchronize: true,
    logging: false,
    entities: [User, Product, Order, ProductInOrder],
    migrations: [],
    subscribers: []
});
