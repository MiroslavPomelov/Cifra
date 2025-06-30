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
exports.checkToken = exports.registration = exports.login = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secretKey = process.env.JWT_SECRET || 'Pinegun_key_2327';
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        const response = yield fetch(`http://localhost:80/users/?username=${username}&&password=${password}`);
        const user = yield response.json();
        if (user) {
            const payload = {
                id: user.id,
                role: user.role,
                username: user.username
            };
            const token = jsonwebtoken_1.default.sign(payload, secretKey, { expiresIn: '1h' });
            res.json({ token });
        }
        else {
            res.status(401).json({ message: 'Невалидные  данные' });
        }
    }
    catch (err) {
        res.status(401).json({ message: 'Невалидные  данные' });
    }
});
exports.login = login;
const registration = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(`http://localhost:80/users/new`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(req.body)
        });
        const user = yield response.json();
        if (user) {
            const payload = {
                id: user.id,
                role: user.role,
                username: user.username
            };
            const token = jsonwebtoken_1.default.sign(payload, secretKey, { expiresIn: '1h' });
            res.json({ token });
        }
        else {
            res.status(401).json({ message: 'Невалидные  данные' });
        }
    }
    catch (err) {
        res.status(401).json({ message: 'Невалидные  данные' });
    }
});
exports.registration = registration;
const checkToken = (req, res) => {
    res.status(200).send();
};
exports.checkToken = checkToken;
