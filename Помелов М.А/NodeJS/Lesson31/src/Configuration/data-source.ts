import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../Entities/User";


export const PracticeDataSource: DataSource = new DataSource({
    type: 'sqlite',
    database: 'database.sqlite',
    synchronize: true,
    logging: false,

    entities: [User],

    migrations: [],
    subscribers: []
})