import { DataSource } from "typeorm";
import 'reflect-metadata';
import { Book } from "../entities/subEntities/Book";
import { Animal } from "../entities/subEntities/Animal";



export const AppDataSource: DataSource = new DataSource({
    type: 'sqlite',
    database: 'computer.sqlite',
    synchronize: true,
    logging: [],

    entities: [Book, Animal],

    migrations: [],
    subscribers: []

});