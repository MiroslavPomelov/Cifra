"use strict";
// Создание БД
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDataBase = createDataBase;
const AppDataSource_1 = require("./configuration/AppDataSource");
const Product_1 = require("./entities/Product");
const User_1 = require("./entities/User");
const creator_1 = require("./dbCreators/creator");
function createDataBase() {
    return __awaiter(this, void 0, void 0, function* () {
        yield AppDataSource_1.AppDataSource.initialize();
        const UsersRepository = AppDataSource_1.AppDataSource.getRepository(User_1.User);
        const ProductRepository = AppDataSource_1.AppDataSource.getRepository(Product_1.Product);
        const listOfUsers = (0, creator_1.usersCreator)();
        const listOfProducts = (0, creator_1.productsCreator)();
        yield UsersRepository.save(listOfUsers);
        yield ProductRepository.save(listOfProducts);
    });
}
