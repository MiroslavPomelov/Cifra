import 'reflect-metadata'
import { DataSource } from "typeorm";
import { Student } from "../entities/Student";
import { Teacher } from "../entities/Teacher";

export const UniversityDataSource: DataSource = new DataSource({
    type: 'sqlite',
    database: 'university-database.sqlite',
    logging: false,
    synchronize: true,

    entities: [Student, Teacher],

    migrations: [],
    subscribers: []
});