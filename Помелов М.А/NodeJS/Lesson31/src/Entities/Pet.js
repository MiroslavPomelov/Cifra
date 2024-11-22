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
exports.Pet = void 0;
const typeorm_1 = require("typeorm");
var PetTypes;
(function (PetTypes) {
    PetTypes[PetTypes["dog"] = 0] = "dog";
    PetTypes[PetTypes["cat"] = 1] = "cat";
    PetTypes[PetTypes["dragon"] = 2] = "dragon";
})(PetTypes || (PetTypes = {}));
let Pet = class Pet {
    constructor(name, age, type, breed) {
        this.name = name;
        this.age = age;
        this.type = type;
        this.breed = breed;
    }
};
exports.Pet = Pet;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Pet.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Pet.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Pet.prototype, "age", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Pet.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Pet.prototype, "breed", void 0);
exports.Pet = Pet = __decorate([
    (0, typeorm_1.Entity)(),
    __metadata("design:paramtypes", [String, Number, Number, String])
], Pet);
