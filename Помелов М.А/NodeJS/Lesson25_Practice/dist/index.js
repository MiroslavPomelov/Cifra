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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Product_1 = require("./entities/Product");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dara_source_1 = require("./configuration/dara-source");
const app = (0, express_1.default)();
const PORT = 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.post('/upload-new-good', (req, res) => {
    const product = req.body;
    connctToDB(product);
    res.status(201);
    res.send();
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
function connctToDB(product) {
    dara_source_1.AppDataSource.initialize().then(() => __awaiter(this, void 0, void 0, function* () {
        const newProduct = new Product_1.Product();
        newProduct.goodName = product.goodName;
        newProduct.goodDescription = product.goodDescription;
        newProduct.goodPrice = product.goodPrice;
        console.log(newProduct);
        yield dara_source_1.AppDataSource.manager.save(newProduct);
        console.log('Saving new User in DB with id: ' + newProduct.id);
    }));
}
