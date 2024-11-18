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
exports.SystemUnit = void 0;
const typeorm_1 = require("typeorm");
const Cooler_1 = require("./subEntities/Cooler");
const MotherBoard_1 = require("./subEntities/MotherBoard");
const Videocard_1 = require("./subEntities/Videocard");
const RAM_1 = require("./subEntities/RAM");
const CPU_1 = require("./subEntities/CPU");
let SystemUnit = class SystemUnit {
};
exports.SystemUnit = SystemUnit;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], SystemUnit.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(() => Cooler_1.Cooler),
    __metadata("design:type", Cooler_1.Cooler)
], SystemUnit.prototype, "Cooler", void 0);
__decorate([
    (0, typeorm_1.Column)(() => MotherBoard_1.MotherBoeard),
    __metadata("design:type", MotherBoard_1.MotherBoeard)
], SystemUnit.prototype, "MotherBoard", void 0);
__decorate([
    (0, typeorm_1.Column)(() => Videocard_1.Videocard),
    __metadata("design:type", Videocard_1.Videocard)
], SystemUnit.prototype, "Videocard", void 0);
__decorate([
    (0, typeorm_1.Column)(() => CPU_1.CPU),
    __metadata("design:type", CPU_1.CPU)
], SystemUnit.prototype, "CPU", void 0);
__decorate([
    (0, typeorm_1.Column)(() => RAM_1.RAM),
    __metadata("design:type", RAM_1.RAM)
], SystemUnit.prototype, "RAM", void 0);
exports.SystemUnit = SystemUnit = __decorate([
    (0, typeorm_1.Entity)()
], SystemUnit);
