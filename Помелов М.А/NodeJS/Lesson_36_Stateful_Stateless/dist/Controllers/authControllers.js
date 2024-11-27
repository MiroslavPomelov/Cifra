"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protectRoute = exports.login = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secretKey = process.env.JWT_SECRET || "qwerty123456";
const login = (req, res) => {
    const { username, password } = req.body;
    if (username === "admin" && password === "password") {
        const payload = {
            id: 1,
            name: "Admin User",
        };
        const token = jsonwebtoken_1.default.sign(payload, secretKey, { expiresIn: "1h" });
        res.json({ token }); //как send только сразу в JSON()
    }
};
exports.login = login;
const protectRoute = (req, res) => {
    res.json({
        message: "YOU GET ACCESSED TO THE PROTECTED ROUTE",
        user: req.user,
    });
};
exports.protectRoute = protectRoute;
