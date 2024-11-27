"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const authControllers_1 = require("../Controllers/authControllers");
const authRouter = (0, express_1.Router)();
authRouter.post("/login", authControllers_1.login);
authRouter.get("/protected", passport_1.default.authenticate("jwt", { session: false }), authControllers_1.protectRoute);
exports.default = authRouter;
