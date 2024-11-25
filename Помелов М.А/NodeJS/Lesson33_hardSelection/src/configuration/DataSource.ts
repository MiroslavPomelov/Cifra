import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { University } from '../Entities/University';
import { Teacher } from '../Entities/Teacher';
import { Student } from '../Entities/Student';

export const AppDataSource = new DataSource({
    type: 'sqlite',
    database: 'univer.sqlite',
    synchronize: true,
    logging: false,

    entities: [University, Teacher, Student],

    subscribers: [],
    migrations: []
});