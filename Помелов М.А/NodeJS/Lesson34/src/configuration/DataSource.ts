import { DataSource } from "typeorm";
import { User } from "../Entities/User";
import { Profile } from "../Entities/Profile";



export const AppDataSource = new DataSource({
    type: 'sqlite',
    database: 'myDB.sqlite',
    logging: false,
    synchronize: true,


    entities: [User, Profile],


    migrations: [],
    subscribers: []
});
