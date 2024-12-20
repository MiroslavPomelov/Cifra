"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const typeorm_1 = require("typeorm");
const ProductInOrder_1 = require("./ProductInOrder");
const User_1 = require("./User");
var Status;
(function (Status) {
    Status[Status["\u0441\u043E\u0431\u0438\u0440\u0430\u0435\u0442\u0441\u044F"] = 0] = "\u0441\u043E\u0431\u0438\u0440\u0430\u0435\u0442\u0441\u044F";
    Status[Status["\u0432 \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0435"] = 1] = "\u0432 \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0435";
    Status[Status["\u043E\u043F\u043B\u0430\u0447\u0435\u043D"] = 2] = "\u043E\u043F\u043B\u0430\u0447\u0435\u043D";
})(Status || (Status = {}));
let Order = class Order {
};
exports.Order = Order;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Order.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => User_1.User),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", User_1.User)
], Order.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ProductInOrder_1.ProductInOrder, productInOrder => productInOrder.order),
    __metadata("design:type", Array)
], Order.prototype, "productsInOrder", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Order.prototype, "orderDate", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Order.prototype, "status", void 0);
exports.Order = Order = __decorate([
    (0, typeorm_1.Entity)()
], Order);
