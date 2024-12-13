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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registration = void 0;
const AppDataSource_1 = require("../dataBase/configuration/AppDataSource");
const usersRepository_1 = require("../dataBase/repositories/usersRepository");
const passport_1 = __importDefault(require("../authenticatorConfig/passport"));
const registration = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let user = req.body.user;
    yield AppDataSource_1.AppDataSource.initialize();
    const userRepo = new usersRepository_1.UserRepository(AppDataSource_1.AppDataSource);
    yield userRepo.addUser(user);
    yield AppDataSource_1.AppDataSource.destroy();
    passport_1.default.authenticate("local", {
        successRedirect: "/private",
        failureRedirect: "/"
    });
    // res.redirect("/private");
});
exports.registration = registration;
