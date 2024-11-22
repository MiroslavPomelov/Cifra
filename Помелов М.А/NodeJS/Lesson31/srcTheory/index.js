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
const AppDataSource_1 = require("./Configuration/AppDataSource");
const User0_1 = require("./Entities/User0");
function addUser() {
    return __awaiter(this, void 0, void 0, function* () {
        yield AppDataSource_1.AppDataSource.initialize();
        const userRepo = AppDataSource_1.AppDataSource.getRepository(User0_1.User);
        yield userRepo.createQueryBuilder()
            .insert() // Add
            .into(User0_1.User)
            .values([
            {
                username: 'John',
                email: 'example@gmail.com',
                password: 'ogurec1996',
                firstname: 'Johny',
                lastname: 'Doe',
                age: 42,
                isActive: true,
                registrationDate: new Date(),
                lastLogin: new Date()
            }
        ])
            .execute();
    });
}
function updateUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        yield AppDataSource_1.AppDataSource.initialize();
        const userRepo = AppDataSource_1.AppDataSource.getRepository(User0_1.User);
        yield userRepo.createQueryBuilder()
            .update(User0_1.User)
            .set({ email: user.email })
            .where('id = :id', { id: user.id })
            .andWhere('firstname LIKE :firstname', { firstname: 'V%' })
            .execute();
    });
}
