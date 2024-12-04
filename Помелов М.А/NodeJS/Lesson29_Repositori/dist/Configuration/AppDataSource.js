"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const User_1 = require("../entities/User");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "sqlite",
    database: 'repository.sqlite',
    logging: false,
    synchronize: true,
    entities: [User_1.User],
    migrations: [],
    subscribers: []
});
