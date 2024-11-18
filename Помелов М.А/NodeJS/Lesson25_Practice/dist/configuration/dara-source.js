"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const Product_1 = require("../entities/Product");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'sqlite',
    database: "database.sqlite",
    synchronize: true,
    logging: false,
    entities: [Product_1.Product],
    migrations: [],
    subscribers: []
});
