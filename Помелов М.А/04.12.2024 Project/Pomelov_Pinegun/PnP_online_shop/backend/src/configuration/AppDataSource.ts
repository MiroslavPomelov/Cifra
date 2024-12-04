import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from '../entities/User';
import { Product } from '../entities/Product';

export const AppDataSource = new DataSource({
    type: 'sqlite',
    database: "users_products.sqlite",
    synchronize: true,
    logging: false,
    entities: [User, Product],
    migrations: [],
    subscribers: []
});
