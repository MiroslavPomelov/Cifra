import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Person } from '../entities/Person';
import { Pet } from '../entities/Pet';

export const MyCustomDataSource = new DataSource({
    type: 'sqlite',
    database: "database.sqlite",
    synchronize: true,
    logging: false,
    entities: [Person, Pet],
    migrations: [],
    subscribers: []
});