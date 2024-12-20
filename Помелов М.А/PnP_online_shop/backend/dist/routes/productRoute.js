"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productControllers_1 = require("../controllers/productControllers");
const productRouter = (0, express_1.Router)();
productRouter.get('/products', productControllers_1.getProductByCatAndType);
exports.default = productRouter;
