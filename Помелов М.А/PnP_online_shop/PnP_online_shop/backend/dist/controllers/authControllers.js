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
exports.auth = exports.registration = void 0;
const file_operator_1 = require("../modules/file-operator");
const AppDataSource_1 = require("../dataBase/configuration/AppDataSource");
const User_1 = require("../dataBase/entities/User");
const handlebarsApp_1 = require("../handlebars/handlebarsApp");
const registration = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let user = req.body.user;
    const userRepo = AppDataSource_1.AppDataSource.getRepository(User_1.User);
    yield userRepo.createQueryBuilder()
        .insert()
        .into(User_1.User)
        .values([
        { username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            age: user.age,
            password: user.password,
            order: undefined
        }
    ])
        .execute();
    res.set('Content-Type', 'text/html')
        .status(200);
    res.send((0, handlebarsApp_1.loadingTemplate)(user.username));
});
exports.registration = registration;
const auth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.set('Content-Type', 'text/html')
        .status(200);
    res.send(yield (0, file_operator_1.readFilePromise)("./pages/AuthorizationPage/auth.html"));
});
exports.auth = auth;
