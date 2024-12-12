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
exports.checkRegisteredUsers = checkRegisteredUsers;
const AppDataSource_1 = require("../dataBase/configuration/AppDataSource");
const usersRepository_1 = require("../dataBase/repositories/usersRepository");
function checkRegisteredUsers(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!req.body.user) {
            res.status(404).send('Ошибка запроса');
        }
        let user = req.body.user;
        const userRepo = new usersRepository_1.UserRepository(AppDataSource_1.AppDataSource);
        const existingUser = yield userRepo.getUserByUsername(user.username);
        if (existingUser) {
            res.status(401).send('Пользователь с таким username уже зарегистрирован');
            res.status(200).send({ message: "" });
            return;
        }
        next();
    });
}
