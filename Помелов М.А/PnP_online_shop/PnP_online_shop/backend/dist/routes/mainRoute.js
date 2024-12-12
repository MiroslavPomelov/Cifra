"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mainControllers_1 = require("../controllers/mainControllers");
const mainRouter = (0, express_1.Router)();
mainRouter.get('/', mainControllers_1.mainPage);
exports.default = mainRouter;
