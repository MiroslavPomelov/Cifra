"use strict";
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
exports.getProductByCatAndType = void 0;
const AppDataSource_1 = require("../dataBase/configuration/AppDataSource");
const productRepository_1 = require("../dataBase/repositories/productRepository");
const getProductByCatAndType = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const category = (_a = req.query.category) === null || _a === void 0 ? void 0 : _a.toString();
    const type = (_b = req.query.type) === null || _b === void 0 ? void 0 : _b.toString();
    console.log(category);
    console.log(type);
    yield AppDataSource_1.AppDataSource.initialize();
    const productRepo = new productRepository_1.ProductRepository(AppDataSource_1.AppDataSource);
    if (category && type) {
        const products = yield productRepo.getProductsByCategoryAndType(category, type);
        if (products) {
            console.log(products);
            res.status(200).send(products);
        }
        else {
            throw new Error();
        }
    }
    else {
        throw new Error();
    }
    yield AppDataSource_1.AppDataSource.destroy();
});
exports.getProductByCatAndType = getProductByCatAndType;
