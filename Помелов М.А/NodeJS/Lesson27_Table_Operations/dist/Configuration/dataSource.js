"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
require("reflect-metadata");
const Book_1 = require("../entities/subEntities/Book");
const Animal_1 = require("../entities/subEntities/Animal");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'sqlite',
    database: 'computer.sqlite',
    synchronize: true,
    logging: [],
    entities: [Book_1.Book, Animal_1.Animal],
    migrations: [],
    subscribers: []
});
