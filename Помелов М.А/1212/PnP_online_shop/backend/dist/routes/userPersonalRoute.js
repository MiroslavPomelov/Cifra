"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middleware_1 = require("../middlewares/middleware");
const userPersonalControllers_1 = require("../controllers/userPersonalControllers");
const userPersonalRouter = (0, express_1.Router)();
userPersonalRouter.get('/user-personal', middleware_1.mustAuthenticatedMw, userPersonalControllers_1.changeFirstname);
