"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const User_1 = require("../entities/User");
const Product_1 = require("../entities/Product");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'sqlite',
    database: "users_products.sqlite",
    synchronize: true,
    logging: false,
    entities: [User_1.User, Product_1.Product],
    migrations: [],
    subscribers: []
});
