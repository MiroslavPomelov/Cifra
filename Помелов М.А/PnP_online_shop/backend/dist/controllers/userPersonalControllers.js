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
exports.changePassword = exports.getInfo = exports.changeName = void 0;
const AppDataSource_1 = require("../dataBase/configuration/AppDataSource");
const usersRepository_1 = require("../dataBase/repositories/usersRepository");
const changeName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    const firstname = (_a = req.query.firstname) === null || _a === void 0 ? void 0 : _a.toString();
    const lastname = (_b = req.query.lastname) === null || _b === void 0 ? void 0 : _b.toString();
    const id = (_c = req.user) === null || _c === void 0 ? void 0 : _c.id;
    console.log((_d = req.user) === null || _d === void 0 ? void 0 : _d.id);
    console.log('есть ли юзер айди?');
    yield AppDataSource_1.AppDataSource.initialize();
    const userRepo = new usersRepository_1.UserRepository(AppDataSource_1.AppDataSource);
    if (id) {
        const user = yield userRepo.getUserById(id);
        if (firstname && user) {
            user.firstname = firstname;
            yield userRepo.changeUserData(user);
            res.status(201).send({
                status: 201,
                message: 'Данные успешно обновлены'
            });
        }
        else if (lastname && user) {
            user.lastname = lastname;
            yield userRepo.changeUserData(user);
            res.status(201).send({
                status: 201,
                message: 'Данные успешно обновлены'
            });
        }
        else {
            res.status(500).send({
                status: 500,
                message: 'Не удалось обновить данные'
            });
        }
    }
    else {
        throw new Error();
    }
    yield AppDataSource_1.AppDataSource.destroy();
});
exports.changeName = changeName;
const getInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    yield AppDataSource_1.AppDataSource.initialize();
    const userRepo = new usersRepository_1.UserRepository(AppDataSource_1.AppDataSource);
    if (id) {
        const user = yield userRepo.getUserById(id);
        if (user) {
            res.status(200).send(user);
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
exports.getInfo = getInfo;
const changePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('сменв пароля');
    res.status(201).send({
        status: 201,
        message: 'На вашу почту выслано сообщение для смены пароля'
    });
});
exports.changePassword = changePassword;
