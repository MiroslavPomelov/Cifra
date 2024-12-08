"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authControllers_1 = require("../controllers/authControllers");
const authRouter = (0, express_1.Router)();
authRouter.get('/enter-page', authControllers_1.authPage);
authRouter.get('/registration-page', authControllers_1.registrationPage);
exports.default = authRouter;
