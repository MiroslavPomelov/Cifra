"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyCustomDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const Person_1 = require("../entities/Person");
const Pet_1 = require("../entities/Pet");
exports.MyCustomDataSource = new typeorm_1.DataSource({
    type: 'sqlite',
    database: "database.sqlite",
    synchronize: true,
    logging: false,
    entities: [Person_1.Person, Pet_1.Pet],
    migrations: [],
    subscribers: []
});
