"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PracticeDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const User_1 = require("../Entities/User");
exports.PracticeDataSource = new typeorm_1.DataSource({
    type: 'sqlite',
    database: 'database.sqlite',
    synchronize: true,
    logging: false,
    entities: [User_1.User],
    migrations: [],
    subscribers: []
});
