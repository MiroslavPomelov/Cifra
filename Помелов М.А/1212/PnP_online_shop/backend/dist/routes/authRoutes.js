"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authControllers_1 = require("../controllers/authControllers");
const middleware_1 = require("../middlewares/middleware");
const passport_1 = __importDefault(require("../authenticatorConfig/passport"));
const authRouter = (0, express_1.Router)();
authRouter.post("/auth", passport_1.default.authenticate("local", {
    successRedirect: "/private",
    failureRedirect: "/"
}));
authRouter.post("/registration-page", middleware_1.checkRegisteredUsers, authControllers_1.registration);
exports.default = authRouter;
