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
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_1 = __importDefault(require("express"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const mainRoute_1 = __importDefault(require("./routes/mainRoute"));
const AppDataSource_1 = require("./dataBase/configuration/AppDataSource");
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const express_session_1 = __importDefault(require("express-session"));
const usersRepository_1 = require("./dataBase/repositories/usersRepository");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static("backend/src/images"));
passport_1.default.use(new passport_local_1.Strategy(function (username, password, done) {
    return __awaiter(this, void 0, void 0, function* () {
        const userRepo = new usersRepository_1.UserRepository(AppDataSource_1.AppDataSource);
        const existingUser = yield userRepo.getUserByPasswordAndUsername(username, password);
        if (!existingUser) {
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
        const userRepo = new usersRepository_1.UserRepository(AppDataSource_1.AppDataSource);
        const user = yield userRepo.getUserById(id);
        if (!user) {
            throw new Error("PassportJs error");
        }
        done(null, user || null);
    }
    catch (error) {
        console.log(error);
    }
}));
app.use((0, express_session_1.default)({
    secret: "8888-8888-8888-8888-8888-8888",
    resave: false,
    saveUninitialized: false,
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use(mainRoute_1.default);
app.use(authRoutes_1.default);
exports.default = app;
