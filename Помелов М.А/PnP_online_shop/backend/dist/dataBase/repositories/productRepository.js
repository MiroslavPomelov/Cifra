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
exports.ProductRepository = void 0;
const Product_1 = require("../entities/Product");
class ProductRepository {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    getProductsByCategoryAndType(category, type) {
        return __awaiter(this, void 0, void 0, function* () {
            const productRepo = this.dataSource.getRepository(Product_1.Product);
            const queryBuilder = productRepo.createQueryBuilder("concreteProduct");
            const concreteProducts = yield queryBuilder
                .select()
                .where("category = :category", { category: category })
                .andWhere("type == :type", { type: type })
                .getMany();
            return concreteProducts;
        });
    }
    getProductByCategory(searchingCategory) {
        return __awaiter(this, void 0, void 0, function* () {
            const productRepo = this.dataSource.getRepository(Product_1.Product);
            const queryBuilder = productRepo.createQueryBuilder("categoryProduct");
            const categoryProduct = yield queryBuilder
                .select()
                .where("category = :category", { category: searchingCategory })
                .getOne();
            return categoryProduct;
        });
    }
    getProductByType(type) {
        return __awaiter(this, void 0, void 0, function* () {
            const productRepo = this.dataSource.getRepository(Product_1.Product);
            const queryBuilder = productRepo.createQueryBuilder("typeProduct");
            const typeProduct = yield queryBuilder
                .select()
                .where("type = :type", { type: type })
                .getOne();
            return typeProduct;
        });
    }
    getAllProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            const productRepo = this.dataSource.getRepository(Product_1.Product);
            const queryBuilder = productRepo.createQueryBuilder("product");
            const products = yield queryBuilder.getMany();
            return products;
        });
    }
    addProduct(product) {
        return __awaiter(this, void 0, void 0, function* () {
            const productRepo = this.dataSource.getRepository(Product_1.Product);
            yield productRepo
                .createQueryBuilder()
                .insert()
                .into(Product_1.Product)
                .values([
                {
                    category: product.category,
                    type: product.type,
                    price: product.price,
                    quantity: product.quantity,
                    image: product.image,
                },
            ])
                .execute();
        });
    }
}
exports.ProductRepository = ProductRepository;
