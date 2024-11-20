import 'reflect-metadata';
import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { Student } from '../entities/Student';
import { Teacher } from '../entities/Teacher';


export const AppDataSource: DataSource = new DataSource({
    type: "sqlite",
    database: 'repository.sqlite',
    logging: false,
    synchronize: true,

    entities: [Teacher, Student],

    migrations: [],
    subscribers: []

});