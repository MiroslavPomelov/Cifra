import { Router } from "express";
import { mustAuthenticatedMw } from "../middlewares/middleware";
import { changeFirstname } from "../controllers/userPersonalControllers";


const userPersonalRouter = Router();
userPersonalRouter.get('/user-personal', mustAuthenticatedMw, changeFirstname );

