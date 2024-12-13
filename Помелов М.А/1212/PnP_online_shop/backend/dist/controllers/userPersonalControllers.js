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
exports.changeFirstname = void 0;
const AppDataSource_1 = require("../dataBase/configuration/AppDataSource");
const usersRepository_1 = require("../dataBase/repositories/usersRepository");
const changeFirstname = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const firstname = (_a = req.query.firstname) === null || _a === void 0 ? void 0 : _a.toString();
    const id = (_b = req.user) === null || _b === void 0 ? void 0 : _b.id;
    yield AppDataSource_1.AppDataSource.initialize();
    const userRepo = new usersRepository_1.UserRepository(AppDataSource_1.AppDataSource);
    if (id && firstname) {
        const user = yield userRepo.getUserById(id);
        if (user) {
            user.firstname = firstname;
            yield userRepo.changeUserData(user);
            res.status(201).send({
                status: 201,
                message: 'success'
            });
        }
        else {
            res.send({
                status: 999,
                message: 'error'
            });
        }
    }
    else {
        throw new Error();
    }
    yield AppDataSource_1.AppDataSource.destroy();
});
exports.changeFirstname = changeFirstname;
