"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mainControllers_1 = require("../controllers/mainControllers");
const middleware_1 = require("../middlewares/middleware");
const mainRouter = (0, express_1.Router)();
mainRouter.get('/', mainControllers_1.mainPage);
mainRouter.get('/private', middleware_1.mustAuthenticatedMw, mainControllers_1.mainPageAutharizated);
exports.default = mainRouter;
