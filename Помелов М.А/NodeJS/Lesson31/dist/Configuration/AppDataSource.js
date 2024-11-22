"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const User0_1 = require("../Entities/User0");
const Pet_1 = require("../Entities/Pet");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'sqlite',
    database: 'users.sqlite',
    synchronize: true,
    logging: false,
    entities: [User0_1.User, Pet_1.Pet],
    migrations: [],
    subscribers: []
});
