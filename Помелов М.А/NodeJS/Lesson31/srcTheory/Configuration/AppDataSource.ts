import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../Entities/User0";
import { Pet } from "../Entities/Pet";



export const AppDataSource: DataSource = new DataSource({
    type: 'sqlite',
    database: 'users.sqlite',
    synchronize: true,
    logging: false,

    entities: [User, Pet],

    migrations: [],
    subscribers: []
})