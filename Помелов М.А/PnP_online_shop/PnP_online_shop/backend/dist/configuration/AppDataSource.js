"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const User_1 = require("../dataBase/entities/User");
const Product_1 = require("../dataBase/entities/Product");
const Order_1 = require("../dataBase/entities/Order");
const ProductInOrder_1 = require("../dataBase/entities/ProductInOrder");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'sqlite',
    database: "users_products.sqlite",
    synchronize: true,
    logging: false,
    entities: [User_1.User, Product_1.Product, Order_1.Order, ProductInOrder_1.ProductInOrder],
    migrations: [],
    subscribers: []
});
