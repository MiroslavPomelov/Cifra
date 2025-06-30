"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jwtStrategy_1 = __importDefault(require("./config/jwtStrategy"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Инициализация passport 
app.use(jwtStrategy_1.default.initialize());
app.use('/api', authRoutes_1.default);
exports.default = app;
