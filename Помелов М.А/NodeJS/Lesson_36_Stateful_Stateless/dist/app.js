"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jwtStratagy_1 = __importDefault(require("./Conf/jwtStratagy"));
const authRoutes_1 = __importDefault(require("./Routes/authRoutes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(jwtStratagy_1.default.initialize());
app.use("/api", authRoutes_1.default);
exports.default = app;
