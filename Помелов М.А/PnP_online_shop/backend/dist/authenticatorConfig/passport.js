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
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const AppDataSource_1 = require("../dataBase/configuration/AppDataSource");
const usersRepository_1 = require("../dataBase/repositories/usersRepository");
passport_1.default.use(new passport_local_1.Strategy(function (username, password, done) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Loc!");
        yield AppDataSource_1.AppDataSource.initialize();
        const userRepo = new usersRepository_1.UserRepository(AppDataSource_1.AppDataSource);
        const existingUser = yield userRepo.getUserByPasswordAndUsername(username, password);
        yield AppDataSource_1.AppDataSource.destroy();
        console.log(existingUser);
        if (!existingUser) {
            console.log("не нашли");
            return done(null, false, {
                message: "Неверное имя пользователя или пароль.",
            });
        }
        return done(null, existingUser);
    });
}));
passport_1.default.serializeUser((user, done) => {
    done(null, user.id);
});
passport_1.default.deserializeUser((id, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield AppDataSource_1.AppDataSource.initialize();
        const userRepo = new usersRepository_1.UserRepository(AppDataSource_1.AppDataSource);
        const user = yield userRepo.getUserById(id);
        yield AppDataSource_1.AppDataSource.destroy();
        if (!user) {
            throw new Error("PassportJs error");
        }
        done(null, user || null);
    }
    catch (error) {
        console.log(error);
    }
}));
exports.default = passport_1.default;
